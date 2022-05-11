import type { Maybe } from '.';

export type TestContext = {
    databaseClients: Maybe<{
        childClient: import('faunadb').Client;
        parentClient: import('faunadb').Client;
    }>;
    secret?: string;
};
