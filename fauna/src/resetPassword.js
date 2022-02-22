import faunadb from 'faunadb';
import { CreateTokensForAccount } from './tokens';
import { GetAccountByEmail, VerifyAccountExists } from './identity';
import {
    VerifyEmailConfirmationTokenForAccount,
    InvalidateEmailConfirmationTokensForAccount,
} from './emailConfirmation';

const q = faunadb.query;
const { And, Update, If, Do, Select } = q;

/**
 * Reset a user's password when they don't know their old password.
 * @param email - the user's email address
 * @param newPassword - the new password
 * @param checkSecret - the email verification token secret that was sent to the user's email
 * account within an encoded link
 * @param accessTtlSeconds - access token time to live in seconds
 * @param refreshLifetimeSeconds - number of seconds from now that will set refresh token's
 * `.validUntil` property
 * @param refreshReclaimtimeSeconds - refresh token time to live in seconds
 * @returns a Fauna expression with the tokens bound to it, or false if either the account does not
 * exist or the old password is invalid
 */
export function ResetPasswordForAccount(
    email,
    newPassword,
    checkSecret,
    accessTtlSeconds,
    refreshLifetimeSeconds,
    refreshReclaimtimeSeconds,
) {
    return If(
        // First, check:
        And(
            // Whether the account exists
            VerifyAccountExists(email),
            // Whether the email confirmation token secret is valid
            VerifyEmailConfirmationTokenForAccount(email, checkSecret),
        ),
        // If so:
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
        // If not, return false
        false,
    );
}
