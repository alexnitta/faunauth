import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import { errors } from '../fauna/src/errors';
import type {
    FaunauthError,
    FaunaLoginResult,
    ServerLoginResult,
} from '../types';

export interface SetPasswordAdminInput {
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
    /**
     * A Fauna secret that has "admin" permissions
     */
    adminKey: string | null;
    /**
     * Email address for the user who wants to reset their password
     */
    email: string;
    /**
     * New password to use
     */
    password: string;
}

/**
 * Set a user's password without verifying an email confirmation token. This is intended for
 * administrative purposes only works with a Fauna client that is authenticated with an admin key.
 * Use this with caution.
 *
 * A unique `input.userData.email` is required. If desired, you can provide a unique username on
 * `input.userData.username`. If you do this (or if you later modify the user by adding a username
 * to its `data` property), you can call the `login` function with the username rather than the
 * email.
 *
 * Both `input.userData.email` and `input.userData.username` are converted to lowercase, so they
 * are case-insensitive.
 * @returns a {@link ServerLoginResult}
 */
export async function setPasswordAdmin(
    input: SetPasswordAdminInput,
): Promise<ServerLoginResult> {
    const { adminKey, clientConfig, password, email } = input;

    if (!adminKey) {
        throw new Error(errors.missingAdminKey);
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: adminKey,
    });

    let result: FaunaLoginResult | FaunauthError = {
        error: errors.unknownServerError,
    };

    try {
        result = await client.query<FaunaLoginResult | FaunauthError>(
            q.Call('setPasswordAdmin', email, password),
        );
    } catch {
        throw new Error(errors.unknownServerError);
    }

    if ('error' in result) {
        throw new Error(result.error);
    }

    const {
        tokens: { access, refresh },
        account,
        id,
    } = result;

    return {
        accessSecret: access.secret,
        refreshSecret: refresh.secret,
        user: {
            id,
            ...account.data,
        },
    };
}
