import faunadb from 'faunadb';
import type { Expr } from 'faunadb';
import { CreateTokensForAccountByUsername } from './tokens';
import {
    IdentifyAccountByUsername,
    VerifyAccountExistsByUsername,
} from './identity';
import { errors } from './errors';

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
): Expr | false {
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
        // if not, return an error
        {
            error: errors.invalidUsernameOrPassword,
        },
    );
}
