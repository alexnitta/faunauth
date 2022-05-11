import faunadb from 'faunadb';
import { SetPasswordForAccount } from '../../../src/setPassword';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'setPassword',
    body: Query(
        Lambda(
            ['email', 'newPassword', 'secret'],
            SetPasswordForAccount(
                Var('email'),
                Var('newPassword'),
                Var('secret'),
            ),
        ),
    ),
    role: 'admin',
});
