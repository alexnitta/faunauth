import faunadb, { query as q } from 'faunadb';

import { ErrorWithKey } from '../utils';
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
     * Target URL for the call to action button. A URL parameter called `data` will be appended to
     * the callback URL which will include a Base64-encoded string containing the email and token.
     * Your app needs to expose a page at this route that will read the `data` param, decode the
     * email and token from it, and pass them to the `setPassword` function.
     */
    callbackUrl: string;
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
 * Initiate the "forgot password" process for a user who doesn't know their old password by setting
 * a token in the database, then sending an email with a link that includes the token. Upon clicking
 * the link, `completePasswordReset` will need to be invoked with the token to completed the process
 * and allow the user to log in with their new password.
 *
 * @remarks
 * You can either use the built-in email template system by passing in an input that conforms to
 * {@link AuthInputWithEmailTemplate}, or create your own email template by passing in an input that
 * conforms to {@link AuthInputWithCustomEmail}.
 * @returns - {@link RequestPasswordResetResult}
 */
export async function requestPasswordReset<SendEmailResult>(
    input: RequestPasswordResetInput<SendEmailResult>,
): Promise<AuthEmailResult<SendEmailResult>> {
    const { callbackUrl, publicFaunaKey } = input;

    const email = input.email.toLowerCase();

    if (!publicFaunaKey) {
        throw new ErrorWithKey('publicFaunaKeyMissing');
    }

    const client = new faunadb.Client({
        secret: publicFaunaKey,
    });

    let createTokenResult = null;

    try {
        createTokenResult = await client.query<{
            account: CollectionQueryResult<UserData>;
            token: Token<{ type: string; email: string }>;
        }>(q.Call('createEmailConfirmationToken', email));
    } catch (e) {
        throw new ErrorWithKey('failedToCreateToken', e as Error);
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

    const finalCallbackUrl = `${callbackUrl}?data=${data}`;

    let sendEmailResult = null;

    if ('sendEmailFromTemplate' in input) {
        const { emailConfig, fromEmail, sendEmailFromTemplate } = input;

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
            throw new ErrorWithKey('failedToSendEmail', e as Error);
        }
    } else if ('sendCustomEmail' in input) {
        const { sendCustomEmail } = input;

        try {
            sendEmailResult = await sendCustomEmail(finalCallbackUrl);
        } catch (e) {
            throw new ErrorWithKey('failedToSendEmail', e as Error);
        }
    }

    return { tokenCreated: true, sendEmailResult };
}
