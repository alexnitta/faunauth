import faunadb from 'faunadb';
import { CreateTokensForAccount } from './tokens';
import { GetAccountByEmail, IdentifyAccount } from './identity';
import { errors } from './errors';

const q = faunadb.query;
const { Abort, Update, Do, Select, If } = q;

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
    email: string,
    oldPassword: string,
    newPassword: string,
    accessTtlSeconds?: number,
    refreshLifetimeSeconds?: number,
    refreshReclaimtimeSeconds?: number,
) {
    return If(
        // If the old password is valid,
        IdentifyAccount(email, oldPassword),
        Do(
            // Set the new password
            Update(Select(['ref'], GetAccountByEmail(email)), {
                credentials: {
                    password: newPassword,
                },
            }),
            // Create and return a new pair of access/refresh tokens
            CreateTokensForAccount(
                email,
                accessTtlSeconds,
                refreshLifetimeSeconds,
                refreshReclaimtimeSeconds,
            ),
        ),
        // If the old password is invalid, abort the operation
        Abort(errors.invalidOldPassword),
    );
}
