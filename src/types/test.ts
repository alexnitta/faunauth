import type { Maybe } from '.';

export type TestContext = {
    databaseClients: Maybe<{
        childClient: import('faunadb').Client;
        parentClient: import('faunadb').Client;
    }>;
    secret?: string;
};

export type SetUp = (testName: string) => Promise<TestContext>;

export type TearDown = (
    testName: string,
    context: TestContext,
) => Promise<true>;
