# Contributing

Contributions are welcome! If you want to contribute, please read on.

## Installing dependencies

We're using NodeJS 16.x and yarn 1.x. A good way to get started is to use [nvm](https://github.com/nvm-sh/nvm) to manage your Node version.

1. Install [nvm](https://github.com/nvm-sh/nvm) to manage your NodeJS versions.
2. Install NodeJS 16 with `nvm install 16`
3. Set NodeJS 16 as your default version with `nvm alias default 16`, then run `nvm use default` to make sure you're using NodeJS 16.
4. Install `yarn` globally with `npm i -g yarn`.
5. Install all dependencies with `yarn`.

## Code Conventions

We follow a few important conventions:

1. As much as possible, we use [TypeScript](https://www.typescriptlang.org/).
2. This project adheres to [semver](https://semver.org/).
3. We use [commitlint](https://commitlint.js.org/#/) to enforce [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), specifically using the [@commitlint/config-angular](https://www.npmjs.com/package/@commitlint/config-angular) preset. This allows us to use [semantic-release](https://github.com/semantic-release/semantic-release) to analyze commit messages in order to determine the next version number, generate release notes, and publish to npm. This means you'll see an error if you try to make a commit with a message that doesn't conform to the Angular conventions. The quick summary of these conventions is that you need to prefix your commit messages with a subject and a colon, like `fix: <your_commit_message_here>`. The two most common subjects you will use are `fix` and `feat`, and these have differing implications for version numbers. Commits using `feat` will trigger a semver minor version bump; those with `fix` will trigger a semver patch version bump. Major versions are only incremented manually. Read more on the other commit subjects in the links above. Here is an example of an attempt to use an invalid commit message, which means the commit is not actually made:

    ```bash
    git c -m 'simplify logic for email generation'
    ⧗   input: simplify logic for email generation
    ✖   subject may not be empty [subject-empty]
    ✖   type may not be empty [type-empty]

    ✖   found 2 problems, 0 warnings
    ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

    ```

    The commit message `'simplify logic for email generation'` is missing a subject. Here's another commit message that is correctly formatted with the `fix` subject:

    ```bash
    git c -m 'fix: simplify logic for email generation'
    [main ed28603] fix: simplify logic for email generation
    1 file changed, 5 insertions(+), 34 deletions(-)
    ```

4. Code formatting with [prettier](https://prettier.io/) and linting with [eslint](https://eslint.org/) are set up with a `precommit` hook using [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://typicode.github.io/husky/#/). You shouldn't have to do much work to get any of this working; just running `yarn` will install and set this all up for you. When you make commits, you'll see some output in your terminal that looks like this:

    ```bash
    git commit -am 'docs: update docs for ErrorWithKey'
    ✔ Preparing...
    ✔ Running tasks...
    ✔ Applying modifications...
    ✔ Cleaning up...
    [main cdbb474] docs: update docs for ErrorWithKey
    1 file changed, 2 insertions(+), 1 deletion(-)
    ```

    This is how you'll know that the formatting and linting are cleaning up changes made during your commit.

## Available Scripts

-   `yarn build`: run tsc to build the project
-   `yarn check-types`: run tsc to check types without generating any output
-   `yarn dev`: run tsc in watch mode to compile TypeScript to JavaScript in `/dist` when you make changes
-   `yarn format`: automatically format code with eslint and prettier
-   `yarn lint`: run eslint
-   `yarn test`: run the unit tests with vitest
-   `yarn test-watch`: run the unit tests with vitest in watch mode

## Unit testing

If your changes are touching any of the core functionality, they should include updates to the unit tests.

The general approach to testing features that rely on Fauna is to run tests against a live Fauna database. This is time-consuming, but ensures that we're testing against production conditions. It's a good idea to set up a Fauna database just for testing purposes, and then use the use the Fauna dashboard to create a new key with the "Admin" role. Save this key somewhere secure (i.e. in a password manager); you won't see it again. Before running tests, be sure to create a `.env` file that contains this value as the `FAUNA_ADMIN_KEY`.

Note that we're using some helper functions to set up and tear down Fauna database instances during each test run. To keep these databases isolated from each other, we're using a pattern that is slightly different than the usual vitest `beforeEach` and `afterEach` functions will support. We're using some functions called `setUp` and `tearDown` that allow us to create isolated contexts (each with their own database instances) within each `it` or `test` block. These `setUp` functions can take a long time to run, but unfortunately that's a fact of life for now.
