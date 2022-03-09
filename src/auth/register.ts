import faunadb, { query as q } from 'faunadb';

import { ErrorWithKey } from '../utils';
import { getEmailContent } from '../email';
import type {
    CollectionQueryResult,
    AuthInputWithEmailTemplate,
    AuthInputWithCustomEmail,
    AuthEmailResult,
    Token,
    UserData,
} from '../types';

export interface BaseRegisterInput {
    /**
     * Target URL for the call to action button. A URL parameter called `data` will be appended to
     * the callback URL which will include a Base64-encoded string containing the email and token.
     * Your app needs to expose a page at this route that will read the `data` param, decode the
     * email and token from it, and pass them to the `setPassword` function.
     */
    callbackUrl: string;
    /**
     * A Fauna secret that is limited to permissions needed for public actions when creating users
     * and resetting passwords
     */
    publicFaunaKey: string | null;
    /**
     * Password for the new user
     */
    password: string;
    /**
     * Details for the new user - see {@link UserData}
     */
    userData: UserData;
}

export type RegisterInput<SendEmailResult> = BaseRegisterInput &
    (
        | AuthInputWithEmailTemplate<SendEmailResult>
        | AuthInputWithCustomEmail<SendEmailResult>
    );

/**
 * Register a user by creating a user in the User collection and sending the user an email with a
 * confirmation link that will can be used to confirm their account. A unique `input.userData.email`
 * is required. If desired, you can provide a unique username on `input.userData.username`. If you
 * do this (or if you later modify the user by adding a username to its `data` property), you can
 * call the `login` function with the username rather than the email.
 *
 * @remarks
 * You can either use the built-in email template system by passing in an input that conforms to
 * {@link AuthInputWithEmailTemplate}, or create your own email template by passing in an input that
 * conforms to {@link AuthInputWithCustomEmail}.
 * @returns - {@link RegisterResult}
 */
export async function register<SendEmailResult>(
    input: RegisterInput<SendEmailResult>,
): Promise<AuthEmailResult<SendEmailResult>> {
    const {
        callbackUrl,
        publicFaunaKey,
        password,
        userData: { locale, details },
    } = input;

    const email = input.userData.email.toLowerCase();

    if (!publicFaunaKey) {
        throw new ErrorWithKey('publicFaunaKeyMissing');
    }

    const client = new faunadb.Client({
        secret: publicFaunaKey,
    });

    let userResult = null;

    try {
        userResult = await client.query<CollectionQueryResult<UserData>>(
            q.Call('register', password, {
                confirmedEmail: false,
                details,
                email,
                locale,
                username: input?.userData?.username ?? null,
            }),
        );
    } catch (e) {
        // TODO find the Fauna type definition for errors when instance is not unique and use it
        // instead of casting to `any`
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error = e as any;

        const code =
            error?.requestResult?.responseContent?.errors?.[0]?.cause?.[0]
                ?.code;

        if (code === 'instance not unique') {
            throw new ErrorWithKey('userAlreadyExists');
        } else {
            throw new ErrorWithKey('queryError', e as Error);
        }
    }

    if (!userResult?.ref) {
        throw new ErrorWithKey('userRefIsMissing');
    }

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
