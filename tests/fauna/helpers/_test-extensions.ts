import fauna from 'faunadb';

import type { TokenCollectionQueryResult } from '../../../src/types';

const q = fauna.query;
const { Get, Paginate, Tokens, Lambda, Var } = q;

export async function verifyTokens(
    expect: typeof import('vitest')['expect'],
    adminClient: fauna.Client,
    tokenConfig: {
        access: number;
        refresh: number;
    },
) {
    const allTokens = await adminClient.query<TokenCollectionQueryResult>(
        q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
    );

    expect(
        allTokens.data.filter(t => t.data.type === 'refresh').length,
    ).toEqual(tokenConfig.refresh);

    expect(allTokens.data.filter(t => t.data.type === 'access').length).toEqual(
        tokenConfig.access,
    );
}

export async function verifyRefreshTokensLogout(
    expect: typeof import('vitest')['expect'],
    adminClient: fauna.Client,
    loggedOutCount: number,
) {
    const allTokens = await adminClient.query<TokenCollectionQueryResult>(
        q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
    );

    expect(
        allTokens.data.filter(
            t => t.data.type === 'refresh' && t.data.loggedOut,
        ).length,
    ).toEqual(loggedOutCount);
}

export async function getAccessToken(adminClient) {
    const allTokens = await adminClient.query(
        q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
    );

    return allTokens.data.filter(t => t.data.type === 'access')[0];
}
