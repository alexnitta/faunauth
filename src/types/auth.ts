import { Maybe } from './general';

export interface CollectionQueryResult<Data> {
    ref: import('faunadb').values.Ref;
    ts: number;
    data: Data;
}

export interface CollectionQueryResultMap<Data> {
    data: CollectionQueryResult<Data>[];
}

export interface TokenQueryResult {
    ref: import('faunadb').values.Ref;
    ts: number;
    instance: import('faunadb').Expr;
    data: {
        type: string;
        email?: string;
        used: boolean;
        loggedOut?: boolean;
    };
    ttl: {
        '@ts': string;
    };
    // eslint-disable-next-line camelcase
    hashed_secret: string;
}
export interface TokenCollectionQueryResult {
    data: TokenQueryResult[];
}

export interface TokenResult {
    ref: import('faunadb').values.Ref;
    ts: number;
    instance: import('faunadb').Expr;
    data: {
        type: string;
        email?: string;
        used: boolean;
    };
    ttl: {
        '@ts': string;
    };
    secret: string;
}

/**
 * https://docs.fauna.com/fauna/current/api/fql/functions/createkey?lang=javascript
 */
export interface CreateKeyResult<Data> {
    database: import('faunadb').values.Ref;
    ref: import('faunadb').values.Ref;
    role: string;
    instance: import('faunadb').Expr;
    data: Data;
    name: string;
    ts: number;
    secret: string;
    // eslint-disable-next-line camelcase
    hashed_secret: string;
}

export interface FaunaLoginResult {
    tokens: {
        access: TokenResult;
        refresh: TokenResult;
    };
    account: CollectionQueryResult<UserData>;
    id: string;
}

export interface FaunaRefreshResult {
    tokens: {
        access: TokenResult;
        refresh: TokenResult;
    };
    account: CollectionQueryResult<UserData>;
}

/**
 * A ClientLoginResult only exposes the accessSecret so that a malicious actor cannot acquire new
 * tokens by stealing a refreshSecret from the browser's local persistence.
 */
export interface ClientLoginResult {
    /**
     * A token that can be used to authenticate further requests against the public Fauna APIs.
     * Fauna's docs refer to this as a 'secret'; from the client perspective it's a JWT.
     */
    accessSecret: string;
    /**
     * Details for the user that was signed in
     */
    user: UserData;
}

/**
 * A ServerLoginResult exposes both the accessSecret and the refreshSecret so they can be stored in
 * a secure, HTTP-only session cookie, and later used to acquire new tokens.
 */
export interface ServerLoginResult extends ClientLoginResult {
    /**
     * A secret that can be used to acquire a new pair of accessSecret / refreshSecret values.
     * Fauna's docs refer to this as a 'secret'; from the client perspective it's a JWT.
     */
    refreshSecret: string;
}

export interface TokenPair {
    /**
     * A secret that can be used to authenticate further requests against the public Fauna APIs.
     * Fauna's docs refer to this as a 'secret'; from the client perspective it's a JWT.
     */
    accessSecret: string;
    /**
     * A secret that can be used to acquire a new pair of accessSecret / refreshSecret values.
     * Fauna's
     * docs refer to this as a 'secret'; from the client perspective it's a JWT.
     */
    refreshSecret: string;
}

export interface UserData {
    /**
     * The user ID - this is auto-generated when the user is created in Fauna.
     */
    id: string;
    /**
     * True when this user's email address has been confirmed after signing up. This is not set to
     * false if a user requests a password reset.
     */
    confirmedEmail: boolean;
    /**
     * Any other application-specific details about the user
     */
    details: Record<string, string | number | boolean | null>;
    /**
     * Email address for the user. This is lower-cased during account creation and when signing the
     * user in, so it is not case-sensitive.
     */
    email: string;
    /**
     * User's preferred locale code, like 'en-US'
     */
    locale: string;
    /**
     * Optional username for the user. By default, users are signed up by using their email address
     * as a unique identifier. It's also possible to define a username when signing up so that the
     * user can login via a username.
     */
    username: Maybe<string>;
}

export interface UpdateUserResult {
    data: UserData;
    ts: number;
    ref: import('faunadb').values.Ref;
}

export interface Token<Data> {
    ref: import('faunadb').values.Ref;
    ts: number;
    instance: import('faunadb').Expr;
    data: Data;
    ttl: import('faunadb').Expr;
    secret: string;
}

export interface FaunaGraphQLResponse<TData> {
    errors?: import('graphql').GraphQLError[];
    data?: TData;
}

export interface CreateTokenResult {
    account: CollectionQueryResult<UserData>;
    token: Token<{ type: string; email: string }>;
}

export interface AnomalyError {
    code: string;
    message: string;
}

export interface AnomalyData {
    account: UserData;
    action: string;
    error: AnomalyError;
    token: Token<{ type: string; email: string }>;
}

export interface Anomaly {
    data: AnomalyData;
}

export interface User {
    data: UserData;
}

export type AnomalyCollectionQueryResult = CollectionQueryResult<Anomaly[]>;

export type UserCollectionQueryResult = CollectionQueryResult<User[]>;

export type RefreshResult = false | FaunaLoginResult | AnomalyError;
