import test from 'ava';
import { getConfirmSignUpEmail } from '../src/email/getConfirmSignUpEmail';

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
                    'To confirm your email address, please click the link below.',
                ignore: 'If you did not create an account, you can safely ignore this email.',
                intro: 'Thanks for signing up for an account at Test App',
                signOff1: 'See you soon,',
                signOff2: 'The wonderful peeps at Test App',
            },
            callToAction: 'Confirm',
            previewHeader: 'Confirm your email to set up a Test App account',
            subject: 'Confirm your Test App account',
        },
    };

    const result = getConfirmSignUpEmail(input);

    t.truthy(result.text.includes(input.locale.body.ctaDescription));
    t.truthy(result.html.includes(input.locale.body.ctaDescription));
    t.deepEqual(result.subject, input.locale.subject);
});

// test('should output the correct HTML (requires manual verification)', t => {
//     // Update the locale here to generate a new email template from a different locale file
//     const result = getConfirmSignUpEmail('en-US');
//     console.log('HTML:\n', result);

//     t.deepEqual(1, 1);
// });
