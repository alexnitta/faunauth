import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import { addParamsToPath, ErrorWithKey } from '../utils';
import { getEmailContent } from '../email';
import type {
    AuthEmailResult,
    AuthInputWithEmailTemplate,
    AuthInputWithCustomEmail,
    CollectionQueryResult,
    Token,
    UserData,
} from '../types';

export interface BaseRequestPasswordResetInput {
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
    /**
     * Email address for the user who wants to reset their password
     */
    email: string;
    /**
     * A Fauna secret that is limited to permissions needed for public actions when creating users
     * and resetting passwords
     */
    publicFaunaKey: string | null;
}

export type RequestPasswordResetInput<SendEmailResult> =
    BaseRequestPasswordResetInput &
        (
            | AuthInputWithEmailTemplate<SendEmailResult>
            | AuthInputWithCustomEmail<SendEmailResult>
        );

/**
 * Create an email confirmation token in the database, then send an email with a confirmation link
 * that includes the token and email address. Upon clicking the link, either `setPassword` or
 * `loginWithMagicLink` will need to be invoked with the decoded token to complete the process.
 *
 * The `input.email` is converted to lowercase, so it is case-insensitive.
 * @remarks
 * The token and email are wrapped into an object, then Base64-encoded and appended as a single
 * URL search parameter called `data`. Your client-side code can read these values by doing:
 * ```TypeScript
 *  // If you're using react-router, you can get search params with useSearchParams()
 *  const search = window.location.search
 *  const urlQuery = new URLSearchParams(search);
 *  const data = urlQuery.get('data');
 *
 *  try {
 *      const { email, token } = JSON.parse(atob(data));
 *  } catch {
 *      // could not read data from URL search parameter
 *  }
 * ```
 *
 * You can either use the built-in email template system by passing in an input that conforms to
 * {@link AuthInputWithEmailTemplate}, or create your own email template by passing in an input that
 * conforms to {@link AuthInputWithCustomEmail}.
 * @returns - {@link RequestPasswordResetResult}
 */
export async function sendConfirmationEmail<SendEmailResult>(
    input: RequestPasswordResetInput<SendEmailResult>,
): Promise<AuthEmailResult<SendEmailResult>> {
    const { clientConfig, publicFaunaKey } = input;

    const email = input.email.toLowerCase();

    if (!publicFaunaKey) {
        throw new ErrorWithKey('publicFaunaKeyMissing');
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: publicFaunaKey,
    });

    let createTokenResult = null;

    try {
        createTokenResult = await client.query<{
            account: CollectionQueryResult<UserData>;
            token: Token<{ type: string; email: string }>;
        }>(q.Call('createEmailConfirmationToken', email));
    } catch (e) {
        throw new ErrorWithKey('failedToCreateToken', [e as Error]);
    }

    if (!createTokenResult) {
        return {
            tokenCreated: false,
            sendEmailResult: null,
        };
    }

    const {
        token: { secret },
    } = createTokenResult;

    const data = Buffer.from(
        JSON.stringify({
            email,
            token: secret,
        }),
    ).toString('base64');

    let sendEmailResult = null;

    if ('sendEmailFromTemplate' in input) {
        const { emailConfig, fromEmail, sendEmailFromTemplate } = input;
        const finalCallbackUrl = addParamsToPath({
            path: emailConfig.callbackUrl,
            params: [['data', data]],
        });

        const { html, text, subject } = getEmailContent({
            ...emailConfig,
            callbackUrl: finalCallbackUrl,
        });

        const message = {
            to: email,
            from: fromEmail,
            subject,
            html,
            text,
        };

        try {
            sendEmailResult = await sendEmailFromTemplate(message);
        } catch (e) {
            throw new ErrorWithKey('failedToSendEmail', [e as Error]);
        }
    } else if ('sendCustomEmail' in input) {
        const { sendCustomEmail } = input;

        const finalCallbackUrl = addParamsToPath({
            path: input.callbackUrl,
            params: [['data', data]],
        });

        try {
            sendEmailResult = await sendCustomEmail(finalCallbackUrl);
        } catch (e) {
            throw new ErrorWithKey('failedToSendEmail', [e as Error]);
        }
    }

    return { tokenCreated: true, sendEmailResult };
}
