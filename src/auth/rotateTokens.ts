import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import { errors } from '../fauna/src/errors';
import type { FaunaRefreshResult, TokenPair, Maybe } from '../types';

export interface RotateTokensInput {
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
    /**
     * A token that can be used to authenticate further Fauna requests. Fauna's docs refer to this
     * as a 'secret'; from the client perspective it's a JWT.
     */
    refreshSecret: string;
}

/**
 * Using the user's current refresh token, get a new pair of access & refresh tokens.
 * @param input - {@link RotateTokensInput}
 * @returns the new access and refresh tokens if successful
 */
export async function rotateTokens({
    clientConfig,
    refreshSecret,
}: RotateTokensInput): Promise<TokenPair> {
    const client = new faunadb.Client({
        ...clientConfig,
        secret: refreshSecret,
    });

    let result: Maybe<FaunaRefreshResult> = null;

    try {
        result = await client.query(q.Call('refresh'));
    } catch (e) {
        throw new Error(errors.failedToRefreshToken);
    }

    if (result === null) {
        throw new Error(errors.failedToRefreshToken);
    }

    return {
        accessSecret: result.tokens.access.secret,
        refreshSecret: result.tokens.refresh.secret,
    };
}
