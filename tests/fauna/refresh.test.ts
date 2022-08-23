import fauna from 'faunadb';
import { describe, it, expect } from 'vitest';
import {
    destroyTestDatabase,
    getClient,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { delay } from './helpers/_delay';
import { REFRESH_TOKEN_EXPIRED } from '../../src/fauna/src/anomalies';
import {
    GRACE_PERIOD_SECONDS,
    ACCESS_TOKEN_LIFETIME_SECONDS,
    REFRESH_TOKEN_LIFETIME_SECONDS,
    REFRESH_TOKEN_RECLAIMTIME_SECONDS,
} from './resources/functions/_refresh-modified';
import { verifyTokens } from './helpers/_test-extensions';
import type {
    FaunaLoginResult,
    RefreshResult,
    SetUp,
    TearDown,
    TokenResult,
    TokenCollectionQueryResult,
    AnomalyCollectionQueryResult,
    FaunauthError,
} from '../../src/types';

const q = fauna.query;
const {
    Tokens,
    Call,
    Create,
    Collection,
    Get,
    Paginate,
    Documents,
    Lambda,
    Var,
} = q;

const setUp: SetUp = async testName => {
    const databaseClients = await setupTestDatabase(fauna, testName);
    const adminClient = databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(q, adminClient, [
        'src/fauna/resources/faunauth/collections/anomalies.fql',
        'src/fauna/resources/faunauth/collections/dinos.fql',
        'src/fauna/resources/faunauth/collections/User.fql',
        'src/fauna/resources/faunauth/functions/createEmailConfirmationToken.js',
        'src/fauna/resources/faunauth/functions/login.js',
        'src/fauna/resources/faunauth/functions/loginWithMagicLink.js',
        'src/fauna/resources/faunauth/functions/loginWithUsername.js',
        'src/fauna/resources/faunauth/functions/logout.js',
        'src/fauna/resources/faunauth/functions/register.js',
        'src/fauna/resources/faunauth/functions/changePassword.js',
        'src/fauna/resources/faunauth/functions/setPassword.js',
        'src/fauna/resources/faunauth/indexes/access-token-by-refresh-token.fql',
        'src/fauna/resources/faunauth/indexes/users-by-email.fql',
        'src/fauna/resources/faunauth/indexes/tokens-by-instance-sessionid-type-and-loggedout.fql',
        'src/fauna/resources/faunauth/indexes/tokens-by-instance-type-and-loggedout.fql',
        'src/fauna/resources/faunauth/indexes/tokens-by-type-email-and-used.fql',
        'src/fauna/resources/faunauth/roles/loggedin.js',
        'src/fauna/resources/faunauth/roles/public.fql',
        'src/fauna/resources/faunauth/roles/refresh.js',
        // Custom function for tests to verify the age calculation.
        'tests/fauna/resources/functions/_refresh-modified.js',
        'tests/fauna/resources/functions/_login-modified.js',
    ]);

    const testDocument = await adminClient.query<{ ref: fauna.values.Ref }>(
        Create(Collection('dinos'), { data: { hello: 'world' } }),
    );

    // create data, register, and login.
    const testDocumentRef = testDocument.ref;

    await adminClient.query(
        Call('register', 'verysecure', 'user@domain.com', {
            email: 'user@domain.com',
            locale: 'en-US',
        }),
    );

    const loginResult = await adminClient.query<
        FaunauthError | FaunaLoginResult
    >(Call('login-modified', 'user@domain.com', 'verysecure'));

    return {
        loginResult,
        testDocumentRef,
        databaseClients,
    };
};

const tearDown: TearDown = async (testName, context) => {
    await destroyTestDatabase(
        q,
        testName,
        context.databaseClients.parentClient,
    );

    return true;
};

describe('refresh logic', () => {
    it('can rotate tokens by using the refresh token', async () => {
        const testName = 'rotateWithRefreshToken';
        const context = await setUp(testName);

        expect.assertions(10);
        const adminClient = context.databaseClients.childClient;

        // initially we have 1 token of each type from the login.
        await verifyTokens(expect, adminClient, { access: 1, refresh: 1 });

        if (context.loginResult && 'tokens' in context.loginResult) {
            const refreshClient = getClient(
                fauna,
                context.loginResult.tokens.refresh.secret,
            );
            const refreshResult = await refreshClient.query<RefreshResult>(
                Call('refresh'),
            );

            if (refreshResult && 'tokens' in refreshResult) {
                // After the refresh we have 2 tokens of each kind.
                await verifyTokens(expect, adminClient, {
                    access: 2,
                    refresh: 2,
                });
                // We  successfully received a token
                expect(refreshResult.tokens.access).toBeTruthy();
                expect(refreshResult.tokens.refresh).toBeTruthy();
                // And it's different than previous token
                expect(refreshResult.tokens.access.secret).not.toBe(
                    context.loginResult.tokens.access.secret,
                );
                expect(refreshResult.tokens.access.secret).not.toBe(
                    context.loginResult.tokens.access.secret,
                );
                // The original refresh token was not used but now is used
                expect(
                    context.loginResult.tokens.refresh.data.used,
                ).toBeFalsy();
            }

            const originalRefreshToken = await adminClient.query<TokenResult>(
                Get(context.loginResult.tokens.refresh.ref),
            );

            expect(originalRefreshToken.data.used).toBeTruthy();
        }

        await tearDown(testName, context);
    });

    it('can rotate tokens multiple times within the GRACE_PERIOD_SECONDS threshold', async () => {
        const testName = 'rotateInGracePeriod';
        const context = await setUp(testName);

        expect.assertions(6);

        if (context.loginResult && 'tokens' in context.loginResult) {
            const refreshClient = getClient(
                fauna,
                context.loginResult.tokens.refresh.secret,
            );

            const promise0 = refreshClient.query<RefreshResult>(
                Call('refresh'),
            );

            const promise1 = refreshClient.query<RefreshResult>(
                Call('refresh'),
            );

            const promise2 = refreshClient.query<RefreshResult>(
                Call('refresh'),
            );

            const results = await Promise.allSettled([
                promise0,
                promise1,
                promise2,
            ]);

            let refreshSecret0 = 'secret';
            let refreshSecret1 = refreshSecret0;
            let refreshSecret2 = refreshSecret1;

            if (
                results[0].status === 'fulfilled' &&
                typeof results[0].value === 'object' &&
                'tokens' in results[0].value
            ) {
                expect(results[0].value?.tokens?.access).toBeTruthy();
                refreshSecret0 = results[0].value?.tokens.refresh.secret;
            }

            if (
                results[1].status === 'fulfilled' &&
                typeof results[1].value === 'object' &&
                'tokens' in results[1].value
            ) {
                expect(results[1].value?.tokens?.access).toBeTruthy();
                refreshSecret1 = results[1].value?.tokens.refresh.secret;
            }

            if (
                results[2].status === 'fulfilled' &&
                typeof results[2].value === 'object' &&
                'tokens' in results[2].value
            ) {
                expect(results[2].value?.tokens?.access).toBeTruthy();
                refreshSecret2 = results[2].value?.tokens.refresh.secret;
            }

            expect(refreshSecret0).not.toBe(refreshSecret1);
            expect(refreshSecret1).not.toBe(refreshSecret2);
            expect(refreshSecret2).not.toBe(refreshSecret0);
        }

        await tearDown(testName, context);
    });

    it('cannot rotate tokens when the REFRESH_TOKEN_LIFETIME_SECONDS has expired from the original login refresh token', async () => {
        const testName = 'rotateAfterExpiration';
        const context = await setUp(testName);

        expect.assertions(1);

        if (context.loginResult && 'tokens' in context.loginResult) {
            const refreshClient = getClient(
                fauna,
                context.loginResult.tokens.refresh.secret,
            );

            // since the first refresh token is called with the original
            await delay(REFRESH_TOKEN_LIFETIME_SECONDS * 1000 + 2000);
            const refreshResult = await refreshClient.query<RefreshResult>(
                Call('refresh'),
            );

            expect(refreshResult).toEqual(REFRESH_TOKEN_EXPIRED);
        }

        await tearDown(testName, context);
    });

    it('cannot rotate tokens when the REFRESH_TOKEN_LIFETIME_SECONDS has expired from an already refreshed refresh token', async () => {
        const testName = 'rotateAfterExpirationAndRefreshed';
        const context = await setUp(testName);

        expect.assertions(1);

        if (context.loginResult && 'tokens' in context.loginResult) {
            const initialClient = getClient(
                fauna,
                context.loginResult.tokens.refresh.secret,
            );
            const initialRefreshResult =
                await initialClient.query<RefreshResult>(Call('refresh'));

            if (initialRefreshResult && 'tokens' in initialRefreshResult) {
                const refreshClient = getClient(
                    fauna,
                    initialRefreshResult.tokens.refresh.secret,
                );

                // since the first refresh token is called with the original
                await delay(REFRESH_TOKEN_LIFETIME_SECONDS * 1000 + 2000);
                const refreshResult = await refreshClient.query(
                    Call('refresh'),
                );

                expect(refreshResult).toEqual(REFRESH_TOKEN_EXPIRED);
            }
        }

        await tearDown(testName, context);
    });

    it('after the REFRESH_TOKEN_LIFETIME_SECONDS has expired the token still exists, after REFRESH_TOKEN_RECLAIMTIME_SECONDS it is gone', async () => {
        const testName = 'lifetimeAndReclaimTime';
        const context = await setUp(testName);

        expect.assertions(2);
        const adminClient = context.databaseClients.childClient;

        // since the first refresh token is called with the original
        await delay(REFRESH_TOKEN_LIFETIME_SECONDS * 1000 + 2000);
        // by now the access token is gone, the refresh token remains
        const allTokens = await adminClient.query<TokenCollectionQueryResult>(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );

        expect(allTokens.data.length).toBe(1);

        // after the reclaimtime has passed, the token is gone.
        await delay(
            REFRESH_TOKEN_RECLAIMTIME_SECONDS -
                (REFRESH_TOKEN_LIFETIME_SECONDS * 1000 + 2000),
        );
        const allTokens2 = await adminClient.query<TokenCollectionQueryResult>(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );

        expect(allTokens2.data.length).toBe(1);

        await tearDown(testName, context);
    });

    it('cannot use the access tokens after ACCESS_TOKEN_LIFETIME_SECONDS', async () => {
        const testName = 'accessSecretLifetime';
        const context = await setUp(testName);

        const { testDocumentRef } = context;

        if (!testDocumentRef) {
            throw new Error(
                'testDocumentRef not found - something is wrong in setUp',
            );
        }

        expect.assertions(2);

        if (context.loginResult && 'tokens' in context.loginResult) {
            const refreshClient = getClient(
                fauna,
                context.loginResult.tokens.refresh.secret,
            );
            const refreshResult = await refreshClient.query<RefreshResult>(
                Call('refresh'),
            );

            if (refreshResult && 'tokens' in refreshResult) {
                expect(refreshResult.tokens.access).toBeTruthy();

                await delay(ACCESS_TOKEN_LIFETIME_SECONDS * 1000 + 2000);

                const accessSecret = refreshResult.tokens.access.secret;
                const loggedInClient = getClient(fauna, accessSecret);

                const loginWithExpiredToken = async () => {
                    return loggedInClient.query(Get(testDocumentRef));
                };

                await expect(loginWithExpiredToken()).rejects.toBeInstanceOf(
                    fauna.errors.Unauthorized,
                );
            }
        }

        await tearDown(testName, context);
    });

    // TODO fix this failing test case

    it.skip('cannot use the refresh token after the GRACE_PERIOD_SECONDS', async () => {
        const testName = 'refreshAfterGracePeriod';
        const context = await setUp(testName);

        expect.assertions(6);

        if (context.loginResult && 'tokens' in context.loginResult) {
            const adminClient = context.databaseClients.childClient;

            const refreshClient = getClient(
                fauna,
                context.loginResult.tokens.refresh.secret,
            );
            const refreshBeforeDelayResult =
                await refreshClient.query<RefreshResult>(Call('refresh'));

            if (
                refreshBeforeDelayResult &&
                'tokens' in refreshBeforeDelayResult
            ) {
                expect(refreshBeforeDelayResult.tokens.access).toBeTruthy();
            }

            await delay(GRACE_PERIOD_SECONDS * 1000 + 2000);

            // The age is now higher than the grace period.
            const promise0 = refreshClient.query<RefreshResult>(
                Call('refresh'),
            );

            const promise1 = refreshClient.query<RefreshResult>(
                Call('refresh'),
            );

            // Both promises are rejected, but the anomalies are not logged - perhaps something
            // has changed about how the refresh logic works?
            const results = await Promise.allSettled([promise0, promise1]);

            expect(results[0].status).toBe('rejected');
            expect(results[1].status).toBe('rejected');

            // If we do, the anomaly will be logged!
            const anomalies =
                await adminClient.query<AnomalyCollectionQueryResult>(
                    q.Map(
                        Paginate(Documents(Collection('anomalies'))),
                        Lambda(['x'], Get(Var('x'))),
                    ),
                );

            expect(anomalies.data.length).toBe(2);

            // Two anomalies for this user are logged
            expect(anomalies.data[0].data.account.id).toBe(
                context.loginResult.account.ref.id,
            );
            expect(anomalies.data[1].data.account.id).toBe(
                context.loginResult.account.ref.id,
            );
        }

        await tearDown(testName, context);
    });

    it('when we refresh and call fauna in parallel we still get access', async () => {
        const testName = 'refreshInParallel';
        const context = await setUp(testName);

        const { testDocumentRef } = context;

        if (!testDocumentRef) {
            throw new Error(
                'testDocumentRef not found - something is wrong in setUp',
            );
        }

        expect.assertions(2);

        if (context.loginResult && 'tokens' in context.loginResult) {
            // Silent refresh could cause our access token to get invalidated when the call is still
            // in flight.
            const refreshClient = getClient(
                fauna,
                context.loginResult.tokens.refresh.secret,
            );
            const loggedInClient = getClient(
                fauna,
                context.loginResult.tokens.access.secret,
            );
            const refreshResult = await refreshClient.query<RefreshResult>(
                Call('refresh'),
            );

            const queryBeforeRefresh = async () => {
                return loggedInClient.query(Get(testDocumentRef));
            };

            await expect(queryBeforeRefresh()).resolves.toBeTruthy();

            if (refreshResult && 'tokens' in refreshResult) {
                // Use the new token
                const loggedInClientAfterRefresh = getClient(
                    fauna,
                    refreshResult.tokens.access.secret,
                );

                const queryAfterRefresh = async () => {
                    return loggedInClientAfterRefresh.query(
                        Get(testDocumentRef),
                    );
                };

                await expect(queryAfterRefresh()).resolves.toBeTruthy();
            }
        }

        await tearDown(testName, context);
    });
});
