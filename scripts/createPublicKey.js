// const publicKey = await client.query(CreateKey({ role: Role('public') }))

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env'),
});

const faunadb = require('faunadb');
const { exit } = require('process');

const q = faunadb.query;
const adminKey = process.env.FAUNA_ADMIN_KEY;
const publicRoleName = 'public';

/**
 * Create a FaunaDB key that is scoped appropriately for creating a new user, then print it to the
 * console. This version works with the auth blueprint as implemented from: https://fauna.com/blog/refreshing-authentication-tokens-in-fql
 * */
const main = async () => {
    const client = new faunadb.Client({ secret: adminKey });

    try {
        const response = await client.query(
            q.CreateKey({ role: q.Role('public') }),
        );

        console.log(
            `Created key for role "${publicRoleName}":\n${response.secret}`,
        );
    } catch (err) {
        console.error(err);
        console.error(`Failed to create key, closing`);
    }

    exit(0);
};

main();
