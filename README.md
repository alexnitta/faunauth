# `@storybox/faunauth`

> FaunaDB authentication tools

## Prior Art

The `fauna` and `tests` folders are based on examples from this blog post: [Refreshing authentication tokens in FQL](https://fauna.com/blog/refreshing-authentication-tokens-in-fql) and this blog post: [Detecting leaked authentication tokens in FQL](https://fauna.com/blog/detecting-leaked-authentication-tokens-in-fql). Note that we are using the [advanced refresh blueprint](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced) from the second blog post.

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
