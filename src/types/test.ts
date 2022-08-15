import type { FaunaLoginResult, Maybe } from '.';

export interface DatabaseClients {
    childClient: import('faunadb').Client;
    parentClient: import('faunadb').Client;
}

export type TestContext = {
    databaseClients: DatabaseClients;
    secret?: string;
    testDocumentRef?: Maybe<import('faunadb').values.Ref>;
    loginResult?: false | FaunaLoginResult;
};

export type SetUp = (testName: string) => Promise<TestContext>;

export type TearDown = (
    testName: string,
    context: TestContext,
) => Promise<true>;

export interface TestDocument {
    hello: string;
}
