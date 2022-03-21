import fauna from 'faunadb';
import * as schemaMigrate from '@fauna-labs/fauna-schema-migrate';
import { verifyTokens } from './helpers/_test-extensions';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { FAUNA_TEST_TIMEOUT } from './constants';

const q = fauna.query;
const { Call, Paginate, Tokens, Lambda, Get, Var } = q;

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const setUp = async testName => {
    const context = {};

    context.databaseClients = await setupTestDatabase(fauna, testName);

    const client = context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, client, [
        'fauna/resources/faunauth/collections/User.fql',
        'fauna/resources/faunauth/functions/register.fql',
        'fauna/resources/faunauth/functions/login.js',
        'fauna/resources/faunauth/functions/loginWithUsername.js',
        'fauna/resources/faunauth/indexes/users-by-email.fql',
        'fauna/resources/faunauth/indexes/users-by-username.fql',
    ]);

    await client.query(
        Call('register', 'verysecure', {
            email: 'user@domain.com',
            username: 'user',
            locale: 'en-US',
            invitedBy: 'foo-user-id',
            toGroup: 'foo-group-id',
        }),
    );

    await client.query(
        Call('register', 'verysecure', {
            email: 'user2@domain.com',
            username: 'user2',
            locale: 'en-US',
            invitedBy: 'foo-user-id',
            toGroup: 'foo-group-id',
        }),
    );

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

describe('login()', () => {
    it('can log in with correct email and password', async () => {
        const testName = 'correctEmailAndPassword';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call('login', 'user@domain.com', 'verysecure'),
        );

        expect(loginResult.tokens.access).toBeTruthy();
        expect(loginResult.tokens.refresh).toBeTruthy();
        expect(loginResult.account).toBeTruthy();

        await tearDown(testName, context);
    });

    it('can log in with correct username and password', async () => {
        const testName = 'correctUsernameAndPassword';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call('loginWithUsername', 'user', 'verysecure'),
        );

        expect(loginResult.tokens.access).toBeTruthy();
        expect(loginResult.tokens.refresh).toBeTruthy();
        expect(loginResult.account).toBeTruthy();

        await tearDown(testName, context);
    });

    it('cannot log in with incorrect password', async () => {
        const testName = 'incorrectPassword';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call('login', 'user@domain.com', 'wrong'),
        );

        expect(loginResult).toBeNull();

        await tearDown(testName, context);
    });

    it('cannot log in with incorrect email', async () => {
        const testName = 'incorrectEmail';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call('login', 'notuser@domain.com', 'verysecure'),
        );

        // the returned result is the same as incorrect passwords
        expect(loginResult).toBeNull();

        await tearDown(testName, context);
    });

    it('cannot log in with incorrect username', async () => {
        const testName = 'incorrectUsername';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call('loginWithUsername', 'notuser', 'verysecure'),
        );

        // the returned result is the same as incorrect passwords
        expect(loginResult).toBeNull();

        await tearDown(testName, context);
    });

    it('creates creates two tokens per login; refresh tokens are unused', async () => {
        const testName = 'checkTokenCreation';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;
        let allTokens = await client.query(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );

        // initially there are no tokens.
        expect(allTokens.data.length).toEqual(0);
        // Each login creates 2 tokens, one access, one refresh.
        await client.query(Call('login', 'user@domain.com', 'verysecure'));
        await client.query(Call('login', 'user@domain.com', 'verysecure'));
        await client.query(Call('login', 'user2@domain.com', 'verysecure'));

        allTokens = await client.query(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );

        // verifyTokens has 2 assertions in it
        await verifyTokens(expect, client, { access: 3, refresh: 3 });

        await tearDown(testName, context);
    });
});
