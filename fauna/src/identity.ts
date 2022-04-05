import faunadb from 'faunadb';
import type { ExprArg } from 'faunadb';

const q = faunadb.query;
const { Select, Match, Index, Get, Identify, Exists } = q;

export function VerifyAccountExists(email: ExprArg) {
    return Exists(Match(Index('users_by_email'), email));
}

export function VerifyAccountExistsByUsername(username: ExprArg) {
    return Exists(Match(Index('users_by_username'), username));
}

export function GetAccountByEmail(email: ExprArg) {
    return Get(Match(Index('users_by_email'), email));
}

export function GetAccountByUsername(username: ExprArg) {
    return Get(Match(Index('users_by_username'), username));
}

export function IdentifyAccount(email: ExprArg, password: ExprArg) {
    return Identify(Select(['ref'], GetAccountByEmail(email)), password);
}

export function IdentifyAccountByUsername(
    username: ExprArg,
    password: ExprArg,
) {
    return Identify(Select(['ref'], GetAccountByUsername(username)), password);
}
