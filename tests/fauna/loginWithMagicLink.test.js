import fauna from 'faunadb';
import * as schemaMigrate from '@fauna-labs/fauna-schema-migrate';
import { verifyTokens } from './helpers/_test-extensions';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { FAUNA_TEST_TIMEOUT } from '../constants';

const q = fauna.query;
const { Call, Paginate, Lambda, Get, Var, Tokens } = q;

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const setUp = async testName => {
    const context = {};

    context.databaseClients = await setupTestDatabase(fauna, testName);

    const client = context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, client, [
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

    const createTokenResult = await client.query(
        Call('createEmailConfirmationToken', 'user@domain.com'),
    );

    context.secret = createTokenResult.token.secret;

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

describe('loginWithMagicLink()', () => {
    it('can log in with correct email and token', async () => {
        const testName = 'magicLinkWithCorrectEmailAndToken';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;

        try {
            const loginResult = await client.query(
                Call('loginWithMagicLink', 'user@domain.com', context.secret),
            );

            expect(loginResult.tokens.access).toBeTruthy();
            expect(loginResult.tokens.refresh).toBeTruthy();
            expect(loginResult.account).toBeTruthy();
        } catch (e) {
            console.log('e: ', JSON.stringify(e, null, 4));
        }

        await tearDown(testName, context);
    });

    it('cannot log in with invalid token', async () => {
        const testName = 'magicLinkWithInvalidToken';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call('loginWithMagicLink', 'user@domain.com', 'invalidtoken'),
        );

        expect(loginResult).toBe(false);

        await tearDown(testName, context);
    });

    it('cannot log in with incorrect email', async () => {
        const testName = 'magicLinkWithIncorrectEmail';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call('loginWithMagicLink', 'notuser@domain.com', context.secret),
        );

        expect(loginResult).toBe(false);

        await tearDown(testName, context);
    });

    it('creates creates two tokens per login; refresh tokens are unused', async () => {
        const testName = 'magicLinkCheckTokenCreation';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;
        let allTokens = await client.query(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );
        let accessAndRefreshTokens = allTokens.data.filter(t =>
            ['access', 'refresh'].includes(t.data.type),
        );

        console.log(
            'accessAndRefreshTokens 1',
            JSON.stringify(accessAndRefreshTokens, null, 4),
        );

        // initially there are no access or refresh tokens.
        expect(accessAndRefreshTokens.length).toEqual(0);

        const doLogin = async () =>
            await client.query(
                Call('loginWithMagicLink', 'user@domain.com', context.secret),
            );

        let result = null;

        try {
            result = await doLogin();
        } catch (e) {
            // TODO figure out this error

            console.log('e: ', JSON.stringify(e, null, 4));
        }

        console.log('result: ', JSON.stringify(result, null, 4));

        // Each login creates 2 tokens, one access, one refresh.
        // await client.query(
        //     Call('loginWithMagicLink', 'user@domain.com', context.secret),
        // );

        allTokens = await client.query(
            q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
        );
        accessAndRefreshTokens = allTokens.data.filter(t =>
            ['access', 'refresh'].includes(t.data.type),
        );

        console.log(
            'accessAndRefreshTokens 2: ',
            JSON.stringify(accessAndRefreshTokens, null, 4),
        );

        // verifyTokens has 2 assertions in it
        await verifyTokens(expect, client, { access: 1, refresh: 1 });

        await tearDown(testName, context);
    });
});
