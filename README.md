# `faunauth`

> Fauna authentication tools for logging in via email (or username) and password

## Workflow

`faunauth` provides you with a set of FQL resources - collections, functions, indexes and roles - that will enable various authentication tasks. This is accomplished with the experimental [fauna-schema-migrate](https://github.com/fauna-labs/fauna-schema-migrate) tool, which will allow you to add these FQL resources to your existing Fauna database. This is what "schema migration" means in this context: your current database schema will be migrated to a new schema that contains the FQL resources provided by `faunauth`.

## Getting started

1. `npm i faunauth` to install this package
2. `npm i -D @fauna-labs/fauna-schema-migrate` to install `fauna-schema-migrate` as a dev dependency
3. `npx faunauth import` to copy over files that will be used by `fauna-schema-migrate` to complete the schema migration process. These files should be committed to version control. Note that if you are already using `fauna-schema-migrate` and you have a `/fauna` folder in your application, the `npx fauna import` command will not overwrite any existing files.

## Background

We recommend reading up on a few topics before using `faunauth`:

-   [The Fauna Query Language (FQL)](https://docs.fauna.com/fauna/current/api/fql/)
-   [User-defined functions (UDFs)](https://docs.fauna.com/fauna/current/learn/understanding/user_defined_functions)

The `fauna` and `tests` folders are based on examples from two Fauna blog posts:

1. [Refreshing authentication tokens in FQL](https://fauna.com/blog/refreshing-authentication-tokens-in-fql) - source code in [simple refresh blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-simple)
2. [Detecting leaked authentication tokens in FQL](https://fauna.com/blog/detecting-leaked-authentication-tokens-in-fql) - source code in [advanced refresh blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced)

The `fauna` folder contains the building blocks for reusable FQL statements that can be added to an existing Fauna database. For example, the `login` function at [./fauna/src/login.js](./fauna/src/login.js) is added to a database by running the `CreateFunction` statement in [./fauna/resources/functions/login.js](./fauna/resources/functions/login.js). This creates a or user-defined function that can later be called with a Fauna client.

To augment a database with the FQL statements provided by `faunauth`, you must use

Here is an example of a function that calls the `login` UDF. This example function would typically be used in an API endpoint to allow the client-side application to log a user in.

```TypeScript
import faunadb, { query as q } from 'faunadb';

interface LoginInput {
    /**
     * Email address for the user who wants to log in
     */
    email: string;
    /**
     * A Fauna secret that is limited to permissions needed for public actions when creating users,
     * logging in and resetting passwords
     */
    publicFaunaKey: string | null;
    /**
     * Password to use
     */
    password: string;
}

/**
 * Logs a user in.
 */
export async function login(input: LoginInput): Promise<FaunaLoginResult | null> {
    const { publicFaunaKey, password } = input;

    const client = new faunadb.Client({
        secret: publicFaunaKey,
    });

    // The FaunaLoginResult will contain the access and refresh tokens, as well the user ID and any
    // other user data.

    return client.query<FaunaLoginResult | null>(
        // This is the UDF provided by faunauth, which has been added to the database via
        // fauna-schema-migrate
        q.Call('login', email, password),
    );
}

```

#### Starting from a new database

When starting from a new database, steps to get set up are:

-   delete existing migrations within packages/stories/fauna/migrations
-   create a new Admin key in the Fauna dashboard; save the key to a password manager
-   save the Admin key in packages/stories/.env.local under the `FAUNA_ADMIN_KEY` variable
-   run `export FAUNA_ADMIN_KEY=<key>` to set the environment variable in your terminal
-   run `npx fauna-schema-migrate run` to start up Fauna Schema Migrate
-   select the `generate` option to create migrations
-   select the `apply` option to apply migrations, which include the migration that creates the `public` role type
-   run `yarn create-public-key` to create a key with the `public` role type; save the key to a password manager
-   copy the public key and use it within your client-side application

## Scripts

-   `yarn check-types`: runs `tsc` to validate TypeScript files, but does not generate any output.
-   `yarn create-public-key`: creates a FaunaDB key appropriately scoped for signing up / signing in a user, and reveals the key in the terminal

## Error handling

To help your consuming application make use of errors, we use a class called `ErrorWithKey` that extends from the usual JavaScript `Error`. This class has a `.key` property that functions as a unique key for the particular reason the error ocurred. This allows you to set up internationalization logic that uses the error's `.key` property to look up a user-facing message based on the current locale. Each of these errors also has the normal `.message` property that displays an error message in the English (United States) locale, which you can display if you so choose as a default option. The type definition for these keys is exposed in the types as `ErrorKey`.
