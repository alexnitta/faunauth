import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import { errors } from '../fauna/src/errors';
import { getEmailContent } from '../email';
import type {
    CollectionQueryResult,
    AuthInputWithEmailTemplate,
    AuthInputWithCustomEmail,
    Token,
    UserData,
    Maybe,
    FaunauthError,
} from '../types';
import { addParamsToPath } from '../utils';

export interface BaseRegisterInput {
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
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
 * confirmation link to the specified callbackUrl that includes the encoded token and email address.
 * `setPassword` will need to be invoked with the decoded token to complete the process.
 *
 * A unique `input.userData.email` is required. If desired, you can provide a unique username on
 * `input.userData.username`. If you do this (or if you later modify the user by adding a username
 * to its `data` property), you can call the `login` function with the username rather than the
 * email.
 *
 * Both `input.userData.email` and `input.userData.username` are converted to lowercase, so they
 * are case-insensitive.
 *
 * @remarks
 * The token and email are wrapped into an object, then Base64-encoded and appended as a single
 * URL search parameter called `data`. Your client-side code can read these values by doing:
 * ```JavaScript
 * const { email, token } = JSON.parse(atob(data));
 * ```
 *
 * You can either use the built-in email template system by passing in an input that conforms to
 * {@link AuthInputWithEmailTemplate}, or create your own email template by passing in an input that
 * conforms to {@link AuthInputWithCustomEmail}.
 * @returns the generic \`<SendEmailResult>\` that you specify
 */
export async function register<SendEmailResult>(
    input: RegisterInput<SendEmailResult>,
): Promise<SendEmailResult> {
    const {
        clientConfig,
        publicFaunaKey,
        password,
        userData: { locale, details },
    } = input;

    const email = input.userData.email.toLowerCase();
    const inputUsername = input.userData?.username ?? null;
    const username = inputUsername ? inputUsername.toLowerCase() : null;

    if (!publicFaunaKey) {
        throw new Error(errors.missingPublicFaunaKey);
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: publicFaunaKey,
    });

    let userResult = null;

    try {
        userResult = await client.query<
            CollectionQueryResult<UserData> | FaunauthError
        >(
            q.Call('register', password, email, {
                confirmedEmail: false,
                details,
                email,
                locale,
                username,
            }),
        );
    } catch {
        throw new Error(errors.failedToRegisterUser);
    }

    if ('error' in userResult) {
        throw new Error(userResult.error);
    }

    if (!userResult?.ref) {
        throw new Error(errors.missingUserRef);
    }

    let createTokenResult = null;

    try {
        createTokenResult = await client.query<{
            account: CollectionQueryResult<UserData>;
            token: Token<{ type: string; email: string }>;
        }>(q.Call('createEmailConfirmationToken', email));
    } catch (e) {
        throw new Error(errors.failedToCreateToken);
    }

    if (!createTokenResult) {
        // It would be really strange if this happened, because the user should be created just
        // before this, but we check for this condition anyway.
        throw new Error(errors.userDoesNotExist);
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

    let sendEmailResult: Maybe<Error | SendEmailResult> = null;

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
        } catch {
            sendEmailResult = new Error(errors.failedToSendEmail);
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
            sendEmailResult = new Error(errors.failedToSendEmail);
        }
    }

    if (sendEmailResult instanceof Error) {
        if (sendEmailResult.message === errors.failedToSendEmail) {
            try {
                // Delete user if email is not sent so that they can be re-created at a later time
                await client.query(q.Delete(userResult.ref));
            } catch {
                throw new Error(errors.failedToSendEmailAndDeleteUser);
            }
        }

        throw sendEmailResult;
    }

    return sendEmailResult;
}
