[faunauth](../index.md) / EmailTemplateConfig

# Interface: EmailTemplateConfig

## Table of contents

### Properties

- [appName](EmailTemplateConfig.md#appname)
- [buttonColor](EmailTemplateConfig.md#buttoncolor)
- [buttonColorOnHover](EmailTemplateConfig.md#buttoncoloronhover)
- [callbackUrl](EmailTemplateConfig.md#callbackurl)
- [fontFamily](EmailTemplateConfig.md#fontfamily)
- [fontSize](EmailTemplateConfig.md#fontsize)
- [fontWeight](EmailTemplateConfig.md#fontweight)
- [linkTags](EmailTemplateConfig.md#linktags)
- [locale](EmailTemplateConfig.md#locale)

## Properties

### appName

• **appName**: `string`

User-facing application name

#### Defined in

[src/types/email.ts:34](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/email.ts#L34)

___

### buttonColor

• **buttonColor**: `string`

HTML color value for the call to action button

#### Defined in

[src/types/email.ts:47](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/email.ts#L47)

___

### buttonColorOnHover

• **buttonColorOnHover**: `string`

HTML color to apply on buttons on hover

#### Defined in

[src/types/email.ts:38](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/email.ts#L38)

___

### callbackUrl

• **callbackUrl**: `string`

Target URL for the call to action button, including a URL parameter called `data` which
includes a Base64-encoded string containing the email and token.

#### Defined in

[src/types/email.ts:43](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/email.ts#L43)

___

### fontFamily

• `Optional` **fontFamily**: `string`

Font family for the email

**`defaultvalue`** 'Arial, sans-serif'

#### Defined in

[src/types/email.ts:52](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/email.ts#L52)

___

### fontSize

• `Optional` **fontSize**: `string`

Font size for the email

**`defaultvalue`** '14px'

#### Defined in

[src/types/email.ts:57](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/email.ts#L57)

___

### fontWeight

• `Optional` **fontWeight**: `string`

Font weight for the email

**`defaultvalue`** 'normal'

#### Defined in

[src/types/email.ts:62](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/email.ts#L62)

___

### linkTags

• `Optional` **linkTags**: `string`

HTML <link> tags to add to <head> section. This is useful for embedding scripts, for example
if you are using a font from Google Fonts as your `fontFamily`.

#### Defined in

[src/types/email.ts:67](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/email.ts#L67)

___

### locale

• `Optional` **locale**: [`EmailTemplateLocale`](EmailTemplateLocale.md)

If provided, this object will be used to populate the text in the email.

#### Defined in

[src/types/email.ts:71](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/email.ts#L71)
