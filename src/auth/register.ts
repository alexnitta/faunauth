import faunadb, { query as q } from 'faunadb';

import { ErrorWithKey } from '~/utils';
import { getEmailContent } from '~/email';
import type {
    CollectionQueryResult,
    AuthEmailConfig,
    Maybe,
    SendEmail,
    Token,
    UserData,
} from '~/types';

interface RegisterInput<SendEmailResult> {
    /**
     * Email address to use as the sender
     */
    fromEmail: string;
    /**
     * A configuration object for the email template - see {@link AuthEmailConfig}
     */
    emailConfig: AuthEmailConfig;
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
     * See {@link SendEmail}
     */
    sendEmail: SendEmail<SendEmailResult>;
    /**
     * Details for the new user - see {@link UserData}
     */
    userData: UserData;
}

interface RegisterResult<SendEmailResult> {
    /**
     * True if a sign up token was created in database
     */
    tokenCreated: boolean;
    /**
     * Result of sending email
     */
    sendEmailResult: Maybe<SendEmailResult>;
}

/**
 * Register a user by creating a user in the User collection and sending the user an email with a
 * confirmation link that will can be used to confirm their account. A unique `input.userData.email`
 * is required. If desired, you can provide a unique username on `input.userData.username`. If you
 * do this (or if you later modify the user by adding a username to its `data` property), you can
 * call the `login` function with the username rather than the email.
 * @returns - {@link RegisterResult}
 */
export async function register<SendEmailResult>(
    input: RegisterInput<SendEmailResult>,
): Promise<RegisterResult<SendEmailResult>> {
    const {
        publicFaunaKey,
        password,
        sendEmail,
        userData: { locale, details },
        emailConfig,
        fromEmail,
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

    const finalCallbackUrl = `${emailConfig.callbackUrl}?data=${data}`;

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

    let sendEmailResult = null;

    try {
        sendEmailResult = await sendEmail(message);
    } catch (e) {
        throw new ErrorWithKey('failedToSendEmail', e as Error);
    }

    return { tokenCreated: true, sendEmailResult };
}
