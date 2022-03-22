# `faunauth`

This library helps you add email-based authentication to your [Fauna](https://fauna.com/) database - in other words, the user's email address will be used to confirm their identity. This means you can support three login patterns:

1. Log in with email and password
2. Log in with username and password. In this case, the username is used to look up the user and their email address.
3. Log in via a "magic link" sent to the user's email address

Note that if you want your users to be able to log in with a username, they must register with both an email address and username.

## Caveats

Before using this library, you should understand the different options available for authentication in Fauna. You can configure [external authentication](https://docs.fauna.com/fauna/current/security/external/) via an identity provider like [Auth0](https://auth0.com/), and this might be a good choice for your needs. On the other hand, if you wish to use the internal Fauna authentication features, then this library will allow you to add them to your database.

This library is built on top of [fauna-schema-migrate](https://github.com/fauna-labs/fauna-schema-migrate). Note that `fauna-schema-migrate` is experimental; its README lists this disclaimer:

> This repository contains unofficial patterns, sample code, or tools to help developers build more effectively with Fauna. All Fauna Labs repositories are provided “as-is” and without support. By using this repository or its contents, you agree that this repository may never be officially supported and moved to the Fauna organization.

This means `faunauth` is also experimental; use it at your own discretion.

You are likely using Fauna because you want to take advantage of its [GraphQL API](https://docs.fauna.com/fauna/current/api/graphql/). At this point, `fauna-schema-migrate` does not provide integration with resources defined in a GraphQL schema (this [might be added at some point](https://github.com/fauna-labs/fauna-schema-migrate#potential-extensions)). This means you cannot use `fauna-schema-migrate` to refer to indexes or collections created via GraphQL schemas. The one place this really matters is when provisioning a user role in order to grant access to your resources from your GraphQL schema. To help with this, you can create a script that calls the [createOrUpdateUserRole](./docs/index.md#createorupdateuserrole) utility function - more on this below.

## Documentation

Auto-generated documentation is available in [./docs/index.md](./docs/index.md).

## Resources

It's a good idea to read up on a few topics before using `faunauth`:

-   [The Fauna Query Language (FQL)](https://docs.fauna.com/fauna/current/api/fql/)
-   [User-defined functions (UDFs)](https://docs.fauna.com/fauna/current/learn/understanding/user_defined_functions)

The `fauna` and `tests` folders are based on examples from two Fauna blog posts:

1. [Refreshing authentication tokens in FQL](https://fauna.com/blog/refreshing-authentication-tokens-in-fql) - source code in [simple refresh blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-simple)
2. [Detecting leaked authentication tokens in FQL](https://fauna.com/blog/detecting-leaked-authentication-tokens-in-fql) - source code in [advanced refresh blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced)

The `fauna` folder contains the building blocks for reusable FQL statements that can be added to an existing Fauna database. For example, the `login` function at [./fauna/src/login.js](./fauna/src/login.js) is added to a database by running the `CreateFunction` statement in [./fauna/resources/functions/login.js](./fauna/resources/functions/login.js). This creates a UDF or user-defined function that can later be called with a Fauna client, which is done within [./src/auth/login](./src/auth/login.ts).

## About schema migrations

`faunauth` provides you with a set of FQL resources - collections, functions, indexes and roles - that will enable various authentication tasks. In this context, "schema migration" means that your current database schema will be migrated to a new schema that contains the FQL resources provided by `faunauth`. As noted in the `fauna-schema-migrate` readme, this is not a data migration tool.

## Getting started

There are two kinds of tools provided by `faunauth`: schema migrations and functions. You must complete the schema migration before the functions exposed by `faunauth` will work properly. The `faunauth` CLI tool will help you accomplish this.

1. Add Fauna resources via schema migration

    1. `npm i faunauth` to install this package
    2. `npm i -D @fauna-labs/fauna-schema-migrate` to install `fauna-schema-migrate` as a dev dependency
    3. `npx faunauth init` to copy over files that will be used by `fauna-schema-migrate` to complete the schema migration process. These files should be committed to version control. They will be copied over to your project at `fauna/src` and `fauna/resources/faunauth`. Note that the `npx faunauth init` command will not overwrite any existing files - if you see output indicating that any of the files already exist, you will need to delete or rename your existing files and run `npx faunauth init` again.
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

    1. If you are not declaring your non-user resources with a GraphQL schema, you can add your own files to the `/fauna` folder in order to use `fauna-schema-migrate` with them. You must do the following:
        - add FQL or JS files to `/fauna` for all of your database resources (collections, indexes, roles)
        - add an FQL or JS file to `/fauna` to define a role that grants privileges to the `User` document for accessing your non-user resources
    2. If you are declaring your resources with a GraphQL schema, or don't want to manage your non-user resources with `fauna-schema-migrate` there's a utility function called `createOrUpdateUserRole` that will help with this; see the docs [here](./docs/index.md#createorupdateuserrole).

4. Use `faunauth` functions in your server-side code
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

            // Here is where you would save the refreshToken in a session cookie.

            // Send the `accessToken` and `user` back to the client so it can use the `accessToken`
            // to authenticate requests against the Fauna GraphQL endpoint
            res.send({ accessToken, user });
        } catch (error) {
            res.status(400).send({ error });
        }
    };

    ```

## Confirming a user's identity

As with any other email-based authentication system, there is are a few steps involved when confirming a user's identity. Generally, these steps are as follows:

1. User states a wish to authenticate by attempting to sign up for a new account, reset the password for an existing account, or login via a "magic link" for an existing account.
2. A confirmation email is sent to the provided email address that contains a link. The link leads to a page on your site. You pass this in as the `callbackUrl` and faunauth appends a URL search parameter to it called `data` that contains both the email address and a unique token created in order to confirm the user's identity.
3. Your code calls a faunauth function that checks if the token is valid, i.e. the token exists, is associated with the given email address, and has not already been used. If the token is valid, the rest of the authentication flow is allowed to proceed.

As part of these user flows, you will need to expose a page within your app at the `callbackUrl` that you pass in. A URL search parameter called `data` will be appended to the callback URL which will include a Base64-encoded string containing an object with the email and token. Your app needs to read the `data` param, decode the email and token from it, and pass them to the appropriate `faunauth` function to complete the user flow.

Here's how you would parse the encoded `data` URL search parameter:

```TypeScript
const search = window.location.search // if you're using react-router, you can do useLocation().search
const urlQuery = new URLSearchParams(search);
const data = urlQuery.get('data');

try {
    const { email, token } = JSON.parse(atob(data));
} catch {
    // could not read data from URL
}
```

Here are the three user flows that implement this pattern:

### Sign up a new user

1. The new user visits your sign up page and enters an email and password into a form. You may include an optional username field to allow your users to log in with a username and password. Your frontend app hits an API endpoint that calls the [`register`](./docs/index.md#register) function, which creates an entity in the User collection, creates a email confirmation token for that entity, and sends the confirmation email as described above.
2. The new user opens the confirmation email and clicks the link, which opens the callback URL with the added `data` URL parameter. Your frontend app must decode the `email` and `token` from this `data` parameter, as shown above, then hit an API endpoint that calls the [`setPassword`](./docs/index.md#resetpassword) function. This function returns an object containing the `accessToken`, `refreshToken` and `user` object. The endpoint should set the `refreshToken` on a session cookie and return the `accessToken` and `user` data back to the frontend.
3. You frontend should store a reference to the `accessToken` and `user` data, then redirect the user as appropriate, usually to the main dashboard of the app. The `accessToken` should be included in an Authorization header as the `Bearer ${accessToken}` when making requests at the Fauna GraphQL endpoint.

### Reset a password

1. An existing user visits your password reset page and enters the email address they registered previously with. Your frontend app hits an API endpoint that calls the [`sendConfirmationEmail`](./docs/index.md#sendconfirmationemail) function, which creates an email confirmation token for the User entity that matches the given email address and sends the confirmation email as described above.

Step 2 and 3 are the same as when signing up a new user.

### Sign in with magic link

1. An existing user visits your sign in page and enters the email address they registered previously with. Your frontend app hits an API endpoint that calls the [`sendConfirmationEmail`](./docs/index.md#sendconfirmationemail) function, which creates an email confirmation token for the User entity that matches the given email address and sends the confirmation email as described above.
2. The new user opens the confirmation email and clicks the link, which opens the callback URL with the added `data` URL parameter. Your frontend app must decode the `email` and `token` from this `data` parameter, as shown above, then hit an API endpoint that calls the [`loginWithMagicLink`](./docs/index.md#loginwithmagiclink) function. This function returns an object containing the `accessToken`, `refreshToken` and `user` object. The endpoint should set the `refreshToken` on a session cookie and return the `accessToken` and `user` data back to the frontend.

Step 3 is the same as when signing up a new user.

## Token rotation

Access tokens expire in 10 minutes. When a request to the Fauna GraphQL endpoint fails due to an expired token, your frontend app should hit an API endpoint that calls the [`rotateTokens`](./docs/index.md#rotatetokens) function. This function takes the `refreshToken` and uses it to get a new pair of `accessToken` and `refreshToken` values. Your endpoint handler should set the new `refreshToken` on the session cookie so that they can be used in the future to repeat the token rotation process. It should return the `accessToken` to the frontend app so that it can be used to authenticate requests made to the Fauna GraphQL endpoint.

## Sending emails

When calling either the `register` or `sendConfirmationEmail` functions, you have two options for sending the user an email that will confirm their identity:

1. Pass an input that conforms to [AuthInputWithEmailTemplate](./docs/interfaces/AuthInputWithEmailTemplate.md) in order to use the built-in faunauth email template. When using this method, you provide a config object that includes details about the styles and locale (text content) for the email, as well as an async function that will be called to send the email. Typically this function will be a wrapper around something like [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail).
2. Pass an input that confirms to [AuthInputWithCustomEmail](./docs/interfaces//AuthInputWithCustomEmail.md) in order to provide your own email template logic. When using this method, you also need to provide an async function that sends the email, similarly to the function passed when using the faunauth email template. However, the only input to this email sending function is the final callback URL; you are responsible for actually building the rest of the email including all styling and locale (text content).

## Error handling

To help your consuming application make use of errors, we use a class called `ErrorWithKey` that extends from the usual JavaScript `Error`. This class has a `.key` property that functions as a unique key for the particular reason the error ocurred. This allows you to set up internationalization logic that uses the error's `.key` property to look up a user-facing message based on the current locale. Each of these errors also has the normal `.message` property that displays an error message in the English (United States) locale, which you can display if you so choose as a default option. The type definition for these keys is exposed in the types as `ErrorKey`.
