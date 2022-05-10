import faunadb from 'faunadb';
import { VerifyAccountExists } from './identity';

import { errors } from './errors';
import type { UserData } from '../../types';

const q = faunadb.query;
const { Abort, Create, Collection, If } = q;

/**
 * Register a new user
 * @param password - the new user's password
 * @param data - the new user data
 * @returns a ref for the new User entity
 */
export function RegisterAccount(password: string, data: UserData) {
    const { email } = data;

    return If(
        // If the account already exists,
        VerifyAccountExists(email),
        // throw an error
        Abort(errors.userAlreadyExists),
        // If the account doesn't exist, create it
        Create(Collection('User'), {
            credentials: { password },
            data,
        }),
    );
}
