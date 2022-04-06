import { Maybe } from './general';

export interface CollectionQueryResult<Data> {
    ref: import('faunadb').Expr;
    ts: number;
    data: Data;
}

export interface CollectionQueryResultMap<Data> {
    data: CollectionQueryResult<Data>[];
}

export interface TokenQueryResult {
    ref: import('faunadb').Expr;
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
    // eslint-disable-next-line camelcase
    hashed_secret: string;
}

export interface TokenCollectionQueryResult {
    data: TokenQueryResult[];
}

export interface TokenResult {
    ref: import('faunadb').Expr;
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

export interface ClientLoginResult {
    /**
     * A token that can be used to authenticate further requests against the FaunaDB API. Fauna's
     * docs refer to this as a 'secret'; from the client perspective it's a JWT.
     */
    accessToken: string;
    /**
     * Details for the user that was signed in
     */
    user: UserData;
}

/**
 * When logging in within an API route, we have access to the refresh token.
 */
export interface ServerLoginResult extends ClientLoginResult {
    /**
     * A token that can be used to refresh the access token. Fauna's docs refer to this as a
     * 'secret'; from the client perspective it's a JWT.
     */
    refreshToken: string;
}

export interface TokenPair {
    /**
     * A token that can be used to authenticate further requests against the FaunaDB API. Fauna's
     * docs refer to this as a 'secret'; from the client perspective it's a JWT.
     */
    accessToken: string;
    /**
     * A token that can be used to refresh the access token. Fauna's docs refer to this as a
     * 'secret'; from the client perspective it's a JWT.
     */
    refreshToken: string;
}

export interface UserData {
    /**
     * The user ID - this is auto-generated when the user is created in Fauna.
     */
    id?: string;
    /**
     * True when this user's email address has been confirmed after signing up. This is not set to
     * false if a user requests a password reset.
     */
    confirmedEmail: boolean;
    /**
     * Any other details about the user
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
    ref: import('faunadb').Expr;
}

export interface Token<Data> {
    ref: import('faunadb').Expr;
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
