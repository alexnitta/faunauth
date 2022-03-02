interface GetFooterInput {
    /**
     * An address for the company formatted as one line, like "Company Name, 123 Street Name, City, ST 01234"
     */
    companyAddress: string;
    /**
     * A call to action for unsubscribing, like, "Don't like these emails?"
     */
    callToAction: string;
    /**
     * Font family for the footer
     * @defaultValue 'Arial, sans-serif'
     */
    fontFamily: string;
    /**
     * Font size for the footer
     * @defaultValue '10px'
     */
    fontSize?: string;
    /**
     * A verb to display as the unsubscribe link, like "Unsubscribe"
     */
    unsubscribe: string;
    /**
     * A URL for the unsubscribe link
     */
    unsubscribeUrl: string;
}

/**
 * Renders a footer section for an email template
 * @param companyAddress - an address in one line, like "Company Name, 123 Street Name, City, ST 01234"
 * @param callToAction - a call to action, like, "Don't like these emails?"
 * @param unsubscribe - a verb to display as the unsubscribe link, like "Unsubscribe"
 * @param unsubscribeUrl - a URL for the unsubscribe link
 */
export default function getFooter({
    companyAddress,
    callToAction,
    fontFamily = 'Arial, sans-serif',
    fontSize = '10px',
    unsubscribe,
    unsubscribeUrl,
}: GetFooterInput) {
    return `
        <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
        <tr>
            <td class="content-block" style="font-family: ${fontFamily}; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: ${fontSize}; color: #999999; text-align: center;">
            <span class="apple-link" style="color: #999999; text-align: center;">${companyAddress}</span>
            <br> ${callToAction} <a href="${unsubscribeUrl}" style="text-decoration: underline; color: #999999; text-align: center;">${unsubscribe}</a>
            </td>
        </tr>
        </table>
        </div>
    `;
}
