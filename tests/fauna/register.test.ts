import fauna from 'faunadb';
import { describe, it, expect } from 'vitest';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
    getClient,
} from './helpers/_setup-db';
import type {
    CreateKeyResult,
    SetUp,
    TearDown,
    UserCollectionQueryResult,
} from '../../src/types';
import { errors } from '../../src/fauna/src/errors';

const q = fauna.query;
const { Call, Paginate, Documents, Collection, Lambda, Get, CreateKey, Role } =
    q;

const setUp: SetUp = async testName => {
    const databaseClients = await setupTestDatabase(fauna, testName);
    const client = databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(q, client, [
        'src/fauna/resources/faunauth/collections/User.fql',
        'src/fauna/resources/faunauth/functions/createEmailConfirmationToken.js',
        'src/fauna/resources/faunauth/functions/login.js',
        'src/fauna/resources/faunauth/functions/logout.js',
        'src/fauna/resources/faunauth/functions/register.js',
        'src/fauna/resources/faunauth/functions/setPassword.js',
        'src/fauna/resources/faunauth/indexes/users-by-email.fql',
        'src/fauna/resources/faunauth/roles/public.fql',
    ]);

    return {
        databaseClients,
    };
};

const tearDown: TearDown = async (testName, context) => {
    await destroyTestDatabase(
        fauna.query,
        testName,
        context.databaseClients?.parentClient ?? null,
    );

    return true;
};

describe('register()', () => {
    it('can verify account was created', async () => {
        const testName = 'verifyAccountCreation';
        const context = await setUp(testName);
        const client = context.databaseClients.childClient;

        // We now have a register function which we can call
        await client.query(
            Call('register', 'verysecure', 'user@domain.com', {
                email: 'user@domain.com',
                locale: 'en-US',
            }),
        );

        const accounts = await client.query<UserCollectionQueryResult>(
            q.Map(
                Paginate(Documents(Collection('User'))),
                Lambda(ref => Get(ref)),
            ),
        );

        // There will be an email
        expect(accounts.data[0].data.email).toBe('user@domain.com');
        // Passwords are never returned
        // eslint-disable-next-line
        // @ts-ignore - we know that the password is not in the type definition; we want to check
        // for its existence anyway
        expect(accounts.data[0].data?.password).toBeUndefined();

        await tearDown(testName, context);
    });

    it('can register with a key that uses the public role', async () => {
        const testName = 'registerWithPublicKey';
        const context = await setUp(testName);

        const client = context.databaseClients?.childClient ?? null;

        if (client === null) {
            return;
        }

        const key = await client.query<
            CreateKeyResult<{ role: fauna.values.Ref }>
        >(CreateKey({ role: Role('public') }));
        const publicClient = getClient(fauna, key.secret);
        const res = await publicClient.query(
            Call('register', 'verysecure', 'user@domain.com', {
                email: 'user@domain.com',
                locale: 'en-US',
            }),
        );

        expect(res).toBeTruthy();

        await tearDown(testName, context);
    });

    it('cannot register a user twice with the same email address', async () => {
        const testName = 'registerDuplicateEmail';
        const context = await setUp(testName);

        const client = context.databaseClients.childClient;

        const key = await client.query<
            CreateKeyResult<{ role: fauna.values.Ref }>
        >(CreateKey({ role: Role('public') }));
        const publicClient = getClient(fauna, key.secret);
        const res = await publicClient.query(
            Call('register', 'verysecure', 'user@domain.com', {
                email: 'user@domain.com',
                locale: 'en-US',
            }),
        );

        expect(res).toBeTruthy();

        const duplicateRegisterResult = await publicClient.query(
            Call('register', 'verysecure', 'user@domain.com', {
                email: 'user@domain.com',
                locale: 'en-US',
            }),
        );

        expect(duplicateRegisterResult).toEqual({
            error: errors.userAlreadyExists,
        });

        await tearDown(testName, context);
    });
});
