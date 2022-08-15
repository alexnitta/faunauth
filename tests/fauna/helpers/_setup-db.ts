import path from 'path';
import fs from 'fs';
import shell from 'shelljs';
import dotenv from 'dotenv';
import { Client, ClientConfig, query, Ref } from 'faunadb';
import {
    getSnippetsFromPaths,
    getSnippetsFromStrings,
    diffSnippets,
    generateMigrations,
    generateMigrationLetObject,
} from '@fauna-labs/fauna-schema-migrate';

import { CreateKeyResult, Maybe, DatabaseClients } from '../../../src/types';

const fullPath = path.resolve(process.cwd(), '.env');

dotenv.config({ path: fullPath });

export const populateDatabaseSchemaFromFiles = async (
    q: typeof query,
    childClient: Client,
    paths: string[],
) => {
    const snippets = await getSnippetsFromPaths(paths);
    const emptySnippets = getSnippetsFromStrings([]);
    const diff = diffSnippets(emptySnippets, snippets);
    const migrations = generateMigrations(diff);
    const letObj = generateMigrationLetObject(migrations);
    const query = q.Let(letObj, true);

    return await childClient.query(query);
};

export const loadApplicationFile = async (file: string) => {
    return fs.readFileSync(path.join(process.cwd(), file), 'utf8');
};

export const deleteMigrationDir = async () => {
    shell.rm('-rf', './fauna/temp');
};

// set up a child database for testing, we pass in the fauna
// library since else this reusable file will use a different fauna library
// which stops of to verify whether errors are instances of fauna errors.
export const setupTestDatabase = async (
    fauna: { Client: typeof Client; query: typeof query },
    testName: string,
): Promise<DatabaseClients> => {
    const {
        CreateKey,
        CreateDatabase,
        Select,
        Do,
        If,
        Exists,
        Delete,
        Database,
    } = fauna.query;

    const adminKey = process.env.FAUNA_ADMIN_KEY;

    if (adminKey === undefined) {
        throw new Error(
            'Could not read process.env.FAUNA_ADMIN_KEY. Please make sure your .env file includes this value.',
        );
    }

    const client = getClient(fauna, adminKey);

    const key = await client.query<
        CreateKeyResult<{ database: typeof Ref; role: string }>
    >(
        Do(
            If(Exists(Database(testName)), Delete(Database(testName)), true),
            CreateKey({
                database: Select(['ref'], CreateDatabase({ name: testName })),
                role: 'admin',
            }),
        ),
    );

    const childDbClient = getClient(fauna, key.secret);
    return { parentClient: client, childClient: childDbClient };
};

export const destroyTestDatabase = async (
    q: typeof query,
    testName: string,
    parentClient: Maybe<Client>,
) => {
    if (parentClient === null) {
        return null;
    }

    const { Do, If, Exists, Delete, Database } = q;
    await parentClient.query(
        Do(
            cleanUpChildDbKeys(q, testName),
            If(Exists(Database(testName)), Delete(Database(testName)), true),
        ),
    );
};

export const cleanUpChildDbKeys = (q: typeof query, testName: string) => {
    const {
        Select,
        If,
        Delete,
        Paginate,
        Keys,
        ContainsField,
        Let,
        Var,
        Lambda,
        Get,
        Foreach,
        And,
        Equals,
    } = q;
    return Foreach(
        Paginate(Keys(), { size: 100000 }),
        Lambda(
            ['k'],
            Let(
                {
                    key: Get(Var('k')),
                },
                If(
                    // Delete all keys that belong to child databases.
                    And(
                        ContainsField('database', Var('key')),
                        Equals(
                            Select(['database', 'id'], Var('key')),
                            testName,
                        ),
                    ),
                    Delete(Select(['ref'], Var('key'))),
                    false,
                ),
            ),
        ),
    );
};

export const getClient = (
    fauna: { Client: typeof Client },
    secret: string,
    observer?: ClientConfig['observer'],
) => {
    const opts: ClientConfig = { secret: secret };

    if (process.env.FAUNADB_DOMAIN) {
        opts.domain = process.env.FAUNADB_DOMAIN;
    }

    if (
        process.env.FAUNADB_SCHEME === 'http' ||
        process.env.FAUNADB_SCHEME === 'https'
    ) {
        opts.scheme = process.env.FAUNADB_SCHEME;
    }

    opts.queryTimeout = 600 * 1000;
    opts.observer = observer;
    const client = new fauna.Client(opts);
    return client;
};
