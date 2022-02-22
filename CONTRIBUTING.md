# Contributing

## Set up your environment

1. Login to [https://dashboard.fauna.com/](https://dashboard.fauna.com/). If you don't already have a database for your app, go ahead and create one. Once you've selected the database, use the Security tab to create a key with the Admin role. Save the key somewhere safe, i.e. in a password manager.
2. Create a file at `.env` which contains the admin key under the variable name `FAUNA_ADMIN_KEY`. See [.env.example](.env.example) for reference.

## Running unit tests

Run `yarn test` to execute the unit tests.

Note that we're using some helper functions to set up and tear down Fauna database instances during each test run. To keep these databases isolated from each other, we're using a pattern that is slightly different than the usual Jest `beforeEach` and `afterEach` functions will support. As noted in this [issue](https://github.com/facebook/jest/issues/7823), there is no way to pass context between `it` or `test` functions and the `beforeEach` and `afterEach` hooks. Such context passing is supported in [ava](https://github.com/avajs/ava), which is the testing library that was used in the [tests for the original example](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced/tests). To replicate this pattern, we're using some functions called `setUp` and `tearDown` that allow us to create isolated contexts (each with their own database instances) within each `it` or `test` block. These `setUp` functions can take a long time to run, but there are issues with trying to use the `it.concurrent` feature in Jest, so that's just a fact of life for now.

## Development workflow

When developing logic around authentication, you'll need to work within the `fauna` directory. This workflow is based on a Fauna "blueprint", which is a set of resources defined in pure FQL that can be shared and loaded with the [`fauna-schema-migrate`](https://github.com/fauna-labs/fauna-schema-migrate) tool. You can read more on this [here](https://github.com/fauna-labs/fauna-blueprints/blob/main/README.md#fauna-blueprints).

#### General update workflow

Generally speaking, to work with the `fauna-schema-migrate` tool:

-   start by running `export FAUNA_ADMIN_KEY=<admin key>` to authenticate further commands
-   run `npx fauna-schema-migrate run` from `packages/stories` and use one of the commands from the menu

After you make a change, you'll want to first run the `generate` command to create a migration, and then the `apply` command to apply the migration.
