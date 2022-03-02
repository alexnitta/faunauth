import { AuthEmailLocale } from "~/types";

/**
 * @param appName - name of the user-facing application
 * @returns an object containing text in en-US locale for the email to confirm registration
 */
export const getDefaultConfirmRegistrationLocale = (
    appName: string
): AuthEmailLocale => ({
    body: {
        beforeCallToAction: [
            `Thanks for signing up for an account at ${appName}.`,
            "To confirm your email address, please click the link below.",
        ],
        callToAction: "Confirm",
        afterCallToAction: [
            "If you did not create an account, you can safely ignore this email.",
            "See you soon,",
            `The team at ${appName}`,
        ],
    },
    previewHeader: `Confirm your email to set up your account and sign in to ${appName}`,
    subject: `Confirm your ${appName} account`,
});

/**
 * @param appName - name of the user-facing application
 * @returns an object containing text in en-US locale for the email to confirm a password reset
 */
export const getDefaultConfirmResetPasswordLocale = (
    appName: string
): AuthEmailLocale => ({
    body: {
        beforeCallToAction: [
            `You're almost done resetting your password for ${appName}.`,
            "To reset your password, please click the link below.",
        ],
        callToAction: "Confirm",
        afterCallToAction: [
            "If you did not request to reset your password, you can safely ignore this email.",
            "Thanks,",
            `The team at ${appName}`,
        ],
    },

    previewHeader: `Confirm your email to reset your password and sign in to ${appName}`,
    subject: `Reset your ${appName} password`,
});
