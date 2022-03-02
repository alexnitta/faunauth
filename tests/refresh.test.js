import fauna from 'faunadb';
import * as schemaMigrate from '@fauna-labs/fauna-schema-migrate';
import {
    destroyTestDatabase,
    getClient,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { delay } from './helpers/_delay';
import {
    REFRESH_TOKEN_EXPIRED,
    REFRESH_TOKEN_REUSE_ERROR,
} from '../fauna/src/anomalies';
import {
    GRACE_PERIOD_SECONDS,
    ACCESS_TOKEN_LIFETIME_SECONDS,
    REFRESH_TOKEN_LIFETIME_SECONDS,
    REFRESH_TOKEN_RECLAIMTIME_SECONDS,
} from './resources/functions/_refresh-modified';
import { verifyTokens } from './helpers/_test-extensions';
import { FAUNA_TEST_TIMEOUT } from './constants';

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

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const setUp = async testName => {
    const context = {};

    context.databaseClients = await setupTestDatabase(fauna, testName);

    const adminClient = context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, adminClient, [
        'fauna/resources/collections/anomalies.fql',
        'fauna/resources/collections/dinos.fql',
        'fauna/resources/collections/User.fql',
        'fauna/resources/functions/createEmailConfirmationToken.js',
        'fauna/resources/functions/login.js',
        'fauna/resources/functions/logout.js',
        'fauna/resources/functions/register.fql',
        'fauna/resources/functions/changePassword.js',
        'fauna/resources/functions/resetPassword.js',
        'fauna/resources/indexes/access-token-by-refresh-token.fql',
        'fauna/resources/indexes/users-by-email.fql',
        'fauna/resources/indexes/tokens-by-instance-sessionid-type-and-loggedout.fql',
        'fauna/resources/indexes/tokens-by-instance-type-and-loggedout.fql',
        'fauna/resources/indexes/tokens-by-type-email-and-used.fql',
        'fauna/resources/roles/loggedin.js',
        'fauna/resources/roles/public.fql',
        'fauna/resources/roles/refresh.js',
        // Custom function for tests to verify the age calculation.
        'tests/resources/functions/_refresh-modified.js',
        'tests/resources/functions/_login-modified.js',
    ]);

    const testDocument = await adminClient.query(
        Create(Collection('dinos'), { data: { hello: 'world' } }),
    );

    // create data, register, and login.
    context.testDocumentRef = testDocument.ref;

    await adminClient.query(
        Call('register', 'verysecure', {
            email: 'user@domain.com',
            locale: 'en-US',
            invitedBy: 'foo-user-id',
            toGroup: 'foo-group-id',
        }),
    );

    const loginResult = await adminClient.query(
        Call('login-modified', 'user@domain.com', 'verysecure'),
    );

    context.loginResult = loginResult;

    return context;
};

const tearDown = async (testName, context) => {
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
        const refreshClient = getClient(
            fauna,
            context.loginResult.tokens.refresh.secret,
        );
        const refreshResult = await refreshClient.query(Call('refresh'));

        // After the refresh we have 2 tokens of each kind.
        await verifyTokens(expect, adminClient, { access: 2, refresh: 2 });
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
        expect(context.loginResult.tokens.refresh.data.used).toBeFalsy();
        const originalRefreshToken = await adminClient.query(
            Get(context.loginResult.tokens.refresh.ref),
        );

        expect(originalRefreshToken.data.used).toBeTruthy();

        await tearDown(testName, context);
    });

    // TODO: fix this failing test case
    it.skip('can rotate tokens multiple times within the GRACE_PERIOD_SECONDS threshold', async () => {
        const testName = 'rotateInGracePeriod';
        const context = await setUp(testName);

        expect.assertions(5);

        const refreshClient = getClient(
            fauna,
            context.loginResult.tokens.refresh.secret,
        );
        const refreshResult = await refreshClient.query(Call('refresh'));

        // TODO: error is thrown here.
        // The first "refresh" call works, but then we get these errors for subsequent ones:
        // Unauthorized: unauthorized. Check that endpoint, schema, port and secret are correct during client’s instantiation

        const refreshResult2 = await refreshClient.query(Call('refresh'));
        const refreshResult3 = await refreshClient.query(Call('refresh'));

        expect(refreshResult.tokens.access).toBeTruthy();
        expect(refreshResult2.tokens.access).toBeTruthy();
        expect(refreshResult2.tokens.access).toBeTruthy();
        expect(refreshResult.tokens.access.secret).not.toBe(
            refreshResult2.tokens.access.secret,
        );
        expect(refreshResult2.tokens.access.secret).not.toBe(
            refreshResult3.tokens.access.secret,
        );

        await tearDown(testName, context);
    });

    it('cannot rotate tokens when the REFRESH_TOKEN_LIFETIME_SECONDS has expired from the original login refresh token', async () => {
        const testName = 'rotateAfterExpiration';
        const context = await setUp(testName);

        expect.assertions(1);
        const refreshClient = getClient(
            fauna,
            context.loginResult.tokens.refresh.secret,
        );

        // since the first refresh token is called with the original
        await delay(REFRESH_TOKEN_LIFETIME_SECONDS * 1000 + 2000);
        const refreshResult = await refreshClient.query(Call('refresh'));

        expect(refreshResult).toEqual(REFRESH_TOKEN_EXPIRED);

        await tearDown(testName, context);
    });

    it('cannot rotate tokens when the REFRESH_TOKEN_LIFETIME_SECONDS has expired from an already refreshed refresh token', async () => {
        const testName = 'rotateAfterExpirationAndRefreshed';
        const context = await setUp(testName);

        expect.assertions(1);
        const initialClient = getClient(
            fauna,
            context.loginResult.tokens.refresh.secret,
        );
        const initialRefreshResult = await initialClient.query(Call('refresh'));
        const refreshClient = getClient(
            fauna,
            initialRefreshResult.tokens.refresh.secret,
        );

        // since the first refresh token is called with the original
        await delay(REFRESH_TOKEN_LIFETIME_SECONDS * 1000 + 2000);
        const refreshResult = await refreshClient.query(Call('refresh'));

        expect(refreshResult).toEqual(REFRESH_TOKEN_EXPIRED);

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
        const allTokens = await adminClient.query(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );

        expect(allTokens.data.length).toBe(1);

        // after the reclaimtime has passed, the token is gone.
        await delay(
            REFRESH_TOKEN_RECLAIMTIME_SECONDS -
                (REFRESH_TOKEN_LIFETIME_SECONDS * 1000 + 2000),
        );
        const allTokens2 = await adminClient.query(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );

        expect(allTokens2.data.length).toBe(1);

        await tearDown(testName, context);
    });

    it('cannot use the access tokens after ACCESS_TOKEN_LIFETIME_SECONDS', async () => {
        const testName = 'accessTokenLifetime';
        const context = await setUp(testName);

        expect.assertions(2);
        const refreshClient = getClient(
            fauna,
            context.loginResult.tokens.refresh.secret,
        );
        const refreshResult = await refreshClient.query(Call('refresh'));

        expect(refreshResult.tokens.access).toBeTruthy();

        await delay(ACCESS_TOKEN_LIFETIME_SECONDS * 1000 + 2000);

        const accessToken = refreshResult.tokens.access.secret;
        const loggedInClient = getClient(fauna, accessToken);

        const loginWithExpiredToken = async () => {
            return loggedInClient.query(Get(context.testDocumentRef));
        };

        await expect(loginWithExpiredToken()).rejects.toBeInstanceOf(
            fauna.errors.Unauthorized,
        );

        await tearDown(testName, context);
    });

    // TODO: fix this failing test case
    test.skip('cannot use the refresh token after the GRACE_PERIOD_SECONDS', async () => {
        const testName = 'refreshAfterGracePeriod';
        const context = await setUp(testName);

        expect.assertions(6);
        const adminClient = context.databaseClients.childClient;

        const refreshClient = getClient(
            fauna,
            context.loginResult.tokens.refresh.secret,
        );
        const refreshResult = await refreshClient.query(Call('refresh'));

        expect(refreshResult.tokens.access).toBeTruthy();

        await delay(GRACE_PERIOD_SECONDS * 1000 + 2000);

        // TODO: error is thrown here.
        // The first "refresh" call works, but then we get these errors for subsequent ones:
        // Unauthorized: unauthorized. Check that endpoint, schema, port and secret are correct during client’s instantiation

        // The age is now higher than the grace period.
        const refreshResult2 = await refreshClient.query(Call('refresh'));

        expect(refreshResult2).toEqual(REFRESH_TOKEN_REUSE_ERROR);

        const refreshResult3 = await refreshClient.query(Call('refresh'));

        expect(refreshResult3).toEqual(REFRESH_TOKEN_REUSE_ERROR);

        // If we do, the anomaly will be logged!
        const anomalies = await adminClient.query(
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

        await tearDown(testName, context);
    });

    it('when we refresh and call fauna in parallel we still get access', async () => {
        const testName = 'refreshInParallel';
        const context = await setUp(testName);

        expect.assertions(2);
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
        const refreshResult = await refreshClient.query(Call('refresh'));

        const queryBeforeRefresh = async () => {
            return loggedInClient.query(Get(context.testDocumentRef));
        };

        await expect(queryBeforeRefresh()).resolves.toBeTruthy();

        // Use the new token
        const loggedInClientAfterRefresh = getClient(
            fauna,
            refreshResult.tokens.access.secret,
        );

        const queryAfterRefresh = async () => {
            return loggedInClientAfterRefresh.query(
                Get(context.testDocumentRef),
            );
        };

        await expect(queryAfterRefresh()).resolves.toBeTruthy();

        await tearDown(testName, context);
    });
});
