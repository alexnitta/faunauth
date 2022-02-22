import { ConfirmSignUpLocale, ConfirmResetPasswordLocale } from '~/types';

/**
 * @param appName - name of the user-facing application
 * @returns an object containing text in en-US locale for the Confirm Sign Up email
 */
export const getDefaultConfirmSignUpLocale = (
    appName: string,
): ConfirmSignUpLocale => ({
    body: {
        intro: `Thanks for signing up for an account at ${appName}.`,
        ctaDescription:
            'To confirm your email address, please click the link below.',
        ignore: 'If you did not create an account, you can safely ignore this email.',
        signOff1: 'See you soon,',
        signOff2: `The team at ${appName}`,
    },
    callToAction: 'Confirm',
    previewHeader: `Confirm your email to set up your account and sign in to ${appName}`,
    subject: `Confirm your ${appName} account`,
});

/**
 * @param appName - name of the user-facing application
 * @returns an object containing text in en-US locale for the Confirm Reset Password email
 */
export const getDefaultConfirmResetPasswordLocale = (
    appName: string,
): ConfirmResetPasswordLocale => ({
    body: {
        ctaDescription:
            'To confirm your email address and reset your password, please click the link below.',
        ignore: 'If you did not request to reset your password, you can safely ignore this email.',
        signOff1: 'Thanks,',
        signOff2: `The team at ${appName}`,
    },
    callToAction: 'Confirm',
    previewHeader: `Confirm your email to reset your password and sign in to ${appName}`,
    subject: `Reset your ${appName} password`,
});
