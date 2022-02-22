import faunadb from 'faunadb';
import { CreateEmailConfirmationTokenForAccount } from '../../src/emailConfirmation';

const q = faunadb.query;
const { Query, Lambda, CreateFunction, Var } = q;

export default CreateFunction({
    name: 'createEmailConfirmationToken',
    body: Query(
        Lambda(['email'], CreateEmailConfirmationTokenForAccount(Var('email'))),
    ),
    role: 'admin',
});
