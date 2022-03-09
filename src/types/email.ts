import { Maybe } from './general';

export interface EmailTemplateLocale {
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

export interface EmailTemplateConfig {
    /**
     * User-facing application name
     */
    appName: string;
    /**
     * HTML color to apply on buttons on hover
     */
    buttonColorOnHover: string;
    /**
     * Target URL for the call to action button, including a URL parameter called `data` which
     * includes a Base64-encoded string containing the email and token.
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
    locale?: EmailTemplateLocale;
}

export interface EmailTemplateInput {
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
 * Async function for sending an email; accepts a {@link EmailTemplateInput} and returns a Promise
 * that resolves to the generic \`<SendEmailFromTemplateResult>\`. Use this when you want to send
 * emails with the built-in template system provided by faunauth.
 * @remarks
 * Typically this will be a wrapper around something like
 * {@link https://www.npmjs.com/package/@sendgrid/mail}. If using \@sendgrid/mail as `sgMail`, you
 * will need to set an API key using `sgMail.setApiKey('API_KEY')` before passing in `sgMail` as a
 * `SendEmailFromTemplate` function.
 */
export type SendEmailFromTemplate<SendEmailFromTemplateResult> = (
    input: EmailTemplateInput,
) => Promise<SendEmailFromTemplateResult>;

/**
 * Async function for sending an email; accepts a callback URL and returns a Promise
 * that resolves to the generic \`<SendCustomEmailResult>\`. Use this when you want to provide your
 * own email template logic.
 * @remarks
 * Typically this will a wrapper around something like
 * {@link https://www.npmjs.com/package/@sendgrid/mail}. If using \@sendgrid/mail as `sgMail`, you
 * will need to set an API key using `sgMail.setApiKey('API_KEY')` before passing in `sgMail` as a
 * `SendCustomEmail` function.
 */
export type SendCustomEmail<SendCustomEmailResult> = (
    callbackUrl: string,
) => Promise<SendCustomEmailResult>;

export interface AuthInputWithEmailTemplate<SendEmailFromTemplateResult> {
    /**
     * Email address to use as the sender
     */
    fromEmail: string;
    /**
     * A configuration object for the email template - see {@link EmailTemplateConfig}
     */
    emailConfig: EmailTemplateConfig;
    /**
     * See {@link SendEmailFromTemplate}
     */
    sendEmailFromTemplate: SendEmailFromTemplate<SendEmailFromTemplateResult>;
}

export interface AuthInputWithCustomEmail<SendCustomEmailResult> {
    /**
     * See {@link SendCustomEmail}
     */
    sendCustomEmail: SendCustomEmail<SendCustomEmailResult>;
}

export interface BaseAuthEmailResult {
    /**
     * True if a sign up token was created in database
     */
    tokenCreated: boolean;
}
export interface AuthWithEmailTemplateResult<SendEmailFromTemplateResult> {
    /**
     * Result of sending email
     */
    sendEmailResult: Maybe<SendEmailFromTemplateResult>;
}

export interface AuthWithCustomEmailResult<SendCustomEmailResult> {
    /**
     * Result of sending email
     */
    sendEmailResult: Maybe<SendCustomEmailResult>;
}

export type AuthEmailResult<SendEmailResult> = BaseAuthEmailResult &
    (
        | AuthWithEmailTemplateResult<SendEmailResult>
        | AuthWithCustomEmailResult<SendEmailResult>
    );
