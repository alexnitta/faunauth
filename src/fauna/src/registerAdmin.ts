import faunadb from 'faunadb';
import { VerifyAccountExists } from './identity';
import { CreateTokensForAccount } from './tokens';

import { errors } from './errors';
import type { UserData } from '../../types';

const q = faunadb.query;
const { Create, Collection, If, Do } = q;

/**
 * Register a new user without confirming their email address.  This is intended for use only when
 * creating an account as an administrator. The `registerAdmin` UDF is not included in the 'public'
 * role, so this function can only be called with an admin key.
 * @param password - the new user's password
 * @param data - the new user data
 * @returns a ref for the new User entity
 */
export function RegisterAccountAdmin(
    password: string,
    email: string,
    data: UserData,
) {
    return If(
        // If the account already exists,
        VerifyAccountExists(email),
        // return an error
        {
            error: errors.userAlreadyExists,
        },
        Do(
            // If the account doesn't exist, create it and return a new pair of access/refresh
            // tokens
            Create(Collection('User'), {
                credentials: { password },
                data,
            }),
            CreateTokensForAccount(email),
        ),
    );
}
