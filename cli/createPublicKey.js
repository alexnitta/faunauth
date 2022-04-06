const faunadb = require('faunadb');

const q = faunadb.query;
const adminKey = process.env.FAUNA_ADMIN_KEY;
const publicRoleName = 'public';

const domainMap = {
    classic: 'db.fauna.com',
    us: 'db.us.fauna.com',
    eu: 'db.eu.fauna.com',
    preview: 'db.fauna-preview.com',
};

/**
 * Create a FaunaDB key that is scoped appropriately for creating a new user, then print it to the
 * console.
 * */
const createPublicKey = async input => {
    if (adminKey === undefined) {
        console.log(
            '\nFailed to create key; process.env.FAUNA_ADMIN_KEY is undefined.',
        );

        console.log(
            '\nBefore running this command, run: export FAUNA_ADMIN_KEY=<your_admin_key>',
        );

        return;
    }

    const lowercaseRegionGroup = (
        input.regionGroup ? input.regionGroup : 'us'
    ).toLowerCase();

    if (domainMap[lowercaseRegionGroup] === undefined) {
        console.log(
            `\nFailed to create key; region group "${
                input.regionGroup
            }" is not recognized. Valid options are: ${Object.keys(
                domainMap,
            ).join(', ')}`,
        );

        return;
    }

    const domain = domainMap[lowercaseRegionGroup]
        ? domainMap[lowercaseRegionGroup]
        : undefined;

    const client = new faunadb.Client({ secret: adminKey, domain });

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
