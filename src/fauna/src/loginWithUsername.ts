import faunadb from 'faunadb';
import { CreateTokensForAccountByUsername } from './tokens';
import {
    IdentifyAccountByUsername,
    VerifyAccountExistsByUsername,
} from './identity';

const q = faunadb.query;
const { If, And } = q;

/**
 * LoginWithUsername is parameterized to allow you to write tests; you should not be passing
 * in the time parameters from the client.
 */
export function LoginWithUsername(
    username: string,
    password: string,
    accessTtlSeconds?: number,
    refreshLifetimeSeconds?: number,
    refreshReclaimtimeSeconds?: number,
) {
    return If(
        // First check whether the account exists and the account can be identified with the
        // username/password
        And(
            VerifyAccountExistsByUsername(username),
            IdentifyAccountByUsername(username, password),
        ),
        // if so, create and return tokens
        CreateTokensForAccountByUsername(
            username,
            accessTtlSeconds,
            refreshLifetimeSeconds,
            refreshReclaimtimeSeconds,
        ),
        // if not, return null
        null,
    );
}
