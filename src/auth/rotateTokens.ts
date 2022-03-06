import faunadb, { query as q } from 'faunadb';

import { ErrorWithKey } from '../utils';
import type { FaunaRefreshResult, TokenPair, Maybe } from '../types';

export interface RotateTokensInput {
    /**
     * A token that can be used to authenticate further Fauna requests. Fauna's docs refer to this
     * as a 'secret'; from the client perspective it's a JWT.
     */
    refreshToken: string;
}

/**
 * Using the user's current refresh token, get a new pair of access & refresh tokens.
 * @param input - {@link RotateTokensInput}
 * @returns the new access and refresh tokens if successful
 */
export async function rotateTokens({
    refreshToken,
}: RotateTokensInput): Promise<TokenPair> {
    const client = new faunadb.Client({
        secret: refreshToken,
    });

    let result: Maybe<FaunaRefreshResult> = null;

    try {
        result = await client.query(q.Call('refresh'));
    } catch (e) {
        throw new ErrorWithKey('failedToRefreshToken', e as Error);
    }

    if (result === null) {
        throw new ErrorWithKey('failedToRefreshToken');
    }

    return {
        accessToken: result.tokens.access.secret,
        refreshToken: result.tokens.refresh.secret,
    };
}
