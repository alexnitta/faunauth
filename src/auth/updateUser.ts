import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import { errors } from '../utils';
import type { UpdateUserResult } from '../types/auth';

const { Ref, Collection, Update } = q;

export interface UpdateUserInput {
    /**
     * A Fauna secret that was returned after authenticating the user
     */
    accessToken: string | null;
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
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
    const { accessToken, clientConfig, data, userID } = input;

    if (!accessToken) {
        throw new Error(errors.missingAccessToken);
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: accessToken,
    });

    let updateUserResult: UpdateUserResult | null = null;

    try {
        updateUserResult = await client.query(
            Update(Ref(Collection('User'), userID), { data }),
        );
    } catch {
        throw new Error(errors.failedToUpdateUser);
    }

    if (updateUserResult === null) {
        throw new Error(errors.failedToUpdateUser);
    }

    return updateUserResult;
}
