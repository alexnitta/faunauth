import faunadb from 'faunadb';
import { SetPasswordForAccountAdmin } from '../../../src/setPasswordAdmin';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'setPasswordAdmin',
    body: Query(
        Lambda(
            ['email', 'newPassword'],
            SetPasswordForAccountAdmin(Var('email'), Var('newPassword')),
        ),
    ),
    role: 'admin',
});
