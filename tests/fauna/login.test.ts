import fauna from 'faunadb';
import { describe, it, expect } from 'vitest';

import { verifyTokens } from './helpers/_test-extensions';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import type {
    FaunaLoginResult,
    TokenCollectionQueryResult,
    SetUp,
    TearDown,
} from '../../src/types';
import { errors } from '../../src/fauna/src/errors';

const q = fauna.query;
const { Call, Paginate, Tokens, Lambda, Get, Var } = q;

const setUp: SetUp = async testName => {
    const databaseClients = await setupTestDatabase(fauna, testName);
    const client = databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(q, client, [
        'src/fauna/resources/faunauth/collections/User.fql',
        'src/fauna/resources/faunauth/functions/register.js',
        'src/fauna/resources/faunauth/functions/login.js',
        'src/fauna/resources/faunauth/functions/loginWithUsername.js',
        'src/fauna/resources/faunauth/indexes/users-by-email.fql',
        'src/fauna/resources/faunauth/indexes/users-by-username.fql',
    ]);

    await client.query(
        Call('register', 'verysecure', 'user@domain.com', {
            email: 'user@domain.com',
            username: 'user',
            locale: 'en-US',
        }),
    );

    await client.query(
        Call('register', 'verysecure', 'user2@domain.com', {
            email: 'user2@domain.com',
            username: 'user2',
            locale: 'en-US',
        }),
    );

    return {
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

describe('login()', () => {
    it('can log in with correct email and password', async () => {
        const testName = 'correctEmailAndPassword';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query<false | FaunaLoginResult>(
            Call('login', 'user@domain.com', 'verysecure'),
        );

        if (loginResult) {
            expect(loginResult.tokens?.access).toBeTruthy();
            expect(loginResult.tokens.refresh).toBeTruthy();
            expect(loginResult.account).toBeTruthy();
        }

        await tearDown(testName, context);
    });

    it('can log in with correct username and password', async () => {
        const testName = 'correctUsernameAndPassword';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query<false | FaunaLoginResult>(
            Call('loginWithUsername', 'user', 'verysecure'),
        );

        if (loginResult) {
            expect(loginResult.tokens.access).toBeTruthy();
            expect(loginResult.tokens.refresh).toBeTruthy();
            expect(loginResult.account).toBeTruthy();
        }

        await tearDown(testName, context);
    });

    it('cannot log in with incorrect password', async () => {
        const testName = 'incorrectPassword';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query<false | FaunaLoginResult>(
            Call('login', 'user@domain.com', 'wrong'),
        );

        expect(loginResult).toStrictEqual({
            error: errors.invalidEmailOrPassword,
        });

        await tearDown(testName, context);
    });

    it('cannot log in with incorrect email', async () => {
        const testName = 'incorrectEmail';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query<false | FaunaLoginResult>(
            Call('login', 'notuser@domain.com', 'verysecure'),
        );

        expect(loginResult).toStrictEqual({
            error: errors.invalidEmailOrPassword,
        });

        await tearDown(testName, context);
    });

    it('cannot log in with incorrect username', async () => {
        const testName = 'incorrectUsername';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query<false | FaunaLoginResult>(
            Call('loginWithUsername', 'notuser', 'verysecure'),
        );

        expect(loginResult).toStrictEqual({
            error: errors.invalidUsernameOrPassword,
        });

        await tearDown(testName, context);
    });

    it('creates creates two tokens per login; refresh tokens are unused', async () => {
        const testName = 'checkTokenCreation';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;
        let allTokens = await client.query<TokenCollectionQueryResult>(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );

        // initially there are no tokens.
        expect(allTokens.data.length).toEqual(0);
        // Each login creates 2 tokens, one access, one refresh.
        await client.query(Call('login', 'user@domain.com', 'verysecure'));
        await client.query(Call('login', 'user@domain.com', 'verysecure'));
        await client.query(Call('login', 'user2@domain.com', 'verysecure'));

        allTokens = await client.query<TokenCollectionQueryResult>(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );

        // verifyTokens has 2 assertions in it
        await verifyTokens(expect, client, { access: 3, refresh: 3 });

        await tearDown(testName, context);
    });
});
