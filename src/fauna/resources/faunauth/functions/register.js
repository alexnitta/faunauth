import faunadb from 'faunadb';
import { RegisterAccount } from '../../../src/register';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'register',
    body: Query(
        Lambda(
            ['password', 'email', 'data'],
            RegisterAccount(Var('password'), Var('email'), Var('data')),
        ),
    ),
    role: 'server',
});
