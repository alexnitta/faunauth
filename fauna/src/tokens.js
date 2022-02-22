import faunadb, { If } from 'faunadb';
import {
    LogAnomaly,
    REFRESH_TOKEN_EXPIRED,
    REFRESH_TOKEN_REUSE_ERROR,
    REFRESH_TOKEN_USED_AFTER_LOGOUT,
} from './anomalies';

import { GetAccountByEmail, GetAccountByUsername } from './identity';

const q = faunadb.query;
const {
    Let,
    Var,
    Create,
    Select,
    Tokens,
    Now,
    TimeAdd,
    Equals,
    Get,
    CurrentToken,
    HasCurrentToken,
    Exists,
    Update,
    Match,
    Index,
    NewId,
    Do,
    Delete,
    And,
    GT,
    CurrentIdentity,
    Not,
} = q;

export const ACCESS_TOKEN_LIFETIME_SECONDS = 600; // 10 minutes
export const EMAIL_CONFIRMATION_TOKEN_LIFETIME_SECONDS = 900; // 15 minutes

// lifetime of the token makes the refresh token unusable after this lifetime since
// the code explicitly checks that lifetime before allowing a refresh token to refresh.
export const REFRESH_TOKEN_LIFETIME_SECONDS = 28800; // 8 hours
// reclaim time deletes the token which makes it unable to detect leaked tokens.
// which is why it is set rather high.
export const REFRESH_TOKEN_RECLAIMTIME_SECONDS = 604800; // 1 week
// when a refresh token is refreshed itself, allow a grace period to make sure parallel requests work.
export const GRACE_PERIOD_SECONDS = 20;

/*
  Verification of tokens and/or verify validity of tokens
*/

export function IsCalledWithAccessToken() {
    return And(
        HasCurrentToken(),
        Equals(Select(['data', 'type'], Get(CurrentToken()), false), 'access'),
    );
}

export function IsCalledWithRefreshToken() {
    return And(
        HasCurrentToken(),
        Equals(Select(['data', 'type'], Get(CurrentToken()), false), 'refresh'),
    );
}

export function IsTokenLoggedOut() {
    return Select(['data', 'loggedOut'], Get(CurrentToken()));
}

export function IsTokenUsed() {
    return Select(['data', 'used'], Get(CurrentToken()));
}

export function IsTokenStillValid() {
    return GT(Select(['data', 'validUntil'], Get(CurrentToken())), Now());
}

function IsWithinGracePeriod() {
    return GT(Select(['data', 'gracePeriodUntil'], Get(CurrentToken())), Now());
}

export function VerifyRefreshToken(
    fqlStatementOnSuccessfulVerification,
    action,
) {
    return If(
        And(IsTokenUsed(), Not(IsWithinGracePeriod())),
        LogAnomaly(REFRESH_TOKEN_REUSE_ERROR, action),
        If(
            IsTokenStillValid(),
            If(
                Not(IsTokenLoggedOut()),
                fqlStatementOnSuccessfulVerification,
                LogAnomaly(REFRESH_TOKEN_USED_AFTER_LOGOUT, action),
            ),
            LogAnomaly(REFRESH_TOKEN_EXPIRED, action),
        ),
    );
}

/**
  Invalidate/Delete/Logout of tokens
 */
export function InvalidateRefreshToken(refreshTokenRef, gracePeriodSeconds) {
    return Update(refreshTokenRef, {
        data: {
            used: true,
            gracePeriodUntil: TimeAdd(
                Now(),
                gracePeriodSeconds || GRACE_PERIOD_SECONDS,
                'seconds',
            ),
        },
    });
}

function InvalidateAccessToken(refreshTokenRef) {
    return If(
        Exists(Match(Index('access_token_by_refresh_token'), refreshTokenRef)),
        Delete(
            Select(
                ['ref'],
                Get(
                    Match(
                        Index('access_token_by_refresh_token'),
                        refreshTokenRef,
                    ),
                ),
            ),
        ),
        false,
    );
}

function LogoutRefreshToken(refreshTokenRef) {
    return Update(refreshTokenRef, { data: { loggedOut: true } });
}

export function LogoutAccessAndRefreshToken(refreshTokenRef) {
    return Do(
        InvalidateAccessToken(refreshTokenRef),
        LogoutRefreshToken(refreshTokenRef),
    );
}

/*
  Creation of tokens
 */
export function CreateAccessToken(accountRef, refreshTokenRef, ttlSeconds) {
    return Create(Tokens(), {
        instance: accountRef,
        // A  token is a document just like everything else in Fauna.
        // We will store extra metadata on the token to identify the token type.
        data: {
            type: 'access',
            // We store which refresh token that created the access tokens which allows us to easily invalidate
            // all access tokens created by a specific refresh token.
            refresh: refreshTokenRef,
        },
        // access tokens live for 10 minutes, which is typically a good lifetime for short-lived tokens.
        ttl: TimeAdd(
            Now(),
            ttlSeconds || ACCESS_TOKEN_LIFETIME_SECONDS,
            'seconds',
        ),
    });
}

export function GetSessionId() {
    return Select(['data', 'sessionId'], Get(CurrentToken()));
}

function CreateOrReuseId() {
    return If(IsCalledWithRefreshToken(), GetSessionId(), NewId());
}

export function CreateRefreshToken(
    accountRef,
    lifetimeSeconds,
    reclaimtimeSeconds,
) {
    return Create(Tokens(), {
        instance: accountRef,
        data: {
            type: 'refresh',
            used: false,
            sessionId: CreateOrReuseId(),
            validUntil: TimeAdd(
                Now(),
                lifetimeSeconds || REFRESH_TOKEN_LIFETIME_SECONDS,
                'seconds',
            ),
            loggedOut: false,
        },
        ttl: TimeAdd(
            Now(),
            reclaimtimeSeconds || REFRESH_TOKEN_RECLAIMTIME_SECONDS,
            'seconds',
        ),
    });
}

export function CreateAccessAndRefreshToken(
    instance,
    accessTtlSeconds,
    refreshLifetimeSeconds,
    refreshReclaimtimeSeconds,
) {
    return Let(
        {
            refresh: CreateRefreshToken(
                instance,
                refreshLifetimeSeconds,
                refreshReclaimtimeSeconds,
            ),
            access: CreateAccessToken(
                instance,
                Select(['ref'], Var('refresh')),
                accessTtlSeconds,
            ),
        },
        {
            refresh: Var('refresh'),
            access: Var('access'),
        },
    );
}

/**
 * Create an access token and refresh token for the user. The access token can be used to
 * authenticate FaunaDB requests, and the refresh token can be used to fetch another pair of tokens
 * when the access token expires.
 * @param email - the user's email address
 * @param accessTtlSeconds - access token time to live in seconds
 * @param refreshLifetimeSeconds - number of seconds from now that will set refresh token's
 * `.validUntil` property
 * @param refreshReclaimtimeSeconds - refresh token time to live in seconds
 * @returns a Fauna Expression with the tokens bound to it
 */
export function CreateTokensForAccount(
    email,
    accessTtlSeconds,
    refreshLifetimeSeconds,
    refreshReclaimtimeSeconds,
) {
    return Let(
        {
            account: GetAccountByEmail(email),
            accountRef: Select(['ref'], Var('account')),
            tokens: CreateAccessAndRefreshToken(
                Var('accountRef'),
                accessTtlSeconds,
                refreshLifetimeSeconds,
                refreshReclaimtimeSeconds,
            ),
        },
        {
            tokens: Var('tokens'),
            account: Var('account'),
            id: Select(['ref', 'id'], Var('account')),
        },
    );
}

/**
 * Create an access token and refresh token for the user. The access token can be used to
 * authenticate FaunaDB requests, and the refresh token can be used to fetch another pair of tokens
 * when the access token expires.
 * @param username - the user's username
 * @param accessTtlSeconds - access token time to live in seconds
 * @param refreshLifetimeSeconds - number of seconds from now that will set refresh token's
 * `.validUntil` property
 * @param refreshReclaimtimeSeconds - refresh token time to live in seconds
 * @returns a Fauna Expression with the tokens bound to it
 */
export function CreateTokensForAccountByUsername(
    username,
    accessTtlSeconds,
    refreshLifetimeSeconds,
    refreshReclaimtimeSeconds,
) {
    return Let(
        {
            account: GetAccountByUsername(username),
            accountRef: Select(['ref'], Var('account')),
            tokens: CreateAccessAndRefreshToken(
                Var('accountRef'),
                accessTtlSeconds,
                refreshLifetimeSeconds,
                refreshReclaimtimeSeconds,
            ),
        },
        {
            tokens: Var('tokens'),
            account: Var('account'),
            id: Select(['ref', 'id'], Var('account')),
        },
    );
}

export function RotateAccessAndRefreshToken(
    gracePeriodSeconds,
    accessTtlSeconds,
    refreshLifetimeSeconds,
    refreshReclaimtimeSeconds,
) {
    return Do(
        InvalidateRefreshToken(CurrentToken(), gracePeriodSeconds),
        CreateAccessAndRefreshToken(
            CurrentIdentity(),
            accessTtlSeconds,
            refreshLifetimeSeconds,
            refreshReclaimtimeSeconds,
        ),
    );
}

export function CreateEmailConfirmationToken(instance, ttlSeconds, email) {
    return Create(Tokens(), {
        instance,
        data: {
            type: 'email_confirmation',
            email,
            used: false,
        },
        ttl: TimeAdd(
            Now(),
            ttlSeconds || EMAIL_CONFIRMATION_TOKEN_LIFETIME_SECONDS,
            'seconds',
        ),
    });
}

export function InvalidateEmailConfirmationToken(emailConfirmationTokenRef) {
    return Update(emailConfirmationTokenRef, {
        data: {
            used: true,
        },
    });
}
