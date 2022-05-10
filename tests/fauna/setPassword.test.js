import fauna from 'faunadb';
import * as schemaMigrate from '@fauna-labs/fauna-schema-migrate';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { FAUNA_TEST_TIMEOUT } from './constants';

const q = fauna.query;
const { Call } = q;

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const setUp = async testName => {
    const context = {};

    context.databaseClients = await setupTestDatabase(fauna, testName);

    const client = context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, client, [
        'src/fauna/resources/faunauth/collections/User.fql',
        'src/fauna/resources/faunauth/functions/createEmailConfirmationToken.js',
        'src/fauna/resources/faunauth/functions/login.js',
        'src/fauna/resources/faunauth/functions/loginWithUsername.js',
        'src/fauna/resources/faunauth/functions/register.js',
        'src/fauna/resources/faunauth/functions/setPassword.js',
        'src/fauna/resources/faunauth/indexes/tokens-by-type-email-and-used.fql',
        'src/fauna/resources/faunauth/indexes/users-by-email.fql',
        'src/fauna/resources/faunauth/indexes/users-by-username.fql',
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

    const createTokenResult = await client.query(
        Call('createEmailConfirmationToken', 'user@domain.com'),
    );

    context.token = createTokenResult.token.secret;

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

describe('setPassword()', () => {
    it('can set the password when passing in an unused new password', async () => {
        const testName = 'unusedNewPassword';
        const context = await setUp(testName);

        expect.assertions(6);

        const client = context.databaseClients.childClient;

        const setPasswordResult = await client.query(
            Call(
                'setPassword',
                'user@domain.com',
                'supersecret',
                context.token,
            ),
        );

        expect(setPasswordResult.tokens.access).toBeTruthy();
        expect(setPasswordResult.tokens.refresh).toBeTruthy();
        expect(setPasswordResult.account).toBeTruthy();

        const loginResult = await client.query(
            Call('login', 'user@domain.com', 'supersecret'),
        );

        expect(loginResult.tokens.access).toBeTruthy();
        expect(loginResult.tokens.refresh).toBeTruthy();
        expect(loginResult.account).toBeTruthy();

        await tearDown(testName, context);
    });

    it('cannot set the password when passing in a new password that was previously used', async () => {
        const testName = 'previouslyUsedNewPassword';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const setPasswordWithPreviouslyUsedNewPassword = async () =>
            client.query(
                Call(
                    'setPassword',
                    'user@domain.com',
                    'verysecure',
                    context.token,
                ),
            );

        await expect(
            setPasswordWithPreviouslyUsedNewPassword(),
        ).rejects.toBeInstanceOf(fauna.errors.BadRequest);

        await tearDown(testName, context);
    });

    it('cannot set the password for a user that does not exist', async () => {
        const testName = 'userDoesNotExist';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const setPasswordForNonUser = async () =>
            client.query(
                Call(
                    'setPassword',
                    'notauser@domain.com',
                    'verysecure',
                    context.token,
                ),
            );

        await expect(setPasswordForNonUser()).rejects.toBeInstanceOf(
            fauna.errors.BadRequest,
        );

        await tearDown(testName, context);
    });

    it('cannot set the password with an invalid token', async () => {
        const testName = 'invalidToken';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const setPasswordWithInvalidToken = async () =>
            client.query(
                Call(
                    'setPassword',
                    'user@domain.com',
                    'verysecure',
                    'invalidtoken',
                ),
            );

        await expect(setPasswordWithInvalidToken()).rejects.toBeInstanceOf(
            fauna.errors.BadRequest,
        );

        await tearDown(testName, context);
    });
});
