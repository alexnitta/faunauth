import type { FaunaLoginResult, Maybe } from '.';

export type TestContext = {
    databaseClients: Maybe<{
        childClient: import('faunadb').Client;
        parentClient: import('faunadb').Client;
    }>;
    secret?: string;
    testDocumentRef?: Maybe<import('faunadb').values.Ref>;
    loginResult?: false | FaunaLoginResult;
};

export type SetUp = (testName: string) => Promise<TestContext>;

export type TearDown = (
    testName: string,
    context: TestContext,
) => Promise<true>;
