/**
 * @param fontFamily - font family, defaults to 'Arial, sans-serif'
 * @param fontSize - font size, defaults to '14px'
 * @param fontWeight - font weight, defaults to 'normal'
 * @returns a string containing an opening <p> tag that applies font family, font size and font
 * weight, as well as setting margins
 */
export default function getPOpen(
    fontFamily = 'Arial, sans-serif',
    fontSize = '14px',
    fontWeight = 'normal',
): string {
    return `<p style="font-family: ${fontFamily}; font-size: ${fontSize}; font-weight: ${fontWeight}; margin: 0; margin-bottom: 15px;">`;
}
