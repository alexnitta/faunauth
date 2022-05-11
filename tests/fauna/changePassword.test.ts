import fauna from 'faunadb';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { FAUNA_TEST_TIMEOUT } from '../constants';
import type { FaunaLoginResult, SetUp, TearDown } from '../../src/types';

const q = fauna.query;
const { Call } = q;

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const setUp: SetUp = async testName => {
    const context = {
        databaseClients: null,
    };

    context.databaseClients = await setupTestDatabase(fauna, testName);

    const client = context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(q, client, [
        'src/fauna/resources/faunauth/collections/User.fql',
        'src/fauna/resources/faunauth/functions/changePassword.js',
        'src/fauna/resources/faunauth/functions/register.js',
        'src/fauna/resources/faunauth/functions/login.js',
        'src/fauna/resources/faunauth/functions/loginWithUsername.js',
        'src/fauna/resources/faunauth/indexes/users-by-email.fql',
        'src/fauna/resources/faunauth/indexes/users-by-username.fql',
    ]);

    await client.query(
        Call('register', 'verysecure', {
            email: 'user@domain.com',
            username: 'user',
            locale: 'en-US',
        }),
    );

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

describe('changePassword()', () => {
    it('can change the password when passing in the correct old password', async () => {
        const testName = 'correctOldPassword';
        const context = await setUp(testName);

        expect.assertions(6);

        const client = context.databaseClients.childClient;
        const changePasswordResult = await client.query<
            false | FaunaLoginResult
        >(
            Call(
                'changePassword',
                'user@domain.com',
                'verysecure',
                'supersecret',
            ),
        );

        if (changePasswordResult) {
            expect(changePasswordResult.tokens.access).toBeTruthy();
            expect(changePasswordResult.tokens.refresh).toBeTruthy();
            expect(changePasswordResult.account).toBeTruthy();
        }

        const loginResult = await client.query<false | FaunaLoginResult>(
            Call('login', 'user@domain.com', 'supersecret'),
        );

        if (loginResult) {
            expect(loginResult.tokens.access).toBeTruthy();
            expect(loginResult.tokens.refresh).toBeTruthy();
            expect(loginResult.account).toBeTruthy();
        }

        await tearDown(testName, context);
    });

    it('cannot change the password when passing in the wrong old password', async () => {
        const testName = 'wrongOldPassword';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const changePasswordWithWrongOldPassword = async () =>
            client.query(
                Call(
                    'changePassword',
                    'user@domain.com',
                    'wrongoldpassword',
                    'supersecret',
                ),
            );

        await expect(
            changePasswordWithWrongOldPassword(),
        ).rejects.toBeInstanceOf(fauna.errors.BadRequest);

        await tearDown(testName, context);
    });

    it('cannot change the password when for a user that does not exist', async () => {
        const testName = 'nonUser';
        const context = await setUp(testName);

        expect.assertions(1);

        const client = context.databaseClients.childClient;
        const changePasswordForNonUser = async () =>
            client.query(
                Call(
                    'changePassword',
                    'notauser@domain.com',
                    'verysecure',
                    'supersecret',
                ),
            );

        await expect(changePasswordForNonUser()).rejects.toBeInstanceOf(
            fauna.errors.BadRequest,
        );

        await tearDown(testName, context);
    });
});
