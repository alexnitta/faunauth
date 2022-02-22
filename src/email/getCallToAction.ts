/**
 * Renders a button that contains an <a> link.
 * @param callbackUrl - callback URL to use as target for the link
 * @param linkText - text for the link
 * @param buttonColor - background color for the link button
 */
export default function getCallToAction(
    callbackUrl: string,
    linkText: string,
    buttonColor: string,
) {
    return `
        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
            <tbody>
            <tr>
                <td align="left" style="font-family: 'Lato', sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                    <tbody>
                    <tr>
                        <td style="font-family: 'Lato', sans-serif; font-size: 14px; vertical-align: top; background-color: ${buttonColor}; border-radius: 5px; text-align: center;"> <a href="${callbackUrl}" target="_blank" style="display: inline-block; color: #ffffff; background-color: ${buttonColor}; border: solid 1px ${buttonColor}; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: ${buttonColor};">${linkText}</a> </td>
                    </tr>
                    </tbody>
                </table>
                </td>
            </tr>
            </tbody>
        </table>
    `;
}
