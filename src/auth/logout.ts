import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import { ErrorWithKey } from '../utils';

export interface LogoutInput {
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
    /**
     * If true, will expire all tokens for the account (which could be on different machines or
     * different browsers). If false, will just expire tokens for the current browser.
     */
    logoutAll: boolean;
    /**
     * The user's refresh token secret
     */
    refreshToken: string;
}

/**
 * Log a user out.
 * @param input - {@link LogoutInput}
 * @returns true if user was signed out
 */
export async function logout({
    clientConfig,
    logoutAll,
    refreshToken,
}: LogoutInput): Promise<boolean> {
    if (!refreshToken) return false;

    const client = new faunadb.Client({
        ...clientConfig,
        secret: refreshToken,
    });

    try {
        await client.query(q.Call('logout', logoutAll));
    } catch (e) {
        const error = e as Error;

        throw new ErrorWithKey('failedToLogout', [error]);
    }

    return true;
}
