import fauna from 'faunadb';
import { describe, it, expect } from 'vitest';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { FaunaLoginResult, SetUp, TearDown } from '../../src/types';
import { errors } from '../../src/fauna/src/errors';

const q = fauna.query;
const { Call } = q;

const setUp: SetUp = async testName => {
    const databaseClients = await setupTestDatabase(fauna, testName);

    await populateDatabaseSchemaFromFiles(q, databaseClients.childClient, [
        'src/fauna/resources/faunauth/collections/User.fql',
        'src/fauna/resources/faunauth/functions/createEmailConfirmationToken.js',
        'src/fauna/resources/faunauth/functions/login.js',
        'src/fauna/resources/faunauth/functions/loginWithUsername.js',
        'src/fauna/resources/faunauth/functions/register.js',
        'src/fauna/resources/faunauth/functions/setPassword.js',
        'src/fauna/resources/faunauth/functions/setPasswordAdmin.js',
        'src/fauna/resources/faunauth/indexes/tokens-by-type-email-and-used.fql',
        'src/fauna/resources/faunauth/indexes/users-by-email.fql',
        'src/fauna/resources/faunauth/indexes/users-by-username.fql',
    ]);

    await databaseClients.childClient.query(
        Call('register', 'verysecure', 'user@domain.com', {
            email: 'user@domain.com',
            username: 'user',
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

describe('setPasswordAdmin()', () => {
    it('can set the password when passing in an unused new password', async () => {
        const testName = 'setPasswordAdmin_unusedNewPassword';
        const context = await setUp(testName);

        expect.assertions(6);

        const client = context.databaseClients.childClient;

        try {
            const setPasswordResult = await client.query<
                false | FaunaLoginResult
            >(Call('setPasswordAdmin', 'user@domain.com', 'supersecret'));

            if (setPasswordResult) {
                expect(setPasswordResult.tokens.access).toBeTruthy();
                expect(setPasswordResult.tokens.refresh).toBeTruthy();
                expect(setPasswordResult.account).toBeTruthy();
            }

            const loginResult = await client.query<false | FaunaLoginResult>(
                Call('login', 'user@domain.com', 'supersecret'),
            );

            if (loginResult) {
                expect(loginResult.tokens.access).toBeTruthy();
                expect(loginResult.tokens.refresh).toBeTruthy();
                expect(loginResult.account).toBeTruthy();
            }
        } catch (e) {
            console.log('e: ', JSON.stringify(e, null, 4));
        }
        await tearDown(testName, context);
    });

    it('cannot set the password when passing in a new password that was previously used', async () => {
        const testName = 'setPasswordAdmin_previouslyUsedNewPassword';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const setPasswordResult = await client.query(
            Call('setPasswordAdmin', 'user@domain.com', 'verysecure'),
        );

        expect(setPasswordResult).toStrictEqual({
            error: errors.passwordAlreadyInUse,
        });

        await tearDown(testName, context);
    });

    it('cannot set the password for a user that does not exist', async () => {
        const testName = 'setPasswordAdmin_userDoesNotExist';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const setPasswordResult = await client.query(
            Call('setPasswordAdmin', 'notauser@domain.com', 'supersecret'),
        );

        expect(setPasswordResult).toStrictEqual({
            error: errors.userDoesNotExist,
        });

        await tearDown(testName, context);
    });
});
