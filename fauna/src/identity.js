import faunadb from 'faunadb';

const q = faunadb.query;
const { Select, Match, Index, Get, Identify, Exists } = q;

export function VerifyAccountExists(email) {
    return Exists(Match(Index('users_by_email'), email));
}

export function VerifyAccountExistsByUsername(username) {
    return Exists(Match(Index('users_by_username'), username));
}

export function GetAccountByEmail(email) {
    return Get(Match(Index('users_by_email'), email));
}

export function GetAccountByUsername(username) {
    return Get(Match(Index('users_by_username'), username));
}

export function IdentifyAccount(email, password) {
    return Identify(Select(['ref'], GetAccountByEmail(email)), password);
}

export function IdentifyAccountByUsername(username, password) {
    return Identify(Select(['ref'], GetAccountByUsername(username)), password);
}
