import fauna from 'faunadb';
import * as schemaMigrate from '@fauna-labs/fauna-schema-migrate';
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from './helpers/_setup-db';
import { FAUNA_TEST_TIMEOUT } from './constants';

const q = fauna.query;
const { Call, CreateKey, Role } = q;

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const setUp = async testName => {
    const context = {};

    const databaseClients = await setupTestDatabase(fauna, testName);
    const adminClient = databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, adminClient, [
        'fauna/resources/faunauth/collections/anomalies.fql',
        'fauna/resources/faunauth/collections/dinos.fql',
        'fauna/resources/faunauth/collections/User.fql',
        'fauna/resources/faunauth/functions/createEmailConfirmationToken.js',
        'fauna/resources/faunauth/functions/login.js',
        'fauna/resources/faunauth/functions/logout.js',
        'fauna/resources/faunauth/functions/refresh.js',
        'fauna/resources/faunauth/functions/register.fql',
        'fauna/resources/faunauth/functions/changePassword.js',
        'fauna/resources/faunauth/functions/setPassword.js',
        'fauna/resources/faunauth/indexes/access-token-by-refresh-token.fql',
        'fauna/resources/faunauth/indexes/users-by-email.fql',
        'fauna/resources/faunauth/indexes/tokens-by-instance-sessionid-type-and-loggedout.fql',
        'fauna/resources/faunauth/indexes/tokens-by-instance-type-and-loggedout.fql',
        'fauna/resources/faunauth/indexes/tokens-by-type-email-and-used.fql',
        'fauna/resources/faunauth/roles/loggedin.js',
        'fauna/resources/faunauth/roles/public.fql',
        'fauna/resources/faunauth/roles/refresh.js',
    ]);

    context.databaseClients = databaseClients;

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

/**
 * This test case walks through the `refresh-tokens-advanced` blueprint from this readme:
 * {@link https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced}
 */
describe('sample flow from refresh-tokens-advanced blueprint', () => {
    test('resolves to a fauna.Client instance', async () => {
        const testName = 'resolvesToClient';

        const context = await setUp(testName);

        const sampleAuthFlow = async () => {
            const client = context.databaseClients.childClient;
            const publicKey = await client.query(
                CreateKey({ role: Role('public') }),
            );
            const publicClient = new fauna.Client({
                secret: publicKey.secret,
            });

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
        };

        await expect(sampleAuthFlow()).resolves.toBeInstanceOf(fauna.Client);

        await tearDown(testName, context);
    });
});
