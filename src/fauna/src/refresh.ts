import faunadb from 'faunadb';
import { RotateAccessAndRefreshToken, VerifyRefreshToken } from './tokens';

const q = faunadb.query;
const { CurrentIdentity, Get } = q;

/**
 * @remarks RefreshToken is parameterized to allow you to write tests; you should not be passing
 * in the time parameters from the client.
 */
export function RefreshToken(
    gracePeriodSeconds?: number,
    accessTtlSeconds?: number,
    refreshLifetimeSeconds?: number,
    refreshReclaimtimeSeconds?: number,
) {
    return VerifyRefreshToken(
        {
            tokens: RotateAccessAndRefreshToken(
                gracePeriodSeconds,
                accessTtlSeconds,
                refreshLifetimeSeconds,
                refreshReclaimtimeSeconds,
            ),
            account: Get(CurrentIdentity()),
        },
        'refresh',
    );
}
