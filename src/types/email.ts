export interface ConfirmSignUpLocale {
    body: {
        /**
         * Introductory statement, i.e.: "Thanks for signing up for an account at [App Name]."
         */
        intro: string;
        /**
         * Call to action description, i.e.: "To confirm your email address, please click the link below.",
         */
        ctaDescription: string;
        /**
         * Other content, i.e.: "If you did not create an account, you can safely ignore this email.",
         */
        ignore: string;
        /**
         * Sign off line 1, i.e.: "See you soon,",
         */
        signOff1: string;
        /**
         * Sign off line 2, i.e.:  "The team at [App Name]"
         */
        signOff2: string;
    };
    /**
     * Text for the call to action button, i.e.: "Confirm"
     */
    callToAction: string;
    /**
     * Text shown as preview in email clients, i.e. "Confirm your email to set up [App Name] account"
     */
    previewHeader: string;
    /**
     * Email subject, i.e.: "Confirm your [App Name] account"
     */
    subject: string;
}

export interface ConfirmResetPasswordLocale {
    body: {
        /**
         * Call to action description, i.e.: "To confirm your email address and reset your password, please click the link below."
         */
        ctaDescription: string;
        /**
         * Other content, i.e.: "If you did not request to reset your password, you can safely ignore this email.",
         */
        ignore: string;
        /**
         * Sign off line 1, i.e.: "Thanks,",
         */
        signOff1: string;
        /**
         * Sign off line 2, i.e.:  "The team at [App Name]"
         */
        signOff2: string;
    };
    /**
     * Text for the call to action button, i.e.: "Confirm"
     */
    callToAction: string;
    /**
     * Text shown as preview in email clients, i.e. "Confirm your email to reset your [App Name] password"
     */
    previewHeader: string;
    /**
     * Email subject, i.e.: "Reset your [App Name] password"
     */
    subject: string;
}

interface BaseGetEmailConfig {
    /**
     * User-facing application name
     */
    appName: string;
    /**
     * HTML color to apply on buttons on hover
     */
    buttonColorOnHover: string;
    /**
     * Target URL for the call to action button
     */
    callbackUrl: string;
    /**
     * HTML color value for the call to action button
     */
    buttonColor: string;
    /**
     * Font family for the email
     * @defaultValue 'Arial, sans-serif'
     */
    fontFamily?: string;
    /**
     * Font size for the email
     * @defaultValue '14px'
     */
    fontSize?: string;
    /**
     * Font weight for the email
     * @defaultValue 'normal'
     */
    fontWeight?: string;
    /**
     * HTML <link> tags to add to <head> section. This is useful for embedding scripts, for example
     * if you are using a font from Google Fonts as your `fontFamily`.
     */
    linkTags?: string;
}

interface GetEmailConfigWithCustomLocale<LocaleType>
    extends BaseGetEmailConfig {
    /**
     * If provided, locale strings will be sourced from this input. Otherwise, the locale strings
     * will default to English (United States) values with the `appName` inserted where appropriate.
     */
    locale: LocaleType;
}

export type GetConfirmResetPasswordEmailConfig =
    | BaseGetEmailConfig
    | GetEmailConfigWithCustomLocale<ConfirmResetPasswordLocale>;

export type GetConfirmSignUpEmailConfig =
    | BaseGetEmailConfig
    | GetEmailConfigWithCustomLocale<ConfirmSignUpLocale>;

export interface SendEmailInput {
    /**
     * Recipient email address
     */
    to: string;
    /**
     * Sender email address
     */
    from: string;
    /**
     * Email subject line
     */
    subject: string;
    /**
     * HTML content for email
     */
    html: string;
    /**
     * Plain text content for email
     */
    text: string;
}

/**
 * Async function for sending an email; accepts a {@link SendEmailInput} and returns a Promise
 * that resolves to the generic <SendEmailResult>.
 * @remarks
 * Typically this will be something like {@link https://www.npmjs.com/package/@sendgrid/mail}.
 * If using @sendgrid/mail as `sgMail`, you will need to set an API key using
 * `sgMail.setApiKey('API_KEY')` before passing in `sgMail` as a `SendMail` function.
 */
export type SendEmail<SendEmailResult> = (
    input: SendEmailInput,
) => Promise<SendEmailResult>;
