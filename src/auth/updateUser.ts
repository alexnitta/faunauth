import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import type { UpdateUserResult } from '../types/auth';
import { errors } from '../fauna/src/errors';

const { Ref, Collection, Update } = q;

export interface UpdateUserInput {
    /**
     * A Fauna secret that was returned after authenticating the user
     */
    accessSecret: string | null;
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
    const { accessSecret, clientConfig, data, userID } = input;

    if (!accessSecret) {
        throw new Error(errors.missingAccessToken);
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret: accessSecret,
    });

    let updateUserResult: UpdateUserResult | false = false;

    try {
        updateUserResult = await client.query<UpdateUserResult>(
            Update(Ref(Collection('User'), userID), { data }),
        );
    } catch {
        throw new Error(errors.failedToUpdateUser);
    }

    if (!updateUserResult) {
        throw new Error(errors.failedToUpdateUser);
    }

    return updateUserResult;
}
