import faunadb from 'faunadb';
import { VerifyAccountExists } from './identity';
import { UserData } from '../../types';
import { errors } from './errors';

const q = faunadb.query;
const { Abort, Create, Collection } = q;

/**
 * Create a new user account.
 * @param password - password to use for the new user
 * @param userData - user data to store in the document
 */
export function RegisterAccount(password: string, data: UserData) {
    if (VerifyAccountExists(data.email)) {
        return Abort(errors.userAlreadyExists);
    }

    return Create(Collection('User'), {
        credentials: { password },
        data,
    });
}
