import getEmailTemplate from './getEmailTemplate';
import getCallToAction from './getCallToAction';
import getPOpen from './getPOpen';
import { getDefaultConfirmSignUpLocale } from './defaultLocales';
import {
    ConfirmSignUpLocale,
    Maybe,
    GetConfirmSignUpEmailConfig,
} from '~/types';

/**
 * Returns the HTML template for an account verification email to confirm signing up for a new
 * account.
 * @param input - see {@link GetConfirmSignUpEmailConfig}
 */
export const getConfirmSignUpEmail = (input: GetConfirmSignUpEmailConfig) => {
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

    let locale: Maybe<ConfirmSignUpLocale> = null;

    if ('locale' in input) {
        locale = input.locale;
    } else {
        locale = getDefaultConfirmSignUpLocale(appName);
    }

    const {
        body: { intro, ctaDescription, ignore, signOff1, signOff2 },
        callToAction: callToActionText,
        subject,
        previewHeader,
    } = locale;

    const emailBody = `
        ${pOpen}${intro}</p>
        ${pOpen}${ctaDescription}</p>
        ${getCallToAction(callbackUrl, callToActionText, buttonColor)}
        ${pOpen}${ignore}</p>
        ${pOpen}${signOff1}</p>
        ${pOpen}${signOff2}</p>
    `;

    return {
        html: getEmailTemplate({
            appName,
            buttonColorOnHover,
            previewHeader,
            body: emailBody,
            linkTags,
        }),
        text: `
            ${intro}\n\n
            ${ctaDescription}\n\n
            ${callbackUrl}\n\n
            ${ignore}\n\n
            ${signOff1}\n\n
            ${signOff2}\n\n
        `,
        subject,
    };
};
