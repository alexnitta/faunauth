import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import { errors } from '../fauna/src/errors';
import type {
    CollectionQueryResult,
    UserData,
    FaunauthError,
    FaunaLoginResult,
    ServerLoginResult,
} from '../types';

export interface RegisterAdminInput {
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
    /**
     * A Fauna secret that has "admin" permissions
     */
    adminKey: string | null;
    /**
     * Password for the new user
     */
    password: string;
    /**
     * Details for the new user - see {@link UserData}
     */
    userData: UserData;
}

/**
 * Register a user by creating a user in the User collection and then setting their password without
 * verifying an email confirmation token. This is intended for use only when creating an account as
 * an administrator; use this with caution and do not expose it in any public endpoints.
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
export async function registerAdmin(
    input: RegisterAdminInput,
): Promise<ServerLoginResult> {
    const {
        adminKey,
        clientConfig,
        password,
        userData: { locale, details },
    } = input;

    const email = input.userData.email.toLowerCase();
    const inputUsername = input.userData?.username ?? null;
    const username = inputUsername ? inputUsername.toLowerCase() : null;

    if (!adminKey) {
        throw new Error(errors.missingAdminKey);
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: adminKey,
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

    let setPasswordResult: FaunaLoginResult | FaunauthError = {
        error: errors.unknownServerError,
    };

    try {
        setPasswordResult = await client.query<
            FaunaLoginResult | FaunauthError
        >(q.Call('setPasswordAdmin', email, password));
    } catch {
        throw new Error(errors.unknownServerError);
    }

    if ('error' in setPasswordResult) {
        throw new Error(setPasswordResult.error);
    }

    const {
        tokens: { access, refresh },
        account,
        id,
    } = setPasswordResult;

    return {
        accessSecret: access.secret,
        refreshSecret: refresh.secret,
        user: {
            id,
            ...account.data,
        },
    };
}
