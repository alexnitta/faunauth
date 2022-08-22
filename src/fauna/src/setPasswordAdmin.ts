import faunadb from 'faunadb';
import { CreateTokensForAccount } from './tokens';
import { GetAccountByEmail, VerifyAccountExists } from './identity';
import { InvalidateEmailConfirmationTokensForAccount } from './emailConfirmation';
import { errors } from './errors';

const q = faunadb.query;
const { Update, Do, Select, If } = q;

/**
 * Set a user's password without confirming their email address. This is intended for use only when
 * creating an account as an administrator; use this with caution and do not expose it in any public
 * endpoints.
 * @param email - the user's email address
 * @param newPassword - the new password
 * @param accessTtlSeconds - access token time to live in seconds
 * @param refreshLifetimeSeconds - number of seconds from now that will set refresh token's
 * `.validUntil` property
 * @param refreshReclaimtimeSeconds - refresh token time to live in seconds
 * @returns a Fauna expression with the tokens bound to it, or false if the secret is invalid
 */
export function SetPasswordForAccountAdmin(
    email: string,
    newPassword: string,
    accessTtlSeconds?: number,
    refreshLifetimeSeconds?: number,
    refreshReclaimtimeSeconds?: number,
) {
    return If(
        // If the user exists,
        VerifyAccountExists(email),
        Do(
            // Update the password and set `data.confirmedEmail: true`
            Update(Select(['ref'], GetAccountByEmail(email)), {
                credentials: {
                    password: newPassword,
                },
                data: {
                    confirmedEmail: true,
                },
            }),
            // Invalidate all email confirmation tokens for the account
            InvalidateEmailConfirmationTokensForAccount(email),
            // Create and return a new pair of access/refresh tokens
            CreateTokensForAccount(
                email,
                accessTtlSeconds,
                refreshLifetimeSeconds,
                refreshReclaimtimeSeconds,
            ),
        ),
        // If the user does not exist, return an error
        {
            error: errors.userDoesNotExist,
        },
    );
}
