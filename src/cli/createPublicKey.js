const faunadb = require('faunadb');

const q = faunadb.query;
const adminKey = process.env.FAUNA_ADMIN_KEY;
const publicRoleName = 'public';

/**
 * Create a FaunaDB key that is scoped appropriately for creating a new user, then print it to the
 * console.
 * */
const createPublicKey = async () => {
    if (adminKey == undefined) {
        console.log(
            '\nFailed to create key; process.env.FAUNA_ADMIN_KEY is undefined.',
        );

        console.log(
            '\nBefore running this command, run: export FAUNA_ADMIN_KEY=<your_admin_key>',
        );

        return;
    }

    const client = new faunadb.Client({ secret: adminKey });

    try {
        const response = await client.query(
            q.CreateKey({ role: q.Role('public') }),
        );

        console.log(
            `\nCreated key for "${publicRoleName}" role:\n${response.secret}\n`,
        );

        console.log(
            '\nMake sure to save this key somewhere safe, such as in a password manager.',
        );
    } catch (err) {
        console.log('\nFailed to create key; encountered an error:\n', err);

        console.log(
            '\nMake sure the "public" role exists before you run this command.',
        );
    }
};

module.exports = {
    createPublicKey,
};
