import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import { errors } from '../errors';
import type { ServerLoginResult, FaunaLoginResult } from '../types';

export interface BaseLoginInput {
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
     * The user's password
     */
    password: string;
}

export interface LoginInputWithEmail extends BaseLoginInput {
    /**
     * Email address for the user who wants to sign in
     */
    email: string;
}

export interface LoginInputWithUsername extends BaseLoginInput {
    /**
     * Username for the user who wants to sign in
     */
    username: string;
}

export type LoginInput = LoginInputWithEmail | LoginInputWithUsername;

/**
 * Log a user in. The input can include either an `email` or a `username` in order to identify the
 * user. The returned data will include an `accessToken`, `refreshToken` and `user` object including
 * the user's `id` as well as any other data on the User document.
 *
 * The `input.email` or `input.username` is converted to lowercase, so it is case-insensitive.
 * @param input - {@link LoginInput}
 * @returns - {@link LoginResult}
 */
export async function login(input: LoginInput): Promise<ServerLoginResult> {
    const { clientConfig, publicFaunaKey, password } = input;

    if (!publicFaunaKey) {
        throw new Error(errors.missingPublicFaunaKey);
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: publicFaunaKey,
    });

    let loginResult: FaunaLoginResult | false = false;

    try {
        if ('email' in input) {
            const email = input.email.toLowerCase();

            loginResult = await client.query<FaunaLoginResult | false>(
                q.Call('login', email, password),
            );
        } else {
            const username = input.username.toLowerCase();

            loginResult = await client.query<FaunaLoginResult | false>(
                q.Call('loginWithUsername', username, password),
            );
        }
    } catch {
        throw new Error(errors.invalidUserOrPassword);
    }

    if (!loginResult) {
        throw new Error(errors.invalidUserOrPassword);
    }

    const {
        tokens: { access, refresh },
        account,
        id,
    } = loginResult;

    return {
        accessToken: access.secret,
        refreshToken: refresh.secret,
        user: {
            id,
            ...account.data,
        },
    };
}
