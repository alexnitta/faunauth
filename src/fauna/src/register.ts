import faunadb from 'faunadb';
import { VerifyAccountExists } from './identity';

import { errors } from './errors';
import type { UserData } from '../../types';

const q = faunadb.query;
const { Abort, Create, Collection } = q;

/**
 * Register a new user
 * @param password - the new user's password
 * @param data - the new user data
 * @returns a ref for the new User entity
 */
export function RegisterAccount(password: string, data: UserData) {
    const { email } = data;

    if (VerifyAccountExists(email)) {
        return Abort(errors.userAlreadyExists);
    }

    return Create(Collection('User'), {
        // credentials is a special field, the contents will never be returned
        // and will be encrypted. { password: ... } is the only format it currently accepts.
        credentials: { password },
        // everything you want to store in the document should be scoped under 'data'
        data,
    });
}
