import faunadb from 'faunadb';
import {
    CreateEmailConfirmationToken,
    InvalidateEmailConfirmationToken,
} from './tokens';
import { GetAccountByEmail, VerifyAccountExists } from './identity';

const q = faunadb.query;
const {
    Let,
    Var,
    Select,
    If,
    And,
    Paginate,
    Match,
    Index,
    Lambda,
    KeyFromSecret,
    IsNonEmpty,
    IsArray,
} = q;

export function SaveEmailConfirmationToken(email: string, ttlSeconds?: number) {
    return Let(
        {
            account: GetAccountByEmail(email),
            accountRef: Select(['ref'], Var('account')),
            token: CreateEmailConfirmationToken(
                Var('accountRef'),
                email,
                ttlSeconds,
            ),
        },
        {
            account: Var('account'),
            accountRef: Var('accountRef'),
            token: Var('token'),
        },
    );
}

export function CreateEmailConfirmationTokenForAccount(
    email: string,
    ttlSeconds: number,
) {
    return If(
        // First check whether the account exists and the account can be identified with the email
        And(VerifyAccountExists(email)),
        // if so, save and return the email confirmation token
        SaveEmailConfirmationToken(email, ttlSeconds),
        // if not, return false
        false,
    );
}

// Invalidate all email confirmation tokens for an account (which could be on different machines or
// different browsers)
export function InvalidateEmailConfirmationTokensForAccount(email: string) {
    return IsArray(
        Let(
            {
                emailConfirmationTokens: Paginate(
                    Match(
                        Index('tokens_by_type_email_and_used'),
                        'email_confirmation',
                        email,
                        false,
                    ),
                    { size: 100000 },
                ),
            },
            q.Map(
                Var('emailConfirmationTokens'),
                Lambda(
                    ['token'],
                    InvalidateEmailConfirmationToken(Var('token')),
                ),
            ),
        ),
    );
}

/**
 * @param email - a user's email address
 * @param secret - a email confirmation token secret
 * @returns true if at least one token is found that meets all these conditions:
 *  - belongs to the email address
 *  - is of type `email_confirmation`
 *  - has `data.used: false`
 */
export function VerifyEmailConfirmationSecretForAccount(
    email: string,
    secret: string,
) {
    return IsNonEmpty(
        Let(
            {
                emailConfirmationTokens: Paginate(
                    Match(
                        Index('tokens_by_type_email_and_used'),
                        'email_confirmation',
                        email,
                        false,
                    ),
                    { size: 100000 },
                ),
            },
            q.Map(
                Var('emailConfirmationTokens'),
                Lambda(['token'], KeyFromSecret(secret)),
            ),
        ),
    );
}
