export interface AuthEmailLocale {
    body: {
        /**
         * Each of these strings will be rendered as a body paragraph before the call to action
         * button.
         */
        beforeCallToAction: string[];
        /**
         * Text for the call to action button, i.e.: "Confirm"
         */
        callToAction: string;
        /**
         * Each of these strings will be rendered as a body paragraph after the call to action
         * button.
         */
        afterCallToAction: string[];
    };
    /**
     * Text shown as preview in email clients, i.e. "Confirm your email to set up [App Name] account"
     */
    previewHeader: string;
    /**
     * Email subject, i.e.: "Confirm your [App Name] account"
     */
    subject: string;
}

export interface AuthEmailConfig {
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
    /**
     * If provided, this object will be used to populate the text in the email.
     */
    locale?: AuthEmailLocale;
}

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
