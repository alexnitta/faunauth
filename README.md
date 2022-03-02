# `faunauth`

> Fauna authentication tools for logging in via email (or username) and password

## Schema migrations

`faunauth` provides you with a set of FQL resources - collections, functions, indexes and roles - that will enable various authentication tasks. This is accomplished with the [fauna-schema-migrate](https://github.com/fauna-labs/fauna-schema-migrate) package, which will allow you to add these FQL resources to your existing Fauna database. This is what "schema migration" means in this context: your current database schema will be migrated to a new schema that contains the FQL resources provided by `faunauth`. This is not a data migration tool.

Note that `fauna-schema-migrate` is experimental; its README lists this disclaimer:

> This repository contains unofficial patterns, sample code, or tools to help developers build more effectively with Fauna. All Fauna Labs repositories are provided “as-is” and without support. By using this repository or its contents, you agree that this repository may never be officially supported and moved to the Fauna organization.

This means `faunuath` is also experimental; use it at your own discretion.

## Getting started

There are two kinds of tools provided by `faunauth`: schema migrations and functions. You must complete the schema migration before the functions exposed by `faunauth` will work properly.

### Step 1: add Fauna resources via schema migration

1. `npm i faunauth` to install this package
2. `npm i -D @fauna-labs/fauna-schema-migrate` to install `fauna-schema-migrate` as a dev dependency
3. `npx faunauth import` to copy over files that will be used by `fauna-schema-migrate` to complete the schema migration process. These files should be committed to version control. Note that if you are already using `fauna-schema-migrate` and you have a `/fauna` folder in your application, the `npx fauna import` command will not overwrite any existing files.
4. Using the [Fauna dashboard](https://dashboard.fauna.com/accounts/login), select your database (or create it if it doesn't yet exist). Once you have selected the database, click Security at the left and use the Keys feature to add a new key with the built-in "Admin" role. Save this key somewhere secure (i.e. in a password manager); you won't see it again.
5. In a terminal window, run `export FAUNA_ADMIN_KEY=<your_fauna_admin_key>`, using the admin key you just created. This sets the environment variable that `fauna-schema-migrate` will use to authenticate you and identify which database to apply your migrations to.
6. `npx fauna-schema-migrate run` to run `fauna-schema-migrate` interactively. The flow goes like this:
    1. Use `generate` to analyze the contents of the `/fauna` folder and determine what needs to be added to your database. The results of this analysis are saved in a new folder in `/fauna/migrations`. Review the migration that was created to make sure it looks correct.
    2. Use `apply` to apply the migration to your database.
    3. If needed, you can use `rollback` to revert your migrations.
       These commands are documented more thoroughly in the [`fauna-schema-migrate` readme](https://github.com/fauna-labs/fauna-schema-migrate#available-commands).

Your database is now ready to use with the functions exposed by `faunauth`.

### Step 2: use `faunauth` functions in your application

After completing the schema migration, you can use the `faunauth` functions in your application, for example in an ExpressJS handler:

```TypeScript
// This handler would be used in an ExpressJS route to handle login requests. You would
// typically use bodyparser to make sure responses are handled as JSON. Other frameworks will have
// slight differences in their implementations.
import { auth } from 'faunauth';

/**
 * Log in a user in with an email and password, thereby getting access to an accessToken,
 * refreshToken and user data.
 */
export const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Here is where you would validate the input or throw an error if it is invalid

        const { accessToken, refreshToken, user } = await auth.login({
            email,
            publicFaunaKey: process.env.PUBLIC_FAUNA_KEY ?? null,
            password,
        });

        // Now you can save the accessToken, refreshToken and user in a cookie or do anything else
        // you want with them.

        // Typically you'll send the data back to the client so it can use the accessToken to
        // authenticate further Fauna requests. The client will need to use the refreshToken to do a
        // token rotation when the accessToken expires.
        res.send({ accessToken, refreshToken, user });
    } catch (error) {
        res.status(400).send({ error });
    }
};

```

## Background

We recommend reading up on a few topics before using `faunauth`:

-   [The Fauna Query Language (FQL)](https://docs.fauna.com/fauna/current/api/fql/)
-   [User-defined functions (UDFs)](https://docs.fauna.com/fauna/current/learn/understanding/user_defined_functions)

The `fauna` and `tests` folders are based on examples from two Fauna blog posts:

1. [Refreshing authentication tokens in FQL](https://fauna.com/blog/refreshing-authentication-tokens-in-fql) - source code in [simple refresh blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-simple)
2. [Detecting leaked authentication tokens in FQL](https://fauna.com/blog/detecting-leaked-authentication-tokens-in-fql) - source code in [advanced refresh blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced)

The `fauna` folder contains the building blocks for reusable FQL statements that can be added to an existing Fauna database. For example, the `login` function at [./fauna/src/login.js](./fauna/src/login.js) is added to a database by running the `CreateFunction` statement in [./fauna/resources/functions/login.js](./fauna/resources/functions/login.js). This creates a or user-defined function that can later be called with a Fauna client. The `signIn` function defined at

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