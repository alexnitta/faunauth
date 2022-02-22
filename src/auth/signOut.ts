import faunadb, { query as q } from 'faunadb';

import { ErrorWithKey } from '~/utils';

interface SignOutInput {
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
 * Sign a user out
 * @param input - {@link SignOutInput}
 * @returns true if user was signed out
 */
export async function signOut({
    logoutAll,
    refreshToken,
}: SignOutInput): Promise<boolean> {
    if (!refreshToken) return false;

    const client = new faunadb.Client({
        secret: refreshToken,
    });

    try {
        await client.query(q.Call('logout', logoutAll));
    } catch (e) {
        const error = e as Error;

        throw new ErrorWithKey('failedToSignOut', error);
    }

    return true;
}
