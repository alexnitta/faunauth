import fauna from 'faunadb';
import { verifyTokens } from './helpers/_test-extensions';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { FAUNA_TEST_TIMEOUT } from '../constants';
import type {
    TestContext,
    FaunaLoginResult,
    TokenCollectionQueryResult,
    TokenResult,
    SetUp,
    TearDown,
} from '../../src/types';

const q = fauna.query;
const { Call, Paginate, Lambda, Get, Var, Tokens } = q;

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const setUp: SetUp = async testName => {
    const context: TestContext = {
        databaseClients: null,
    };

    context.databaseClients = await setupTestDatabase(fauna, testName);

    const client = context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(q, client, [
        'src/fauna/resources/faunauth/collections/User.fql',
        'src/fauna/resources/faunauth/functions/createEmailConfirmationToken.js',
        'src/fauna/resources/faunauth/functions/loginWithMagicLink.js',
        'src/fauna/resources/faunauth/functions/register.js',
        'src/fauna/resources/faunauth/indexes/tokens-by-type-email-and-used.fql',
        'src/fauna/resources/faunauth/indexes/users-by-email.fql',
    ]);

    await client.query(
        Call('register', 'verysecure', {
            email: 'user@domain.com',
            username: 'user',
            locale: 'en-US',
        }),
    );

    const createTokenResult = await client.query<{ token: TokenResult }>(
        Call('createEmailConfirmationToken', 'user@domain.com'),
    );

    context.secret = createTokenResult.token.secret;

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

describe('loginWithMagicLink()', () => {
    it('can log in with valid email and secret', async () => {
        const testName = 'magicLinkWithCorrectEmailAndSecret';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;

        const loginResult = await client.query<false | FaunaLoginResult>(
            Call('loginWithMagicLink', 'user@domain.com', context.secret),
        );

        if (loginResult) {
            expect(loginResult.tokens.access).toBeTruthy();
            expect(loginResult.tokens.refresh).toBeTruthy();
            expect(loginResult.account).toBeTruthy();
        }

        await tearDown(testName, context);
    });

    it('cannot log in with an invalid secret', async () => {
        const testName = 'magicLinkWithInvalidSecret';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;

        const loginWithInvalidSecret = async () =>
            await client.query<false | FaunaLoginResult>(
                Call('loginWithMagicLink', 'user@domain.com', 'invalid-secret'),
            );

        await expect(loginWithInvalidSecret()).rejects.toBeInstanceOf(
            fauna.errors.BadRequest,
        );

        await tearDown(testName, context);
    });

    it('cannot log in with a non-user email', async () => {
        const testName = 'magicLinkWithNonUserEmail';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query<false | FaunaLoginResult>(
            Call('loginWithMagicLink', 'nonuser@domain.com', context.secret),
        );

        expect(loginResult).toBe(false);

        await tearDown(testName, context);
    });

    it('creates creates two tokens per login; refresh tokens are unused', async () => {
        const testName = 'magicLinkCheckTokenCreation';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;
        let allTokens = await client.query<TokenCollectionQueryResult>(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );
        let accessAndRefreshTokens = allTokens.data.filter(t =>
            ['access', 'refresh'].includes(t.data.type),
        );

        // Initially there are no access or refresh tokens.
        expect(accessAndRefreshTokens.length).toEqual(0);

        await client.query<false | FaunaLoginResult>(
            Call('loginWithMagicLink', 'user@domain.com', context.secret),
        );

        // Each login creates 2 tokens, one access, one refresh.

        allTokens = await client.query(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );
        accessAndRefreshTokens = allTokens.data.filter(t =>
            ['access', 'refresh'].includes(t.data.type),
        );

        // verifyTokens has 2 assertions in it
        await verifyTokens(expect, client, { access: 1, refresh: 1 });

        await tearDown(testName, context);
    });
});
