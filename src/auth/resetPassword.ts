import faunadb, { query as q } from 'faunadb';

import type { ServerLoginResult, FaunaLoginResult } from '~/types/auth';
import { ErrorWithKey } from '~/utils';

export interface ResetPasswordInput {
    /**
     * Email address for the user who wants to reset their password
     */
    email: string;
    /**
     * A Fauna secret that is limited to permissions needed for public actions when creating users
     * and resetting passwords
     */
    publicFaunaKey: string | null;
    /**
     * New password to use
     */
    password: string;
    /**
     * Token that was previously created in the database
     */
    token: string;
}

/**
 * Finish either the "register" or "forgot password" flow for a user. At this point,
 * the user has already triggered either `register` or `requestPasswordReset` to request a token.
 * The token has been created in the database, and an email has been sent to the user with a link
 * which includes the token. The user has clicked the link, which opens a page containing a form
 * input for the new password. This function must then check the token to see an exact match for the
 * token exists in the database which:
 * - has not expired
 * - belongs to the user associated with the given email
 * If these conditions are met, the given password is used to reset the user's password.
 * @returns - {@link ServerLoginResult}
 */
export async function resetPassword(
    input: ResetPasswordInput,
): Promise<ServerLoginResult> {
    const { publicFaunaKey, password, token } = input;

    const email = input.email.toLowerCase();

    if (!publicFaunaKey) {
        throw new ErrorWithKey('publicFaunaKeyMissing');
    }

    const client = new faunadb.Client({
        secret: publicFaunaKey,
    });

    let resetPasswordResult: FaunaLoginResult | null = null;

    try {
        resetPasswordResult = await client.query(
            q.Call('resetPassword', email, password, token),
        );
    } catch (error) {
        throw new ErrorWithKey('failedToResetPassword', error as Error);
    }

    if (!resetPasswordResult) {
        throw new ErrorWithKey('failedToResetPassword');
    }

    const {
        tokens: { access, refresh },
        account,
        id,
    } = resetPasswordResult;

    return {
        accessToken: access.secret,
        refreshToken: refresh.secret,
        user: {
            id,
            ...account.data,
        },
    };
}
