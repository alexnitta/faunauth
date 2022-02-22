import faunadb from 'faunadb';
import { IsCalledWithAccessToken } from '../../src/tokens';

const q = faunadb.query;
const {
    Collection,
    CreateRole,
    CurrentIdentity,
    Equals,
    Lambda,
    Let,
    Query,
    Var,
} = q;

/**
 * Create a FaunaDB role that is scoped appropriately for a logged-in user.
 *
 * NOTE: 9/24/21: This function doesn't work with any indexes or collections defined in the GraphQL
 * schema. This is a known shortcoming of `fauna-schema-migrate`. If you try to add an index or
 * collection from the GraphQL schema here, you'll see a message like this:
 *
 * The following resource is not defined anywhere in the resource folders
 *    type: Collection, name: Person
 * and was referenced from:
 *    type: Role, name: loggedin
 *
 * The createUserRole script in packages/stories/scripts/createUserRole.js is a workaround for this.
 * You'll need to add privileges there in order to grant rights to users.
 * */
export default CreateRole({
    name: 'loggedin',
    membership: [
        {
            // The User collection gets access
            resource: Collection('User'),
            // If the token used is an access token or which we'll use a reusable snippet of FQL
            // returned by 'IsCalledWithAccessToken'
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            predicate: Query(Lambda(ref => IsCalledWithAccessToken())),
        },
    ],
    privileges: [
        {
            resource: Collection('dinos'),
            actions: {
                read: true,
            },
        },
        {
            resource: q.Function('changePassword'),
            actions: {
                call: true,
            },
        },
        {
            resource: Collection('User'),
            actions: {
                read: true,
                write: Query(
                    Lambda(
                        ['oldData', 'newData', 'ref'],
                        // Only a given user can update its own data
                        Let(
                            {
                                loggedInUserRef: CurrentIdentity(),
                            },
                            Equals(Var('loggedInUserRef'), Var('ref')),
                        ),
                    ),
                ),
            },
        },
    ],
});
