import faunadb from 'faunadb';
import type { Expr } from 'faunadb';
import { CreateTokensForAccount } from './tokens';
import { IdentifyAccount, VerifyAccountExists } from './identity';

const q = faunadb.query;
const { If, And } = q;

/**
 * Log a user in via email and password, then return access and refresh tokens.
 * If either the email or password is incorrect, this function returns false. This is by design;
 * the person trying to log in should not be allowed to know which of these values is incorrect
 * because it would help them guess the other value if they are a malicious actor.
 *
 * Login is parameterized to allow you to write tests; you should not be passing
 * in the time parameters from the client.
 */
export function Login(
    email: string,
    password: string,
    accessTtlSeconds?: number,
    refreshLifetimeSeconds?: number,
    refreshReclaimtimeSeconds?: number,
): Expr | false {
    return If(
        // First check whether the account exists and the account can be identified with the
        // email/password
        And(VerifyAccountExists(email), IdentifyAccount(email, password)),
        // if so, create and return tokens
        CreateTokensForAccount(
            email,
            accessTtlSeconds,
            refreshLifetimeSeconds,
            refreshReclaimtimeSeconds,
        ),
        // if not, return false
        false,
    );
}
