import faunadb from 'faunadb';
import { LoginWithMagicLink } from '../../../src/loginWithMagicLink';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'loginWithMagicLink',
    body: Query(
        Lambda(
            ['email', 'token'],
            LoginWithMagicLink(Var('email'), Var('token')),
        ),
    ),
    role: 'admin',
});
