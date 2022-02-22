import faunadb from 'faunadb';
import { CreateTokensForAccount } from './tokens';
import {
    GetAccountByEmail,
    IdentifyAccount,
    VerifyAccountExists,
} from './identity';

const q = faunadb.query;
const { Update, If, And, Do, Select } = q;

/**
 * Change a user's password when they know their old password.
 * @param email - the user's email address
 * @param oldPassword - the old password to replace
 * @param newPassword - the new password to replace the old password with
 * @param accessTtlSeconds - access token time to live in seconds
 * @param refreshLifetimeSeconds - number of seconds from now that will set refresh token's
 * `.validUntil` property
 * @param refreshReclaimtimeSeconds - refresh token time to live in seconds
 * @returns a Fauna expression with the tokens bound to it, or false if either the account does not
 * exist or the old password is invalid
 */
export function ChangePasswordForAccount(
    email,
    oldPassword,
    newPassword,
    accessTtlSeconds,
    refreshLifetimeSeconds,
    refreshReclaimtimeSeconds,
) {
    return If(
        // First check whether the account exists and the account can be identified with the
        // email/password
        And(VerifyAccountExists(email), IdentifyAccount(email, oldPassword)),
        // If so, update the password and create and return a new pair of access/refresh tokens
        Do(
            Update(Select(['ref'], GetAccountByEmail(email)), {
                credentials: {
                    password: newPassword,
                },
            }),
            CreateTokensForAccount(
                email,
                accessTtlSeconds,
                refreshLifetimeSeconds,
                refreshReclaimtimeSeconds,
            ),
        ),
        // If not, return false
        false,
    );
}
