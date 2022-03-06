import faunadb, { query as q } from 'faunadb';

import { ErrorWithKey } from '../utils';
import type { FaunaLoginResult, ServerLoginResult } from '../types/auth';

export interface ChangePasswordInput {
    /**
     * The user's email address
     */
    email: string;
    /**
     * The desired password
     */
    newPassword: string;
    /**
     * The current password
     */
    oldPassword: string;
    /**
     * A Fauna secret that is limited to permissions needed for public actions when creating users
     * and resetting passwords
     */
    publicFaunaKey: string | null;
}

/**
 * Change the password for a user who knows their old password.
 * @returns - {@link ServerLoginResult}
 */
export async function changePassword(
    input: ChangePasswordInput,
): Promise<ServerLoginResult> {
    const { newPassword, oldPassword, publicFaunaKey } = input;

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
            q.Call('resetPassword', email, oldPassword, newPassword),
        );
    } catch (e) {
        throw new ErrorWithKey('failedToSetPassword', e as Error);
    }

    if (resetPasswordResult === null) {
        throw new ErrorWithKey('failedToSetPassword');
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
