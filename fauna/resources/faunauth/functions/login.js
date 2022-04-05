import faunadb from 'faunadb';
import { Login } from '../../../src/login';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'login',
    body: Query(
        Lambda(['email', 'password'], Login(Var('email'), Var('password'))),
    ),
    role: 'admin',
});
