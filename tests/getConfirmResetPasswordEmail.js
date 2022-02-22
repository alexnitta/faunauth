import test from 'ava';
import { getConfirmResetPasswordEmail } from '../src/email/getConfirmResetPasswordEmail';

test('should interpolate strings from the input into the output', t => {
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
                ctaDescription:
                    'To confirm your email address and reset your password, please click the link below.',
                ignore: 'If you did not request to reset your password, you can safely ignore this email.',
                signOff1: 'See you soon,',
                signOff2: 'The wonderful peeps at Test App',
            },
            callToAction: 'Confirm',
            previewHeader: 'Confirm your email to reset your Test App password',
            subject: 'Reset your Test App password',
        },
    };

    const result = getConfirmResetPasswordEmail(input);

    t.truthy(result.text.includes(input.locale.body.ctaDescription));
    t.truthy(result.html.includes(input.locale.body.ctaDescription));
    t.deepEqual(result.subject, input.locale.subject);
});
