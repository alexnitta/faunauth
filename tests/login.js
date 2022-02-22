import test from 'ava';
import path from 'path';
import fauna from 'faunadb';
import * as schemaMigrate from '@fauna-labs/fauna-schema-migrate';
import { verifyTokens } from './helpers/_test-extensions';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const q = fauna.query;
const { Call, Paginate, Tokens, Lambda, Get, Var } = q;

let index = 0;

test.beforeEach(async t => {
    // Set up the child database and retrieve both a fauna Client
    // to query the database as parent database.
    t.context.testName = path.basename(__filename) + (index = ++index);
    t.context.databaseClients = await setupTestDatabase(
        fauna,
        t.context.testName,
    );
    const client = t.context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, client, [
        'fauna/resources/collections/User.fql',
        'fauna/resources/functions/register.fql',
        'fauna/resources/functions/login.js',
        'fauna/resources/indexes/users-by-email.fql',
    ]);
    await client.query(
        Call('register', 'verysecure', {
            email: 'user@domain.com',
            locale: 'en-US',
            invitedBy: 'foo-user-id',
            toGroup: 'foo-group-id',
        }),
    );
    await client.query(
        Call('register', 'verysecure', {
            email: 'user2@domain.com',
            locale: 'en-US',
            invitedBy: 'foo-user-id',
            toGroup: 'foo-group-id',
        }),
    );
});

test.afterEach.always(async t => {
    // Destroy the child database to clean up (using the parentClient)
    await destroyTestDatabase(
        q,
        t.context.testName,
        t.context.databaseClients.parentClient,
    );
});

test(`${path.basename(
    __filename,
)}: we can login with correct credentials`, async t => {
    const client = t.context.databaseClients.childClient;
    const loginResult = await client.query(
        Call('login', 'user@domain.com', 'verysecure'),
    );

    t.truthy(loginResult.tokens.access);
    t.truthy(loginResult.tokens.refresh);
    t.truthy(loginResult.account);
});

test(`${path.basename(
    __filename,
)}: we can not login with incorrect password`, async t => {
    const client = t.context.databaseClients.childClient;
    const loginResult = await client.query(
        Call('login', 'user@domain.com', 'wrong'),
    );

    t.is(loginResult, null);
});

test(`${path.basename(
    __filename,
)}: we can not login with incorrect email`, async t => {
    const client = t.context.databaseClients.childClient;
    const loginResult = await client.query(
        Call('login', 'notuser@domain.com', 'verysecure'),
    );

    // the returned result is the same as incorrect passwords
    t.is(loginResult, null);
});

test(`${path.basename(
    __filename,
)}: One login creates two tokens, refresh tokens are unused`, async t => {
    const client = t.context.databaseClients.childClient;
    let allTokens = await client.query(
        q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
    );

    // initially there are no tokens.
    t.is(allTokens.data.length, 0);
    // Each login creates 2 tokens, one access, one refresh.
    await client.query(Call('login', 'user@domain.com', 'verysecure'));
    await client.query(Call('login', 'user@domain.com', 'verysecure'));
    await client.query(Call('login', 'user2@domain.com', 'verysecure'));

    allTokens = await client.query(
        q.Map(Paginate(Tokens()), Lambda(['t'], Get(Var('t')))),
    );
    await verifyTokens(t, client, { access: 3, refresh: 3 });
});
