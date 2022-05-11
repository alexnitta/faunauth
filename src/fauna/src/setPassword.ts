import faunadb from 'faunadb';
import { CreateTokensForAccount } from './tokens';
import {
    GetAccountByEmail,
    VerifyAccountExists,
    IdentifyAccount,
} from './identity';
import {
    VerifyEmailConfirmationSecretForAccount,
    InvalidateEmailConfirmationTokensForAccount,
} from './emailConfirmation';
import { errors } from './errors';

const q = faunadb.query;
const { Abort, Update, Do, Select, If } = q;

/**
 * Set a user's password via a secret sent in an email confirmation link.
 * @param email - the user's email address
 * @param newPassword - the new password
 * @param secret - the email verification secret that was sent to the user's email account within an
 * encoded link
 * @param accessTtlSeconds - access token time to live in seconds
 * @param refreshLifetimeSeconds - number of seconds from now that will set refresh token's
 * `.validUntil` property
 * @param refreshReclaimtimeSeconds - refresh token time to live in seconds
 * @returns a Fauna expression with the tokens bound to it, or false if the secret is invalid
 */
export function SetPasswordForAccount(
    email: string,
    newPassword: string,
    secret: string,
    accessTtlSeconds?: number,
    refreshLifetimeSeconds?: number,
    refreshReclaimtimeSeconds?: number,
) {
    return If(
        // If the new password is already in use,
        IdentifyAccount(email, newPassword),
        // abort the operation
        Abort(errors.passwordAlreadyInUse),
        // If the new password is not already in use,
        If(
            // If the user exists,
            VerifyAccountExists(email),
            If(
                // And the email confirmation secret is valid,
                VerifyEmailConfirmationSecretForAccount(email, secret),
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
                // If the email confirmation token is invalid, abort the operation
                Abort(errors.invalidEmailConfirmationToken),
            ),
            // If the user does not exist, abort the operation
            Abort(errors.userDoesNotExist),
        ),
    );
}
