import faunadb from 'faunadb';
import type { Expr } from 'faunadb';
import { CreateTokensForAccount } from './tokens';
import { VerifyAccountExists } from './identity';
import {
    VerifyEmailConfirmationSecretForAccount,
    InvalidateEmailConfirmationTokensForAccount,
} from './emailConfirmation';

const q = faunadb.query;
const { And, If, Do } = q;

/**
 * Sign in a user via a link sent in an email. The link contains an encoded secret which must be
 * passed to this function as the `secret` argument.
 * @param email - the user's email address
 * @param secret - the email verification secret that was sent to the user's email account within an
 * encoded link
 * @param accessTtlSeconds - access token time to live in seconds
 * @param refreshLifetimeSeconds - number of seconds from now that will set refresh token's
 * `.validUntil` property
 * @param refreshReclaimtimeSeconds - refresh token time to live in seconds
 * @returns a Fauna expression with the tokens bound to it, or false if either the account does not
 * exist or the old password is invalid
 */
export function LoginWithMagicLink(
    email: string,
    secret: string,
    accessTtlSeconds?: number,
    refreshLifetimeSeconds?: number,
    refreshReclaimtimeSeconds?: number,
): Expr | false {
    return If(
        // First, check:
        And(
            // Whether the account exists
            VerifyAccountExists(email),
            // Whether the email confirmation secret is valid
            VerifyEmailConfirmationSecretForAccount(email, secret),
        ),
        // If so:
        Do(
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
