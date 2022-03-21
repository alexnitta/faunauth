import faunadb from 'faunadb';
import { IsCalledWithRefreshToken } from '../../../src/tokens';

const q = faunadb.query;
const { Query, Lambda, Collection, CreateRole } = q;

export default CreateRole({
    name: 'refresh',
    membership: [
        {
            // The accounts collection gets access
            resource: Collection('User'),
            // If the token used is an refresh token
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            predicate: Query(Lambda(ref => IsCalledWithRefreshToken())),
        },
    ],
    privileges: [
        // A refresh token can only refresh and there is value in restricting the functionality.
        // If a malicious actor was able to grab a refresh token from the httpOnly cookie due to some vulnerability:
        // - the actor can't retrieve data with it
        // - the actor has to realize he has to exchange it for an access token by calling refresh
        // - his refresh actions will be detected if or when the browser of the real user initiates a refresh.
        // In essence, it reduces the ease of getting long-term access significantly if a refresh token does leak.
        {
            resource: q.Function('refresh'),
            actions: {
                call: true,
            },
        },
        {
            resource: q.Function('logout'),
            actions: {
                call: true,
            },
        },
    ],
});
