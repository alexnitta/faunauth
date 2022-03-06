# `faunauth`

> Add authentication to your [Fauna](https://fauna.com/) database

## Caveats

Before using this library, you should understand the different options available for authentication in Fauna. You can configure [external authentication](https://docs.fauna.com/fauna/current/security/external/) via an identity provider like [Auth0](https://auth0.com/), and this might be a good choice for your needs. On the other hand, if you wish to use the internal Fauna authentication features, then this library will allow you to add them to your database.

This library is built on top of [fauna-schema-migrate](https://github.com/fauna-labs/fauna-schema-migrate). Note that `fauna-schema-migrate` is experimental; its README lists this disclaimer:

> This repository contains unofficial patterns, sample code, or tools to help developers build more effectively with Fauna. All Fauna Labs repositories are provided “as-is” and without support. By using this repository or its contents, you agree that this repository may never be officially supported and moved to the Fauna organization.

This means `faunauth` is also experimental; use it at your own discretion.

You are likely using Fauna because you want to take advantage of its [GraphQL API](https://docs.fauna.com/fauna/current/api/graphql/). At this point, `fauna-schema-migrate` does not provide integration with resources defined in a GraphQL schema (this [might be added at some point](https://github.com/fauna-labs/fauna-schema-migrate#potential-extensions)). This means you cannot use `fauna-schema-migrate` to refer to indexes or collections created via GraphQL schemas. The one place this really matters is when provisioning a user role in order to grant access to your resources from your GraphQL schema. To help with this, you can create a script that calls the [createOrUpdateUserRole](./docs/index.md#createorupdateuserrole) utility function - more on this below.

## Documentation

Auto-generated documentation is available in [./docs/index.md](./docs/index.md).

## About schema migrations

`faunauth` provides you with a set of FQL resources - collections, functions, indexes and roles - that will enable various authentication tasks. In this context, "schema migration" means that your current database schema will be migrated to a new schema that contains the FQL resources provided by `faunauth`. As noted in the `fauna-schema-migrate` readme, this is not a data migration tool.

## Getting started

There are two kinds of tools provided by `faunauth`: schema migrations and functions. You must complete the schema migration before the functions exposed by `faunauth` will work properly. The `faunauth` CLI tool will help you accomplish this.

1. Add Fauna resources via schema migration

    1. `npm i faunauth` to install this package
    2. `npm i -D @fauna-labs/fauna-schema-migrate` to install `fauna-schema-migrate` as a dev dependency
    3. `npx faunauth init` to copy over files that will be used by `fauna-schema-migrate` to complete the schema migration process. These files should be committed to version control. Note that if you are already using `fauna-schema-migrate` and you have a `/fauna` folder in your application, the `npx faunauth init` command will not overwrite any existing files - you will need to rename your existing files and run `npx faunauth init` again.
    4. Using the [Fauna dashboard](https://dashboard.fauna.com/accounts/login), select your database (or create it if it doesn't yet exist). Once you have selected the database, click Security at the left and use the Keys feature to add a new key with the built-in "Admin" role. Save this key somewhere secure (i.e. in a password manager); you won't see it again.
    5. In a terminal window, run `export FAUNA_ADMIN_KEY=<your_fauna_admin_key>`, using the admin key you just created. This sets the environment variable that `fauna-schema-migrate` will use to authenticate you and identify which database to apply your migrations to. If you are using something other than the "Classic" region group, you will need to also run `export FAUNADB_DOMAIN=<domain>` using the domain for your region group. As an example, the command for the US region group is: `export FAUNADB_DOMAIN="db.us.fauna.com"`. Other `domain` values are listed [here](https://docs.fauna.com/fauna/current/learn/understanding/region_groups).
    6. Run `npx fauna-schema-migrate generate` to analyze the contents of the `/fauna` folder and determine what needs to be added to your database. The results of this analysis are saved in a new folder in `/fauna/migrations`. Review the migration that was created to make sure it looks correct.
    7. Use `npx fauna-schema-migrate apply` to apply the migration to your database.
    8. If needed, you can use `npx fauna-schema-migrate rollback` to revert your migrations.

    The `fauna-schema-migrate` commands are documented more thoroughly in the [`fauna-schema-migrate` readme](https://github.com/fauna-labs/fauna-schema-migrate#available-commands).

    Your database now includes the resources exposed by `faunauth`.

2. Create a public Fauna key for your client application

    1. If your terminal does not yet have the FAUNA_ADMIN_KEY environment variable set, run: `export FAUNA_ADMIN_KEY=<your_fauna_admin_key>` with the admin key you created in step 1 above.
    2. `npx faunauth create-public-key` to create a key for the role named "public" and print it to the console. This role is created during schema migration, so you will see an error if you have not completed Step 1. If you are using a region group other than "Classic", you need to provide it after the `-r` flag, like this: `npx faunauth create-public-key -r us`. Run `npx faunauth create-public-key --help` to see other options.

    This public key has limited permissions that are appropriate for un-authenticated users, i.e. user registration, login, and resetting passwords. It is safe to store in the browser in your client-side code and your client will need to provide it to your server when calling the various `faunauth` functions in Step 3 below.

3. Add a role so that users can access your resources
   Fauna does not allow access to a resource unless it is specifically granted. You have two options for this:

    - If you are not declaring your non-user resources with a GraphQL schema, you can add your own files to the `/fauna` folder in order to use `fauna-schema-migrate` with them. You must do the following:
        - add FQL or JS files to `/fauna` for all of your database resources (collections, indexes, roles)
        - add an FQL or JS file to `/fauna` to define a role that grants privileges to the `User` document for accessing your non-user resources
    - If you are declaring your resources with a GraphQL schema, or don't want to manage your non-user resources with `fauna-schema-migrate` there's a utility function called `createOrUpdateUserRole` that will help with this; see the docs [here](./docs/index.md#createorupdateuserrole).

4. Use `faunauth` functions in your server application
   After completing the schema migration, you can use the `faunauth` functions in your server. Complete documentation is available in [./docs/modules.md#functions](./docs/modules.md#functions).

    Here's an example of how you might use the `login` function from `faunauth` in an [Express](https://expressjs.com/) handler. Note that `faunauth` is framework-agnostic; it will work in any backend JavaScript framework.

    ```TypeScript
    // This handler would be used in an Express route to handle login requests. You would
    // typically use bodyparser to make sure responses are handled as JSON.
    // Other frameworks will have slight differences in their implementations.
    import { login } from 'faunauth';

    /**
     * Log in a user in with an email and password, thereby getting access to an accessToken,
     * refreshToken and user data.
     */
    export const loginHandler = async (req, res) => {
        // The `publicFaunaKey` should be created using the faunauth CLI as described above.
        // Your client-side application will need to store this public key in the browser and send
        // it to the server for various un-authenticated requests.
        const { email, password, publicFaunaKey } = req.body;

        try {
            // Here is where you would validate the input or throw an error if it is invalid

            const { accessToken, refreshToken, user } = await login({
                email,
                password,
                publicFaunaKey,
            });

            // Now you can save the accessToken, refreshToken and user in a session cookie.

            // Typically you'll send the data back to the client so it can use the accessToken to
            // authenticate further Fauna requests. The client will need to use the refreshToken to do a
            // token rotation when the accessToken expires.
            res.send({ accessToken, refreshToken, user });
        } catch (error) {
            res.status(400).send({ error });
        }
    };

    ```

## Error handling

To help your consuming application make use of errors, we use a class called `ErrorWithKey` that extends from the usual JavaScript `Error`. This class has a `.key` property that functions as a unique key for the particular reason the error ocurred. This allows you to set up internationalization logic that uses the error's `.key` property to look up a user-facing message based on the current locale. Each of these errors also has the normal `.message` property that displays an error message in the English (United States) locale, which you can display if you so choose as a default option. The type definition for these keys is exposed in the types as `ErrorKey`.

## Background

It's a good idea to read up on a few topics before using `faunauth`:

-   [The Fauna Query Language (FQL)](https://docs.fauna.com/fauna/current/api/fql/)
-   [User-defined functions (UDFs)](https://docs.fauna.com/fauna/current/learn/understanding/user_defined_functions)

The `fauna` and `tests` folders are based on examples from two Fauna blog posts:

1. [Refreshing authentication tokens in FQL](https://fauna.com/blog/refreshing-authentication-tokens-in-fql) - source code in [simple refresh blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-simple)
2. [Detecting leaked authentication tokens in FQL](https://fauna.com/blog/detecting-leaked-authentication-tokens-in-fql) - source code in [advanced refresh blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced)

The `fauna` folder contains the building blocks for reusable FQL statements that can be added to an existing Fauna database. For example, the `login` function at [./fauna/src/login.js](./fauna/src/login.js) is added to a database by running the `CreateFunction` statement in [./fauna/resources/functions/login.js](./fauna/resources/functions/login.js). This creates a UDF or user-defined function that can later be called with a Fauna client, which is done within [./src/auth/login](./src/auth/login.ts).
