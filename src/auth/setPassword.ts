import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import type { ServerLoginResult, FaunaLoginResult } from '../types/auth';
import { ErrorWithKey } from '../utils';

export interface SetPasswordInput {
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
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
 * Set a user's password in order to finish either the "register" or "forgot password" flow. By now,
 * the user has already triggered either `register` or `requestTokenEmail` to request a token.
 * The token has been created in the database, and an email has been sent to the user with a link
 * which includes an encoded copy of the token. The user has clicked the link, opening a page in the
 * frontend app that calls an API endpoint which calls this function. This function checks
 * the token to see if an exact match for the token exists in the database which:
 * - has not expired
 * - belongs to the user associated with the given email
 * If these conditions are met, the given password is set as the user's current password.
 * @returns - {@link ServerLoginResult}
 */
export async function setPassword(
    input: SetPasswordInput,
): Promise<ServerLoginResult> {
    const { clientConfig, publicFaunaKey, password, token } = input;

    const email = input.email.toLowerCase();

    if (!publicFaunaKey) {
        throw new ErrorWithKey('publicFaunaKeyMissing');
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: publicFaunaKey,
    });

    let setPasswordResult: FaunaLoginResult | null = null;

    try {
        setPasswordResult = await client.query(
            q.Call('setPassword', email, password, token),
        );
    } catch (e) {
        throw new ErrorWithKey('failedToSetPassword', [e as Error]);
    }

    if (!setPasswordResult) {
        throw new ErrorWithKey('failedToSetPassword');
    }

    const {
        tokens: { access, refresh },
        account,
        id,
    } = setPasswordResult;

    return {
        accessToken: access.secret,
        refreshToken: refresh.secret,
        user: {
            id,
            ...account.data,
        },
    };
}
