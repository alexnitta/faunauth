import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

import { FAUNA_TEST_TIMEOUT } from './tests/constants';

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        testTimeout: FAUNA_TEST_TIMEOUT,
        watchExclude: ['.*\\/node_modules\\/.*', '.*\\/build\\/.*'],
    },
});
