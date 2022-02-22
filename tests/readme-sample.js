import test from 'ava';
import path from 'path';
import fauna from 'faunadb';
import * as schemaMigrate from '@fauna-labs/fauna-schema-migrate';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';

const q = fauna.query;
const { Call, CreateKey, Role } = q;

let index = 0;

test.beforeEach(async t => {
    // Set up the child database and retrieve both a fauna Client
    // to query the database as parent database.
    const testName = path.basename(__filename) + (index = ++index);
    const databaseClients = await setupTestDatabase(fauna, testName);
    const adminClient = databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, adminClient, [
        'fauna/resources/collections/anomalies.fql',
        'fauna/resources/collections/dinos.fql',
        'fauna/resources/collections/User.fql',
        'fauna/resources/functions/createEmailConfirmationToken.js',
        'fauna/resources/functions/login.js',
        'fauna/resources/functions/logout.js',
        'fauna/resources/functions/refresh.js',
        'fauna/resources/functions/register.fql',
        'fauna/resources/functions/changePassword.js',
        'fauna/resources/functions/resetPassword.js',
        'fauna/resources/indexes/access-token-by-refresh-token.fql',
        'fauna/resources/indexes/users-by-email.fql',
        'fauna/resources/indexes/tokens-by-instance-sessionid-type-and-loggedout.fql',
        'fauna/resources/indexes/tokens-by-instance-type-and-loggedout.fql',
        'fauna/resources/indexes/tokens-by-type-email-and-used.fql',
        'fauna/resources/roles/loggedin.js',
        'fauna/resources/roles/public.fql',
        'fauna/resources/roles/refresh.js',
    ]);
    t.context.databaseClients = databaseClients;
    t.context.testName = testName;
});
test.afterEach.always(async t => {
    // Destroy the child database to clean up (using the parentClient)
    await destroyTestDatabase(
        q,
        t.context.testName,
        t.context.databaseClients.parentClient,
    );
});

test(`${path.basename(__filename)}: Readme sample works`, async t => {
    await t.notThrowsAsync(async () => {
        const client = t.context.databaseClients.childClient;
        const publicKey = await client.query(
            CreateKey({ role: Role('public') }),
        );
        const publicClient = new fauna.Client({ secret: publicKey.secret });

        await publicClient.query(
            Call('register', 'verysecure', {
                email: 'user@domain.com',
                locale: 'en-US',
                invitedBy: 'foo-user-id',
                toGroup: 'foo-group-id',
            }),
        );

        const loginResult = await publicClient.query(
            Call('login', 'user@domain.com', 'verysecure'),
        );

        let accessClient = new fauna.Client({
            secret: loginResult.tokens.access.secret,
        });

        let refreshClient = new fauna.Client({
            secret: loginResult.tokens.refresh.secret,
        });

        const refreshResult = await refreshClient.query(Call('refresh'));

        accessClient = new fauna.Client({
            secret: refreshResult.tokens.access.secret,
        });

        refreshClient = new fauna.Client({
            secret: refreshResult.tokens.refresh.secret,
        });

        refreshClient.query(Call('logout', false));

        return accessClient;
    });
});
