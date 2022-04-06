import faunadb from 'faunadb';
import { ChangePasswordForAccount } from '../../../src/changePassword';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'changePassword',
    body: Query(
        Lambda(
            ['email', 'oldPassword', 'newPassword'],
            ChangePasswordForAccount(
                Var('email'),
                Var('oldPassword'),
                Var('newPassword'),
            ),
        ),
    ),
    role: 'admin',
});
