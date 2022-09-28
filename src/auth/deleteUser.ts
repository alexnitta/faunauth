import faunadb, { query as q } from 'faunadb';
import type { ClientConfig } from 'faunadb';

import type { UserResult } from '../types/auth';
import { errors } from '../fauna/src/errors';

const { Ref, Collection, Delete, Get, Match, Index } = q;

export type DeleteUserInput = {
    /**
     * Fauna client config object
     */
    clientConfig?: Omit<ClientConfig, 'secret'>;
    /**
     * A Fauna secret. This can either be an accessSecret that was returned after authenticating the
     * user or a Fauna secret that has "admin" permissions.
     */
    secret: string | null;
    /**
     * Email address of the user to delete. If email is not provided, userID must be provided.
     */
    email?: string;
    /**
     * ID of the user to delete. If userID is not provided, email must be provided.
     */
    userID?: string;
};

/**
 * Delete a user.
 * @returns a Promise that resolves to the {@link UserResult} containing data for the user
 * that was just deleted.
 */
export async function deleteUser(input: DeleteUserInput): Promise<UserResult> {
    const { secret, clientConfig } = input;

    if (!secret) {
        throw new Error(errors.missingAdminKey);
    }

    const client = new faunadb.Client({
        ...clientConfig,
        secret,
    });

    let deleteUserResult: UserResult | false = false;

    if (input.userID) {
        try {
            deleteUserResult = await client.query<UserResult>(
                Delete(Ref(Collection('User'), input.userID)),
            );
        } catch {
            throw new Error(errors.failedToDeleteUser);
        }
    } else if (input.email) {
        try {
            const user = await client.query<UserResult>(
                Get(Match(Index('users_by_email'), input.email)),
            );

            deleteUserResult = await client.query<UserResult>(Delete(user.ref));
        } catch {
            throw new Error(errors.failedToDeleteUser);
        }
    } else {
        throw new Error(errors.missingEmailAndUserID);
    }

    if (!deleteUserResult) {
        throw new Error(errors.failedToDeleteUser);
    }

    return deleteUserResult;
}
