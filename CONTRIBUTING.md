# Contributing

## Set up your environment

1. Login to [https://dashboard.fauna.com/](https://dashboard.fauna.com/). If you don't already have a database for your app, go ahead and create one. Once you've selected the database, use the Security tab to create a key with the Admin role. Save the key somewhere safe, i.e. in a password manager.
2. Create a file at `.env` which contains the admin key under the variable name `FAUNA_ADMIN_KEY`. See [.env.example](.env.example) for reference.

## Running unit tests

Run `nx test stories` to execute the unit tests.

## Development workflow

When developing logic around authentication, you'll need to work within the `fauna` directory. This workflow is based on a Fauna "blueprint", which is a set of resources defined in pure FQL that can be shared and loaded with the [`fauna-schema-migrate`](https://github.com/fauna-labs/fauna-schema-migrate) tool. You can read more on this [here](https://github.com/fauna-labs/fauna-blueprints/blob/main/README.md#fauna-blueprints).

#### General update workflow

Generally speaking, to work with the `fauna-schema-migrate` tool:

-   start by running `export FAUNA_ADMIN_KEY=<admin key>` to authenticate further commands
-   run `npx fauna-schema-migrate run` from `packages/stories` and use one of the commands from the menu

After you make a change, you'll want to first run the `generate` command to create a migration, and then the `apply` command to apply the migration.
