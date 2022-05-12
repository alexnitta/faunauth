import { addParamsToPath } from '../../src/utils';
import { SHORT_TEST_TIMEOUT } from '../constants';

describe('addParamsToPath', () => {
    it(
        'can add params to a path that does not have existing params or a hash',
        () => {
            const result = addParamsToPath({
                path: '/sign-up',
                params: [
                    ['email', 'me@example.com'],
                    ['confirmed', 'true'],
                ],
            });

            expect(result).toBe(
                '/sign-up?email=me%40example.com&confirmed=true',
            );
        },
        SHORT_TEST_TIMEOUT,
    );

    it(
        'can add params to a path that has existing params but no hash',
        () => {
            const result = addParamsToPath({
                path: '/sign-up?foo=bar',
                params: [
                    ['email', 'me@example.com'],
                    ['confirmed', 'true'],
                ],
            });

            expect(result).toBe(
                '/sign-up?foo=bar&email=me%40example.com&confirmed=true',
            );
        },
        SHORT_TEST_TIMEOUT,
    );

    it(
        'can add params to a path that has existing params and a hash',
        () => {
            const result = addParamsToPath({
                path: '/sign-up?foo=bar#hashid',
                params: [
                    ['email', 'me@example.com'],
                    ['confirmed', 'true'],
                ],
            });

            expect(result).toBe(
                '/sign-up?foo=bar&email=me%40example.com&confirmed=true#hashid',
            );
        },
        SHORT_TEST_TIMEOUT,
    );
});
