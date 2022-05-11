import faunadb from 'faunadb';
import { LoginWithMagicLink } from '../../../src/loginWithMagicLink';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'loginWithMagicLink',
    body: Query(
        Lambda(
            ['email', 'secret'],
            LoginWithMagicLink(Var('email'), Var('secret')),
        ),
    ),
    role: 'admin',
});
