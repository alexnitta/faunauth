import getEmailTemplate from './getEmailTemplate';
import getCallToAction from './getCallToAction';
import getPOpen from './getPOpen';
import {
    ConfirmResetPasswordLocale,
    Maybe,
    GetConfirmResetPasswordEmailConfig,
} from '~/types';
import { getDefaultConfirmResetPasswordLocale } from './defaultLocales';

/**
 * Returns the HTML template for an account verification email to confirm a password reset.
 * @param input - see {@link GetConfirmResetPasswordEmailConfig}
 */
export const getConfirmResetPasswordEmail = (
    input: GetConfirmResetPasswordEmailConfig,
) => {
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

    let locale: Maybe<ConfirmResetPasswordLocale> = null;

    if ('locale' in input) {
        locale = input.locale;
    } else {
        locale = getDefaultConfirmResetPasswordLocale(appName);
    }

    const {
        body: { ctaDescription, ignore, signOff1, signOff2 },
        callToAction: callToActionText,
        subject,
        previewHeader,
    } = locale;

    const emailBody = `
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
            ${ctaDescription}\n\n
            ${callbackUrl}\n\n
            ${ignore}\n\n
            ${signOff1}\n\n
            ${signOff2}\n\n
        `,
        subject,
    };
};
