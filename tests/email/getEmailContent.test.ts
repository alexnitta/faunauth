import { test, expect } from 'vitest';

import { getEmailContent } from '../../src/email/getEmailContent';
import { SHORT_TEST_TIMEOUT } from '../constants';

test(
    'getEmailContent should pass strings from the input into the output',
    () => {
        const input = {
            appName: 'Test App',
            buttonColor: 'pink',
            buttonColorOnHover: 'red',
            callbackUrl: 'http://test-url.com',
            fontFamily: 'Roboto',
            fontSize: '13px',
            fontWeight: 'normal',
            linkTags: `
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        `,
            locale: {
                body: {
                    beforeCallToAction: [
                        'Hello!',
                        'To confirm your email address and reset your password, please click the link below.',
                    ],
                    callToAction: 'Confirm',
                    afterCallToAction: [
                        'If you did not request to reset your password, you can safely ignore this email.',
                        'See you soon,',
                        'The wonderful peeps at Test App',
                    ],
                },
                previewHeader:
                    'Confirm your email to reset your Test App password',
                subject: 'Reset your Test App password',
            },
        };

        const result = getEmailContent(input);

        expect(
            result.text.includes(input.locale.body.beforeCallToAction[0]),
        ).toBeTruthy();
        expect(
            result.html.includes(input.locale.body.callToAction),
        ).toBeTruthy();
        expect(
            result.text.includes(input.locale.body.afterCallToAction[2]),
        ).toBeTruthy();
        expect(result.subject).toEqual(input.locale.subject);
    },
    SHORT_TEST_TIMEOUT,
);
