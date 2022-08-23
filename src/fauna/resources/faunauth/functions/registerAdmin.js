import faunadb from 'faunadb';
import { RegisterAccountAdmin } from '../../../src/registerAdmin';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'registerAdmin',
    body: Query(
        Lambda(
            ['password', 'email', 'data'],
            RegisterAccountAdmin(Var('password'), Var('email'), Var('data')),
        ),
    ),
    role: 'admin',
});
