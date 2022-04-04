import faunadb from 'faunadb';

const q = faunadb.query;
const { Select, Match, Index, Get, Identify, Exists } = q;

export function VerifyAccountExists(email: string) {
    return Exists(Match(Index('users_by_email'), email));
}

export function VerifyAccountExistsByUsername(username: string) {
    return Exists(Match(Index('users_by_username'), username));
}

export function GetAccountByEmail(email: string) {
    return Get(Match(Index('users_by_email'), email));
}

export function GetAccountByUsername(username: string) {
    return Get(Match(Index('users_by_username'), username));
}

export function IdentifyAccount(email: string, password: string) {
    return Identify(Select(['ref'], GetAccountByEmail(email)), password);
}

export function IdentifyAccountByUsername(username: string, password: string) {
    return Identify(Select(['ref'], GetAccountByUsername(username)), password);
}
