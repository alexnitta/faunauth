import path from 'path';
import fauna from 'faunadb';
import * as schemaMigrate from '@fauna-labs/fauna-schema-migrate';
import { delay } from './helpers/_delay';
import {
    destroyTestDatabase,
    getClient,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';

const q = fauna.query;
const { Call, Create, Collection, Get, Paginate, Documents } = q;

const testName = 'access';

const context = {
    databaseClients: {
        childClient: null,
        parentClient: null,
    },
    testDocumentRef: null,
};

beforeAll(async () => {
    // Set up the child database and retrieve both a fauna Client
    // to query the database as parent database.
    context.databaseClients = await setupTestDatabase(fauna, testName);
    const client = context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, client, [
        'fauna/resources/collections/dinos.fql',
        'fauna/resources/collections/User.fql',
        'fauna/resources/functions/createEmailConfirmationToken.js',
        'fauna/resources/functions/register.fql',
        'fauna/resources/functions/changePassword.js',
        'fauna/resources/functions/resetPassword.js',
        'fauna/resources/indexes/users-by-email.fql',
        'fauna/resources/indexes/users-by-username.fql',
        'fauna/resources/roles/loggedin.js',
        // custom resources for this test with lower TTLs for access and refresh tokens (10s and 20s)
        'tests/resources/functions/_login-modified.js',
    ]);
    // // create some data in the test collection
    // const testDocument = await client.query(
    //     Create(Collection('dinos'), { data: { hello: 'world' } }),
    // );

    // console.log('testDocument: ', JSON.stringify(testDocument, null, 4));

    // context.testDocumentRef = testDocument.ref;

    // // and register a user
    // await client.query(
    //     Call('register', 'verysecure', {
    //         confirmedEmail: false,
    //         email: 'user@domain.com',
    //         locale: 'en-US',
    //         invitedBy: 'foo-user-id',
    //         toGroup: 'foo-group-id',
    //     }),
    // );

    return true;
});

// afterAll(async () => {
//     console.log('context: ', JSON.stringify(context, null, 4));

//     // Destroy the child database to clean up (using the parentClient)
//     await destroyTestDatabase(
//         q,
//         testName,
//         context.databaseClients.parentClient,
//     );

//     return true;
// });

test('a test', () => {
    expect(1).toEqual(1);
});

// test(`${testName}: within 10 seconds (ttl of access token), we can access data via the test membership role`, async t => {
//     t.plan(2);
//     const client = context.databaseClients.childClient;
//     const loginResult = await client.query(
//         Call('login-modified', 'user@domain.com', 'verysecure'),
//     );
//     const accessToken = loginResult.tokens.access.secret;
//     const loggedInClient = getClient(fauna, accessToken);
//     const doc = await loggedInClient.query(Get(context.testDocumentRef));

//     t.truthy(doc.data);
//     t.is(doc.data.hello, 'world');
// });

// test(`${testName}: after 10 seconds (ttl of access token), we can no longer access data`, async t => {
//     t.plan(3);
//     const client = context.databaseClients.childClient;
//     const loginResult = await client.query(
//         Call('login-modified', 'user@domain.com', 'verysecure'),
//     );

//     const accessToken = loginResult.tokens.access.secret;
//     const loggedInClient = getClient(fauna, accessToken);

//     // wait 11s
//     await delay(11000);

//     // we can no longer get the document with this token
//     await t.throwsAsync(
//         async () => {
//             await loggedInClient.query(Get(context.testDocumentRef));
//         },
//         { instanceOf: fauna.errors.Unauthorized },
//     );

//     // nor can we paginate the collection
//     await t.throwsAsync(
//         async () => {
//             await loggedInClient.query(
//                 Paginate(Documents(Collection('dinos'))),
//             );
//         },
//         { instanceOf: fauna.errors.Unauthorized },
//     );

//     // we can no longer access the token document itself, not even with the admin key.
//     await t.throwsAsync(
//         async () => {
//             await client.query(Get(loginResult.tokens.access.ref));
//         },
//         { instanceOf: fauna.errors.NotFound },
//     );
// });

// test(`${testName}: refresh tokens do not provide access to the data`, async t => {
//     await t.throwsAsync(
//         async () => {
//             const client = context.databaseClients.childClient;
//             const loginResult = await client.query(
//                 Call('login-modified', 'user@domain.com', 'verysecure'),
//             );
//             const refreshToken = loginResult.tokens.refresh.secret;
//             const refreshClient = getClient(fauna, refreshToken);

//             await refreshClient.query(Get(context.testDocumentRef));
//         },
//         { instanceOf: fauna.errors.PermissionDenied },
//     );
// });
