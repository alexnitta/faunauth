import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import { errors } from '../fauna/src/errors';
import type { FaunaLoginResult, ServerLoginResult } from '../types/auth';

export interface ChangePasswordInput {
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
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
 *
 * The `input.email` is converted to lowercase, so it is case-insensitive.
 * @returns - {@link ServerLoginResult}
 */
export async function changePassword(
    input: ChangePasswordInput,
): Promise<ServerLoginResult> {
    const { clientConfig, newPassword, oldPassword, publicFaunaKey } = input;

    const email = input.email.toLowerCase();

    if (!publicFaunaKey) {
        throw new Error(errors.missingPublicFaunaKey);
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: publicFaunaKey,
    });

    const changePasswordResult = await client.query<FaunaLoginResult>(
        q.Call('changePassword', email, oldPassword, newPassword),
    );

    const {
        tokens: { access, refresh },
        account,
        id,
    } = changePasswordResult;

    return {
        accessToken: access.secret,
        refreshToken: refresh.secret,
        user: {
            id,
            ...account.data,
        },
    };
}
