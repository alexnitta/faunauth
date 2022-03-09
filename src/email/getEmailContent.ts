import getEmailTemplate from './getEmailTemplate';
import getCallToAction from './getCallToAction';
import getPOpen from './getPOpen';
import { getDefaultConfirmRegistrationLocale } from './defaultLocales';
import { Maybe, EmailTemplateConfig, EmailTemplateLocale } from '../types';

/**
 * Returns the HTML template for an authentication email, which will be used to confirm either a
 * user registration or a password reset.
 * @param input - see {@link EmailTemplateConfig}
 */
export const getEmailContent = (input: EmailTemplateConfig) => {
    const {
        appName,
        buttonColorOnHover,
        callbackUrl,
        buttonColor,
        fontFamily,
        fontSize,
        fontWeight,
        linkTags,
    } = input;

    const pOpen = getPOpen(fontFamily, fontSize, fontWeight);

    let locale: Maybe<EmailTemplateLocale> = null;

    if ('locale' in input) {
        locale = input.locale;
    } else {
        locale = getDefaultConfirmRegistrationLocale(appName);
    }

    const {
        body: {
            beforeCallToAction,
            callToAction: callToActionText,
            afterCallToAction,
        },
        subject,
        previewHeader,
    } = locale;

    const bodyLines = [];
    const textLines = [];

    beforeCallToAction.forEach((text: string) => {
        bodyLines.push(`${pOpen}${text}</p>`);
        textLines.push(text);
    });

    bodyLines.push(getCallToAction(callbackUrl, callToActionText, buttonColor));

    textLines.push(callbackUrl);

    afterCallToAction.forEach((text: string) => {
        bodyLines.push(`${pOpen}${text}</p>`);
        textLines.push(text);
    });

    const emailBody = bodyLines.join('\n');

    return {
        html: getEmailTemplate({
            appName,
            buttonColorOnHover,
            previewHeader,
            body: emailBody,
            linkTags,
        }),
        text: textLines.join('\n\n'),
        subject,
    };
};
