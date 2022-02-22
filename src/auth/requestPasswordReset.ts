import faunadb, { query as q } from 'faunadb';

import { ErrorWithKey } from '~/utils';
import { getConfirmResetPasswordEmail } from '~/email';
import type {
    CollectionQueryResult,
    GetConfirmResetPasswordEmailConfig,
    Maybe,
    SendEmail,
    Token,
    UserData,
} from '~/types';

interface RequestPasswordResetInput<SendEmailResult> {
    /**
     * Email address to send the email to - this should be the email address for the user who wants
     * to reset their password
     */
    toEmail: string;
    /**
     * Email address to use as the sender
     */
    fromEmail: string;
    /**
     * A configuration object for the email template - see {@link GetConfirmResetPasswordEmailConfig}
     */
    emailTemplateConfig: GetConfirmResetPasswordEmailConfig;
    /**
     * A Fauna secret that is limited to permissions needed for public actions when creating users
     * and resetting passwords
     */
    publicFaunaKey: string | null;
    /**
     * See {@link SendEmail}
     */
    sendEmail: SendEmail<SendEmailResult>;
}

interface RequestPasswordResetResult<SendEmailResult> {
    /**
     * True if a password reset token was created in database
     */
    tokenCreated: boolean;
    /**
     * Result of sending email
     */
    sendEmailResult: Maybe<SendEmailResult>;
}

/**
 * Initiate the "forgot password" process for a user who doesn't know their old password by setting
 * a token in the database, then sending an email with a link that includes the token. Upon clicking
 * the link, `completePasswordReset` will need to be invoked with the token to completed the process
 * and allow the user to log in with their new password.
 * @returns - {@link RequestPasswordResetResult}
 */
export async function requestPasswordReset<SendEmailResult>(
    input: RequestPasswordResetInput<SendEmailResult>,
): Promise<RequestPasswordResetResult<SendEmailResult>> {
    const {
        toEmail,
        fromEmail,
        publicFaunaKey,
        emailTemplateConfig,
        sendEmail,
    } = input;

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
        }>(q.Call('createEmailConfirmationToken', toEmail));
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
            email: toEmail,
            token: secret,
        }),
    ).toString('base64');

    const finalCallbackUrl = `${emailTemplateConfig.callbackUrl}?data=${data}`;

    const { html, text, subject } = getConfirmResetPasswordEmail({
        ...emailTemplateConfig,
        callbackUrl: finalCallbackUrl,
    });

    const message = {
        to: toEmail,
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
