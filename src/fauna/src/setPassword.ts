import faunadb from 'faunadb';
import { CreateTokensForAccount } from './tokens';
import {
    GetAccountByEmail,
    VerifyAccountExists,
    IdentifyAccount,
} from './identity';
import {
    VerifyEmailConfirmationTokenForAccount,
    InvalidateEmailConfirmationTokensForAccount,
} from './emailConfirmation';
import { errors } from './errors';

const q = faunadb.query;
const { Abort, Update, Do, Select } = q;

/**
 * Set a user's password via a token sent in an email confirmation link.
 * @param email - the user's email address
 * @param newPassword - the new password
 * @param token - the email verification token that was sent to the user's email account within an
 * encoded link
 * @param accessTtlSeconds - access token time to live in seconds
 * @param refreshLifetimeSeconds - number of seconds from now that will set refresh token's
 * `.validUntil` property
 * @param refreshReclaimtimeSeconds - refresh token time to live in seconds
 * @returns a Fauna expression with the tokens bound to it, or false if the token secret is invalid
 */
export function SetPasswordForAccount(
    email: string,
    newPassword: string,
    token: string,
    accessTtlSeconds?: number,
    refreshLifetimeSeconds?: number,
    refreshReclaimtimeSeconds?: number,
) {
    if (IdentifyAccount(email, newPassword)) {
        return Abort(errors.passwordAlreadyInUse);
    }

    if (!VerifyAccountExists(email)) {
        return Abort(errors.userDoesNotExist);
    }

    if (!VerifyEmailConfirmationTokenForAccount(email, token)) {
        return Abort(errors.invalidEmailConfirmationToken);
    }

    return Do(
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
    );
}
