import fauna from "faunadb";
import * as schemaMigrate from "@fauna-labs/fauna-schema-migrate";
import { delay } from "./helpers/_delay";
import {
    destroyTestDatabase,
    getClient,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
} from "./helpers/_setup-db";

const q = fauna.query;
const { Call, Create, Collection, Get, Paginate, Documents } = q;

import { FAUNA_TEST_TIMEOUT } from "./constants";

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const setUp = async (testName) => {
    const context = {};
    // Set up the child database and retrieve both parent and child Fauna clients
    context.databaseClients = await setupTestDatabase(fauna, testName);
    const client = context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, client, [
        "fauna/resources/collections/dinos.fql",
        "fauna/resources/collections/User.fql",
        "fauna/resources/functions/createEmailConfirmationToken.js",
        "fauna/resources/functions/register.fql",
        "fauna/resources/functions/changePassword.js",
        "fauna/resources/functions/resetPassword.js",
        "fauna/resources/indexes/users-by-email.fql",
        "fauna/resources/indexes/users-by-username.fql",
        "fauna/resources/roles/loggedin.js",
        // custom resources for this test with lower TTLs for access and refresh tokens (10s and 20s)
        "tests/resources/functions/_login-modified.js",
    ]);
    // create some data in the test collection
    const testDocument = await client.query(
        Create(Collection("dinos"), { data: { hello: "world" } })
    );

    context.testDocumentRef = testDocument.ref;

    // and register a user
    await client.query(
        Call("register", "verysecure", {
            confirmedEmail: false,
            email: "user@domain.com",
            locale: "en-US",
            invitedBy: "foo-user-id",
            toGroup: "foo-group-id",
        })
    );

    return context;
};

const tearDown = async (testName, context) => {
    // Destroy the child database to clean up (using the parentClient)
    await destroyTestDatabase(
        q,
        testName,
        context.databaseClients.parentClient
    );

    return true;
};

describe("access token behavior", () => {
    test("within 10 seconds (ttl of access token), we can access data via the test membership role", async () => {
        const testName = "accessBeforeExpiration";
        const context = await setUp(testName);

        expect.assertions(2);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call("login-modified", "user@domain.com", "verysecure")
        );
        const accessToken = loginResult.tokens.access.secret;
        const loggedInClient = getClient(fauna, accessToken);
        const doc = await loggedInClient.query(Get(context.testDocumentRef));

        expect(doc.data).toBeTruthy();
        expect(doc.data.hello).toBe("world");

        await tearDown(testName, context);
    });

    test("after 10 seconds (ttl of access token), we can no longer access data", async () => {
        const testName = "accessAfterExpiration";
        const context = await setUp(testName);

        expect.assertions(3);

        const client = context.databaseClients.childClient;
        const loginResult = await client.query(
            Call("login-modified", "user@domain.com", "verysecure")
        );

        const accessToken = loginResult.tokens.access.secret;
        const loggedInClient = getClient(fauna, accessToken);

        // wait 11s
        await delay(11000);

        // we can no longer get the document with this token
        await expect(
            loggedInClient.query(Get(context.testDocumentRef))
        ).rejects.toThrow(fauna.errors.Unauthorized);

        // nor can we paginate the collection
        await expect(
            loggedInClient.query(Paginate(Documents(Collection("dinos"))))
        ).rejects.toThrow(fauna.errors.Unauthorized);

        // we can no longer access the token document itself, not even with the admin key.
        await expect(
            client.query(Get(loginResult.tokens.access.ref))
        ).rejects.toThrow(fauna.errors.NotFound);

        await tearDown(testName, context);
    });

    test("refresh tokens do not provide access to the data", async () => {
        const testName = "refreshTokenPrivileges";
        const context = await setUp(testName);

        expect.assertions(1);

        await expect(async () => {
            const client = context.databaseClients.childClient;
            const loginResult = await client.query(
                Call("login-modified", "user@domain.com", "verysecure")
            );
            const refreshToken = loginResult.tokens.refresh.secret;
            const refreshClient = getClient(fauna, refreshToken);

            await refreshClient.query(Get(context.testDocumentRef));
        }).rejects.toThrow(fauna.errors.PermissionDenied);

        await tearDown(testName, context);
    });
});