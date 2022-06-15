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

    const inputDomain = input.domain ? input.domain : null;

    let domain = '';

    if (inputDomain !== null) {
        domain = inputDomain;
    } else {
        const lowercaseRegionGroup = (
            input.regionGroup ? input.regionGroup : 'us'
        ).toLowerCase();

        domain = domainMap[lowercaseRegionGroup]
            ? domainMap[lowercaseRegionGroup]
            : undefined;

        if (domain === undefined) {
            console.log(
                `\nFailed to create key; region group "${
                    input.regionGroup
                }" is not recognized. Valid options are: ${Object.keys(
                    domainMap,
                ).join(', ')}`,
            );

            return;
        }
    }

    const portInput = input.port ? input.port : '443';

    let port = null;

    try {
        port = parseInt(portInput, 10);
    } catch {
        console.log('\nFailed to create key; port must be an integer.');

        return;
    }

    const scheme = input.scheme ? input.scheme : 'http';

    if (!['http', 'https'].includes(scheme)) {
        console.log(
            '\nFailed to create key; scheme must be either "http" or "https".',
        );

        return;
    }

    const client = new faunadb.Client({
        secret: adminKey,
        domain,
        port,
        scheme,
    });

    try {
        const response = await client.query(
            q.CreateKey({ role: q.Role('public') }),
        );

        console.log(
            `\nCreated a key for the role "${publicRoleName}" with the secret: ${response.secret}\n`,
        );

        console.log(
            '\nMake sure to save this secret somewhere safe, such as in a password manager.',
        );
    } catch (err) {
        console.log('\nFailed to create secret; encountered an error:\n', err);

        console.log(
            '\nMake sure the "public" role exists before you run this command.',
        );
    }
};

module.exports = {
    createPublicKey,
};
