import faunadb, { query as q } from 'faunadb';

import { ErrorWithKey } from '~/utils';
import type { UpdateUserResult } from '~/types/auth';

const { Ref, Collection, Update } = q;

export interface UpdateUserInput {
    /**
     * A Fauna secret that was returned after authenticating the user
     */
    accessToken: string | null;
    /**
     * Data to update on the user
     */
    data: Record<string, unknown>;
    /**
     * ID of the user to update
     */
    userID: string;
}

/**
 * Update data for the current user.
 * @returns a Promise that resolves to the {@link UpdateUserResult}
 */
export async function updateUser(
    input: UpdateUserInput,
): Promise<UpdateUserResult> {
    const { accessToken, data, userID } = input;

    if (!accessToken) {
        throw new ErrorWithKey('accessTokenMissing');
    }

    const client = new faunadb.Client({
        secret: accessToken,
    });

    let updateUserResult: UpdateUserResult | null = null;

    try {
        updateUserResult = await client.query(
            Update(Ref(Collection('User'), userID), { data }),
        );
    } catch (error) {
        throw new ErrorWithKey('failedToUpdateUser', error as Error);
    }

    if (updateUserResult === null) {
        throw new ErrorWithKey('failedToUpdateUser');
    }

    return updateUserResult;
}
