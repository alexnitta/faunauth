import fauna from 'faunadb';
import * as schemaMigrate from '@fauna-labs/fauna-schema-migrate';
import { delay } from './helpers/_delay';
import {
    destroyTestDatabase,
    getClient,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { FAUNA_TEST_TIMEOUT } from '../constants';

const q = fauna.query;
const { Call, Create, Collection, Get, Paginate, Documents } = q;

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const setUp = async testName => {
    const context = {};
    // Set up the child database and retrieve both parent and child Fauna clients
    context.databaseClients = await setupTestDatabase(fauna, testName);
    const client = context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, client, [
        'src/fauna/resources/faunauth/collections/dinos.fql',
        'src/fauna/resources/faunauth/collections/User.fql',
        'src/fauna/resources/faunauth/functions/createEmailConfirmationToken.js',
        'src/fauna/resources/faunauth/functions/register.js',
        'src/fauna/resources/faunauth/functions/changePassword.js',
        'src/fauna/resources/faunauth/functions/setPassword.js',
        'src/fauna/resources/faunauth/indexes/users-by-email.fql',
        'src/fauna/resources/faunauth/indexes/users-by-username.fql',
        'src/fauna/resources/faunauth/roles/loggedin.js',
        // custom resources for this test with lower TTLs for access and refresh tokens (10s and 20s)
        'tests/fauna/resources/functions/_login-modified.js',
    ]);
    // create some data in the test collection
    const testDocument = await client.query(
        Create(Collection('dinos'), { data: { hello: 'world' } }),
    );

    context.testDocumentRef = testDocument.ref;

    // and register a user
    await client.query(
        Call('register', 'verysecure', {
            confirmedEmail: false,
            email: 'user@domain.com',
            locale: 'en-US',
        }),
    );

    return context;
};

const tearDown = async (testName, context) => {
    // Destroy the child database to clean up (using the parentClient)
    await destroyTestDatabase(
        q,
        testName,
        context.databaseClients.parentClient,
    );

    return true;
};

describe('access token behavior', () => {
    test('within 10 seconds (ttl of access token), we can access data via the test membership role', async () => {
        const testName = 'accessBeforeExpiration';
        const context = await setUp(testName);

        expect.assertions(2);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call('login-modified', 'user@domain.com', 'verysecure'),
        );
        const accessSecret = loginResult.tokens.access.secret;
        const loggedInClient = getClient(fauna, accessSecret);
        const doc = await loggedInClient.query(Get(context.testDocumentRef));

        expect(doc.data).toBeTruthy();
        expect(doc.data.hello).toBe('world');

        await tearDown(testName, context);
    });

    test('after 10 seconds (ttl of access token), we can no longer access data', async () => {
        const testName = 'accessAfterExpiration';
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call('login-modified', 'user@domain.com', 'verysecure'),
        );

        const accessSecret = loginResult.tokens.access.secret;
        const loggedInClient = getClient(fauna, accessSecret);

        // wait 11s
        await delay(11000);

        // we can no longer get the document with this token
        await expect(
            loggedInClient.query(Get(context.testDocumentRef)),
        ).rejects.toThrow(fauna.errors.Unauthorized);

        // nor can we paginate the collection
        await expect(
            loggedInClient.query(Paginate(Documents(Collection('dinos')))),
        ).rejects.toThrow(fauna.errors.Unauthorized);

        // we can no longer access the token document itself, not even with the admin key.
        await expect(
            client.query(Get(loginResult.tokens.access.ref)),
        ).rejects.toThrow(fauna.errors.NotFound);

        await tearDown(testName, context);
    });

    test('refresh tokens do not provide access to the data', async () => {
        const testName = 'refreshSecretPrivileges';
        const context = await setUp(testName);

        expect.assertions(1);

        await expect(async () => {
            const client = context.databaseClients.childClient;
            const loginResult = await client.query(
                Call('login-modified', 'user@domain.com', 'verysecure'),
            );
            const refreshSecret = loginResult.tokens.refresh.secret;
            const refreshClient = getClient(fauna, refreshSecret);

            await refreshClient.query(Get(context.testDocumentRef));
        }).rejects.toThrow(fauna.errors.PermissionDenied);

        await tearDown(testName, context);
    });
});
