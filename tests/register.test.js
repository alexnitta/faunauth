import fauna from "faunadb";
import * as schemaMigrate from "@fauna-labs/fauna-schema-migrate";
import {
    destroyTestDatabase,
    setupTestDatabase,
    populateDatabaseSchemaFromFiles,
    getClient,
} from "./helpers/_setup-db";
import { FAUNA_TEST_TIMEOUT } from "./constants";

const q = fauna.query;
const { Call, Paginate, Documents, Collection, Lambda, Get, CreateKey, Role } =
    q;

jest.setTimeout(FAUNA_TEST_TIMEOUT);

const setUp = async (testName) => {
    const context = {};

    context.databaseClients = await setupTestDatabase(fauna, testName);
    const client = context.databaseClients.childClient;

    await populateDatabaseSchemaFromFiles(schemaMigrate, q, client, [
        "fauna/resources/collections/User.fql",
        "fauna/resources/functions/createEmailConfirmationToken.js",
        "fauna/resources/functions/login.js",
        "fauna/resources/functions/logout.js",
        "fauna/resources/functions/register.fql",
        "fauna/resources/functions/resetPassword.js",
        "fauna/resources/indexes/users-by-email.fql",
        "fauna/resources/roles/public.fql",
    ]);

    return context;
};

const tearDown = async (testName, context) => {
    await destroyTestDatabase(
        fauna.query,
        testName,
        context.databaseClients.parentClient
    );

    return true;
};

describe("register()", () => {
    it("can verify account was created", async () => {
        const testName = "verifyAccountCreation";
        const context = await setUp(testName);

        const client = context.databaseClients.childClient;

        // We now have a register function which we can call
        await client.query(
            Call("register", "verysecure", {
                email: "user@domain.com",
                locale: "en-US",
                invitedBy: "foo-user-id",
                toGroup: "foo-group-id",
            })
        );
        const accounts = await client.query(
            q.Map(
                Paginate(Documents(Collection("User"))),
                Lambda((ref) => Get(ref))
            )
        );

        // There will be an email
        expect(accounts.data[0].data.email).toBe("user@domain.com");
        // Passwords are never returned
        expect(accounts.data[0].data.password).toBeUndefined();

        await tearDown(testName, context);
    });

    it("can register with a key that uses the public role", async () => {
        const testName = "registerWithPublicKey";
        const context = await setUp(testName);

        const client = context.databaseClients.childClient;
        const key = await client.query(CreateKey({ role: Role("public") }));
        const publicClient = getClient(fauna, key.secret);
        const res = await publicClient.query(
            Call("register", "verysecure", {
                email: "user@domain.com",
                locale: "en-US",
                invitedBy: "foo-user-id",
                toGroup: "foo-group-id",
            })
        );

        expect(res).toBeTruthy();

        await tearDown(testName, context);
    });
});