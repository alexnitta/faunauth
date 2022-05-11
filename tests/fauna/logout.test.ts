import fauna from 'faunadb';
import {
    verifyRefreshTokensLogout,
    verifyTokens,
} from './helpers/_test-extensions';
import {
    destroyTestDatabase,
    getClient,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import type {
    TestContext,
    FaunaLoginResult,
    SetUp,
    TearDown,
    TestDocument,
} from '../../src/types';

const q = fauna.query;
const { Call, Create, Collection, Get } = q;

// This test seems to time out when running all tests, so I'm increasing the timeout value here
jest.setTimeout(60 * 1000 * 3);

const setUp: SetUp = async testName => {
    const context: TestContext = {
        databaseClients: {
            childClient: null,
            parentClient: null,
        },
        testDocumentRef: null,
    };

    const databaseClients = await setupTestDatabase(fauna, testName);
    const adminClient = databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(q, adminClient, [
        'src/fauna/resources/faunauth/collections/anomalies.fql',
        'src/fauna/resources/faunauth/collections/dinos.fql',
        'src/fauna/resources/faunauth/collections/User.fql',
        'src/fauna/resources/faunauth/functions/createEmailConfirmationToken.js',
        'src/fauna/resources/faunauth/functions/login.js',
        'src/fauna/resources/faunauth/functions/logout.js',
        'src/fauna/resources/faunauth/functions/refresh.js',
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
    ]);

    const testDocumentRef = (
        await adminClient.query<{ ref: fauna.values.Ref }>(
            Create(Collection('dinos'), { data: { hello: 'world' } }),
        )
    ).ref;

    await adminClient.query(
        Call('register', 'verysecure', {
            email: 'user@domain.com',
            locale: 'en-US',
        }),
    );

    await adminClient.query(
        Call('register', 'verysecure', {
            email: 'foo@other.com',
            locale: 'en-US',
        }),
    );

    context.testDocumentRef = testDocumentRef;
    context.databaseClients = databaseClients;

    return context;
};

const tearDown: TearDown = async (testName, context) => {
    await destroyTestDatabase(
        q,
        testName,
        context.databaseClients.parentClient,
    );

    return true;
};

describe('logout()', () => {
    test('with all=false only logs out the current session', async () => {
        const testName = 'allEqualsFalse';
        const context = await setUp(testName);

        expect.assertions(11);

        const client = context.databaseClients.childClient;

        const loginResultUserSession1 = await client.query<
            false | FaunaLoginResult
        >(Call('login', 'user@domain.com', 'verysecure'));
        const loginResultUserSession2 = await client.query<
            false | FaunaLoginResult
        >(Call('login', 'user@domain.com', 'verysecure')); // same user, but another browser/device
        const loginResultOtherSession = await client.query<
            false | FaunaLoginResult
        >(Call('login', 'foo@other.com', 'verysecure'));

        if (
            loginResultUserSession1 &&
            loginResultUserSession2 &&
            loginResultOtherSession
        ) {
            const loggedInClientUser1 = getClient(
                fauna,
                loginResultUserSession1.tokens.access.secret,
            );
            const loggedInClientUser2 = getClient(
                fauna,
                loginResultUserSession2.tokens.access.secret,
            );
            const loggedInClientOtherUser = getClient(
                fauna,
                loginResultOtherSession.tokens.access.secret,
            );

            expect(
                (
                    await loggedInClientUser1.query<{
                        data: TestDocument;
                    }>(Get(context.testDocumentRef))
                ).data,
            ).toBeTruthy();

            expect(
                (
                    await loggedInClientUser2.query<{
                        data: TestDocument;
                    }>(Get(context.testDocumentRef))
                ).data,
            ).toBeTruthy();

            expect(
                (
                    await loggedInClientOtherUser.query<{
                        data: TestDocument;
                    }>(Get(context.testDocumentRef))
                ).data,
            ).toBeTruthy();

            // We start with 3 access tokens.
            await verifyTokens(expect, client, { access: 3, refresh: 3 });

            // We log out
            const refreshClientUser1 = getClient(
                fauna,
                loginResultUserSession1.tokens.refresh.secret,
            );

            await refreshClientUser1.query(Call('logout', false));
            // After logging out, we only have 2 access tokens, since we passed in false other tokens from
            // this account are not impacted. Refresh tokens remain but are set to loggedOut.
            await verifyTokens(expect, client, { access: 2, refresh: 3 });
            await verifyRefreshTokensLogout(expect, client, 1);

            const fetchPrivateData = async () => {
                return loggedInClientUser1.query(Get(context.testDocumentRef));
            };

            // We can no longer fetch the data.
            await expect(fetchPrivateData()).rejects.toThrow(
                fauna.errors.Unauthorized,
            );

            // But the other two clients are not impacted
            expect(
                (
                    await loggedInClientUser2.query<{
                        data: TestDocument;
                    }>(Get(context.testDocumentRef))
                ).data,
            ).toBeTruthy();

            expect(
                (
                    await loggedInClientOtherUser.query<{
                        data: TestDocument;
                    }>(Get(context.testDocumentRef))
                ).data,
            ).toBeTruthy();
        }

        await tearDown(testName, context);
    });

    test('with all=true logs out all sessions for that account', async () => {
        const testName = 'allEqualsTrue';
        const context = await setUp(testName);

        expect.assertions(11);

        const client = context.databaseClients.childClient;

        const loginResultUserSession1 = await client.query<
            false | FaunaLoginResult
        >(Call('login', 'user@domain.com', 'verysecure'));
        const loginResultUserSession2 = await client.query<
            false | FaunaLoginResult
        >(Call('login', 'user@domain.com', 'verysecure'));
        const loginResultOtherSession = await client.query<
            false | FaunaLoginResult
        >(Call('login', 'foo@other.com', 'verysecure'));

        if (
            loginResultUserSession1 &&
            loginResultUserSession2 &&
            loginResultOtherSession
        ) {
            const loggedInClientUser1 = getClient(
                fauna,
                loginResultUserSession1.tokens.access.secret,
            );
            const loggedInClientUser2 = getClient(
                fauna,
                loginResultUserSession2.tokens.access.secret,
            );
            const loggedInClientOtherUser = getClient(
                fauna,
                loginResultOtherSession.tokens.access.secret,
            );

            expect(
                (
                    await loggedInClientUser1.query<{
                        data: TestDocument;
                    }>(Get(context.testDocumentRef))
                ).data,
            ).toBeTruthy();

            expect(
                (
                    await loggedInClientUser2.query<{
                        data: TestDocument;
                    }>(Get(context.testDocumentRef))
                ).data,
            ).toBeTruthy();

            expect(
                (
                    await loggedInClientOtherUser.query<{
                        data: TestDocument;
                    }>(Get(context.testDocumentRef))
                ).data,
            ).toBeTruthy();

            await verifyTokens(expect, client, { access: 3, refresh: 3 });

            // We log out
            const refreshClientUser1 = getClient(
                fauna,
                loginResultUserSession1.tokens.refresh.secret,
            );

            await refreshClientUser1.query(Call('logout', true));

            // access tokens are gone, refresh tokens are set to logged out.
            await verifyTokens(expect, client, { access: 1, refresh: 3 });
            await verifyRefreshTokensLogout(expect, client, 2);

            // We can no longer fetch the data.
            await expect(async () => {
                console.log(
                    await loggedInClientUser1.query(
                        Get(context.testDocumentRef),
                    ),
                );
            }).rejects.toThrow(fauna.errors.Unauthorized);

            await expect(async () => {
                console.log(
                    await loggedInClientUser2.query(
                        Get(context.testDocumentRef),
                    ),
                );
            }).rejects.toThrow(fauna.errors.Unauthorized);

            // But clients from other users are not impacted
            expect(
                (
                    await loggedInClientOtherUser.query<{
                        data: Record<string, unknown>;
                    }>(Get(context.testDocumentRef))
                ).data,
            ).toBeTruthy();
        }
        await tearDown(testName, context);
    });

    test('tokens that are logged out can no longer be used to refresh or log out', async () => {
        const testName = 'loggedOutTokens';
        const context = await setUp(testName);

        expect.assertions(2);

        const client = context.databaseClients.childClient;
        const loginResultUserSession1 = await client.query<
            false | FaunaLoginResult
        >(Call('login', 'user@domain.com', 'verysecure'));

        if (loginResultUserSession1) {
            const refreshClient = getClient(
                fauna,
                loginResultUserSession1.tokens.refresh.secret,
            );

            // Log out all tokens

            await refreshClient.query(Call('logout', true));

            // We can no longer logout

            expect(async () => {
                await refreshClient.query(Call('logout', true));
            }).rejects.toThrow();

            expect(async () => {
                await refreshClient.query(Call('refresh'));
            }).rejects.toThrow();
        }

        await tearDown(testName, context);
    });
});
