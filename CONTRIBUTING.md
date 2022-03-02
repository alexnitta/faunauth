# Contributing

## Available Scripts

-   `yarn check-types`: run the `tsc` command to check types
-   `yarn test`: execute the unit tests
    Note that we're using some helper functions to set up and tear down Fauna database instances during each test run. To keep these databases isolated from each other, we're using a pattern that is slightly different than the usual Jest `beforeEach` and `afterEach` functions will support. As noted in this [issue](https://github.com/facebook/jest/issues/7823), there is no way to pass context between `it` or `test` functions and the `beforeEach` and `afterEach` hooks. Such context passing is supported in [ava](https://github.com/avajs/ava), which is the testing library that was used in the [tests for the original example](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/refresh-tokens-advanced/tests). To replicate this pattern, we're using some functions called `setUp` and `tearDown` that allow us to create isolated contexts (each with their own database instances) within each `it` or `test` block. These `setUp` functions can take a long time to run, but there are issues with trying to use the `it.concurrent` feature in Jest, so that's just a fact of life for now.
