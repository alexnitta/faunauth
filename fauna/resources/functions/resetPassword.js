import faunadb from 'faunadb';
import { ResetPasswordForAccount } from '../../src/resetPassword';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'resetPassword',
    body: Query(
        Lambda(
            ['email', 'newPassword', 'checkSecret'],
            ResetPasswordForAccount(
                Var('email'),
                Var('newPassword'),
                Var('checkSecret'),
            ),
        ),
    ),
    role: 'admin',
});
