import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import type { ServerLoginResult, FaunaLoginResult } from '../types/auth';
import { ErrorWithKey } from '../utils';

export interface LoginWithMagicLinkInput {
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
    /**
     * Email address for the user who wants to log in
     */
    email: string;
    /**
     * A Fauna secret that is limited to permissions needed for public actions when creating users
     * and resetting passwords
     */
    publicFaunaKey: string | null;
    /**
     * Token that was previously created in the database
     */
    token: string;
}

/**
 * Log in a user via a link sent in an email. The link contains an encoded token which must be
 * passed to this function as the `token` argument. This function checks the token to see if an exact
 * match for the token exists in the database which:
 * - has not expired
 * - belongs to the user associated with the given email
 * If these conditions are met, the user is logged in. The returned data will include an
 * `accessToken`, `refreshToken` and `user` object including the user's `id` as well as any other
 * data on the User document.
 * @returns - {@link ServerLoginResult}
 */
export async function loginWithMagicLink(
    input: LoginWithMagicLinkInput,
): Promise<ServerLoginResult> {
    const { clientConfig, publicFaunaKey, token } = input;

    const email = input.email.toLowerCase();

    if (!publicFaunaKey) {
        throw new ErrorWithKey('publicFaunaKeyMissing');
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: publicFaunaKey,
    });

    let loginResult: FaunaLoginResult | null = null;

    try {
        loginResult = await client.query(
            q.Call('loginWithMagicLink', email, token),
        );
    } catch (error) {
        throw new ErrorWithKey('failedToSetPassword', [error as Error]);
    }

    if (!loginResult) {
        throw new ErrorWithKey('failedToSetPassword');
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
