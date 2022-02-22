import faunadb from 'faunadb';
import { LoginWithUsername } from '../../src/loginWithUsername';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'loginWithUsername',
    body: Query(
        Lambda(
            ['username', 'password'],
            LoginWithUsername(Var('username'), Var('password')),
        ),
    ),
    role: 'admin',
});
