import faunadb, { query as q } from 'faunadb';

import { ErrorWithKey } from '~/utils';
import type { ServerLoginResult, FaunaLoginResult, Maybe } from '~/types';

export interface BaseLoginInput {
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
 * @param input - {@link LoginInput}
 * @returns - {@link LoginResult}
 */
export async function login(input: LoginInput): Promise<ServerLoginResult> {
    const { publicFaunaKey, password } = input;

    if (!publicFaunaKey) {
        throw new ErrorWithKey('publicFaunaKeyMissing');
    }

    const client = new faunadb.Client({
        secret: publicFaunaKey,
    });

    let loginResult: Maybe<FaunaLoginResult> = null;

    try {
        if ('email' in input) {
            const email = input.email.toLowerCase();

            loginResult = await client.query<Maybe<FaunaLoginResult>>(
                q.Call('login', email, password),
            );
        } else {
            loginResult = await client.query<Maybe<FaunaLoginResult>>(
                q.Call('loginWithUsername', input.username, password),
            );
        }
    } catch (e) {
        const error = e as Error;

        throw new ErrorWithKey('invalidUserOrPassword', error);
    }

    if (loginResult === null) {
        throw new ErrorWithKey('invalidUserOrPassword');
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
