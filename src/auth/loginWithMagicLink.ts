import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import type { ServerLoginResult, FaunaLoginResult } from '../types/auth';
import { errors } from '../fauna/src/errors';

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
     * Secret for a token that was previously created in the database
     */
    secret: string;
}

/**
 * Log in a user via a link sent in an email. The link contains an encoded secret which must be
 * passed to this function as the `secret` argument. This function checks the secret to see if a
 * token exists in the database which matches the secret, has not expired, and belongs to the user
 * associated with the given email. If these conditions are met, the user is logged in. The returned
 * data will include an `accessSecret`, `refreshSecret` and `user` object including the user's `id`
 * as well as any other data on the User document.
 *
 * The `input.email` is converted to lowercase, so it is case-insensitive.
 * @returns - {@link ServerLoginResult}
 */
export async function loginWithMagicLink(
    input: LoginWithMagicLinkInput,
): Promise<ServerLoginResult> {
    const { clientConfig, publicFaunaKey, secret } = input;

    const email = input.email.toLowerCase();

    if (!publicFaunaKey) {
        throw new Error(errors.missingPublicFaunaKey);
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: publicFaunaKey,
    });

    let loginResult: FaunaLoginResult | false = false;

    try {
        loginResult = await client.query<FaunaLoginResult | false>(
            q.Call('loginWithMagicLink', email, secret),
        );
    } catch {
        throw new Error(errors.failedToSetPassword);
    }

    if (!loginResult) {
        throw new Error(errors.failedToSetPassword);
    }

    const {
        tokens: { access, refresh },
        account,
        id,
    } = loginResult;

    return {
        accessSecret: access.secret,
        refreshSecret: refresh.secret,
        user: {
            id,
            ...account.data,
        },
    };
}
