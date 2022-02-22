import faunadb from 'faunadb';
import { CreateTokensForAccount } from './tokens';
import { IdentifyAccount, VerifyAccountExists } from './identity';

const q = faunadb.query;
const { If, And } = q;

/**
 * Login is parameterized to allow you to write tests; you should not be passing
 * in the time parameters from the client.
 */
export function Login(
    email,
    password,
    accessTtlSeconds,
    refreshLifetimeSeconds,
    refreshReclaimtimeSeconds,
) {
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
        // if not, return null
        null,
    );
}
