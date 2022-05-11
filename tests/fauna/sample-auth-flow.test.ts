import fauna from 'faunadb';
import * as schemaMigrate from '@fauna-labs/fauna-schema-migrate';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { FAUNA_TEST_TIMEOUT } from '../constants';
import type {
    TestContext,
    CreateKeyResult,
    FaunaLoginResult,
    SetUp,
    TearDown,
    Maybe,
} from '../../src/types';

const q = fauna.query;
const { Call, CreateKey, Role } = q;

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const clientDomain = process.env.FAUNADB_DOMAIN
    ? process.env.FAUNADB_DOMAIN
    : 'db.fauna.com';

const setUp: SetUp = async testName => {
    const context: TestContext = { databaseClients: null };
    const databaseClients = await setupTestDatabase(fauna, testName);
    const adminClient = databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, adminClient, [
        'src/fauna/resources/faunauth/collections/anomalies.fql',
        'src/fauna/resources/faunauth/collections/dinos.fql',
        'src/fauna/resources/faunauth/collections/User.fql',
        'src/fauna/resources/faunauth/functions/changePassword.js',
        'src/fauna/resources/faunauth/functions/createEmailConfirmationToken.js',
        'src/fauna/resources/faunauth/functions/login.js',
        'src/fauna/resources/faunauth/functions/logout.js',
        'src/fauna/resources/faunauth/functions/refresh.js',
        'src/fauna/resources/faunauth/functions/register.js',
        'src/fauna/resources/faunauth/functions/setPassword.js',
        'src/fauna/resources/faunauth/indexes/access-token-by-refresh-token.fql',
        'src/fauna/resources/faunauth/indexes/tokens-by-instance-sessionid-type-and-loggedout.fql',
        'src/fauna/resources/faunauth/indexes/tokens-by-instance-type-and-loggedout.fql',
        'src/fauna/resources/faunauth/indexes/tokens-by-type-email-and-used.fql',
        'src/fauna/resources/faunauth/indexes/users-by-email.fql',
        'src/fauna/resources/faunauth/roles/loggedin.js',
        'src/fauna/resources/faunauth/roles/public.fql',
        'src/fauna/resources/faunauth/roles/refresh.js',
    ]);

    context.databaseClients = databaseClients;

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

/**
 * This test case walks through the `refresh-tokens-advanced` blueprint from this readme:
 * {@link https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced}
 */
describe('sample flow from refresh-tokens-advanced blueprint', () => {
    test('resolves to a fauna.Client instance', async () => {
        const testName = 'resolvesToClient';

        const context = await setUp(testName);

        const sampleAuthFlow = async (): Promise<Maybe<fauna.Client>> => {
            const client = context.databaseClients.childClient;
            const publicKey = await client.query<
                CreateKeyResult<{ role: fauna.values.Ref }>
            >(CreateKey({ role: Role('public') }));
            const publicClient = new fauna.Client({
                secret: publicKey.secret,
                domain: clientDomain,
            });

            await publicClient.query(
                Call('register', 'verysecure', {
                    email: 'user@domain.com',
                    locale: 'en-US',
                }),
            );

            const loginResult = await publicClient.query<
                false | FaunaLoginResult
            >(Call('login', 'user@domain.com', 'verysecure'));

            if (loginResult) {
                let accessClient = new fauna.Client({
                    secret: loginResult.tokens.access.secret,
                    domain: clientDomain,
                });

                let refreshClient = new fauna.Client({
                    secret: loginResult.tokens.refresh.secret,
                    domain: clientDomain,
                });

                const refreshResult = await refreshClient.query<
                    false | FaunaLoginResult
                >(Call('refresh'));

                if (refreshResult) {
                    accessClient = new fauna.Client({
                        secret: refreshResult.tokens.access.secret,
                        domain: clientDomain,
                    });

                    refreshClient = new fauna.Client({
                        secret: refreshResult.tokens.refresh.secret,
                        domain: clientDomain,
                    });

                    refreshClient.query(Call('logout', false));
                }

                return accessClient;
            }

            return null;
        };

        await expect(sampleAuthFlow()).resolves.toBeInstanceOf(fauna.Client);

        await tearDown(testName, context);
    });
});
