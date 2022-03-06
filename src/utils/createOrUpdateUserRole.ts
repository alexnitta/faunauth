import faunadb, { Collection, ExprVal } from 'faunadb';

const q = faunadb.query;
const userRoleName = 'user';

export interface CreateOrUpdateUserRoleInput {
    /**
     * A Fauna key that has the built-in role of "Admin"
     */
    faunaAdminKey: string;
    /**
     * Array of privileges to grant to every user.
     */
    privileges: ExprVal[];
    /**
     * A name for this role; defaults to "user".
     */
    roleName?: string;
}

/**
 * Create or update a Fauna role that is scoped appropriately for a user. You will need to call
 * this function with a `privileges` array that is populated for your particular database structure.
 * A good way to do this is by creating a script that calls `createOrUpdateUserRole` and passes in
 * the privileges that your app requires. Then you can call your script when you need to set up the
 * role, allowing you to save your permissions in a reproducible form.
 *
 * Here is an example of a script that calls `createOrUpdateUserRole`:
 *
 * ```JavaScript
    // scripts/setUpUserRole.js

    // Read more on how dotenv works here: https://github.com/motdotla/dotenv
    require('dotenv').config();

    const { exit } = require('process');
    const { Collection, Index } = require('faunadb');
    const { createOrUpdateUserRole } = require('faunauth');

    const faunaAdminKey = process.env.FAUNA_ADMIN_KEY;

    // Create a FaunaDB role that is scoped appropriately for a user.
    const main = async () => {
        if (!faunaAdminKey) {
            console.error('process.env.FAUNA_ADMIN_KEY is missing, closing');

            exit(1);
        }

        try {
            await createOrUpdateUserRole({
                faunaAdminKey,
                roleName: 'user',
                privileges: [
                    {
                        resource: Collection('Person'),
                        actions: {
                            create: true,
                            read: true,
                            delete: true,
                            write: true,
                        },
                    },
                    // ... more privileges go here
                ],
            });
        } catch(err) {
            console.error('createOrUpdateUserRole threw error:\n', err);

            exit(1);
        }

        exit(0);
    };

    main();
 * ```
 *
 * You could then set up a package.json script that calls this function, ie:
 * ```JSON
 *  {
 *      scripts: {
 *          set-up-user-role: "node scripts/setUpUserRole.js";
 *      }
 *  }
 * ```
 * */
export const createOrUpdateUserRole = async ({
    faunaAdminKey,
    privileges,
    roleName = 'user',
}: CreateOrUpdateUserRoleInput) => {
    const client = new faunadb.Client({ secret: faunaAdminKey });

    const roleExists = await client.query(q.Exists(q.Role(roleName)));

    if (roleExists) {
        try {
            await client.query(
                q.Update(q.Role(roleName), {
                    name: roleName,
                    membership: [
                        {
                            resource: Collection('User'),
                        },
                    ],
                    privileges,
                }),
            );

            console.log(`Successfully updated role "${userRoleName}"`);
        } catch (err) {
            console.error(
                `Failed to update role "${userRoleName}"; error: \n`,
                err,
            );
        }
    } else {
        try {
            await client.query(
                q.CreateRole({
                    name: roleName,
                    membership: [
                        {
                            resource: Collection('User'),
                        },
                    ],
                    privileges,
                }),
            );

            console.log(`Successfully created role "${userRoleName}"`);
        } catch (err) {
            console.error(
                `Failed to create role "${userRoleName}"; error:\n`,
                err,
            );
        }
    }
};
