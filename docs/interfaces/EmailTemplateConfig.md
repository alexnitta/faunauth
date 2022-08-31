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

[types/email.ts:32](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/types/email.ts#L32)

___

### buttonColor

• **buttonColor**: `string`

HTML color value for the call to action button

#### Defined in

[types/email.ts:45](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/types/email.ts#L45)

___

### buttonColorOnHover

• **buttonColorOnHover**: `string`

HTML color to apply on buttons on hover

#### Defined in

[types/email.ts:36](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/types/email.ts#L36)

___

### callbackUrl

• **callbackUrl**: `string`

Target URL for the call to action button, including a URL parameter called `data` which
includes a Base64-encoded string containing the email and token.

#### Defined in

[types/email.ts:41](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/types/email.ts#L41)

___

### fontFamily

• `Optional` **fontFamily**: `string`

Font family for the email

**`defaultvalue`** 'Arial, sans-serif'

#### Defined in

[types/email.ts:50](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/types/email.ts#L50)

___

### fontSize

• `Optional` **fontSize**: `string`

Font size for the email

**`defaultvalue`** '14px'

#### Defined in

[types/email.ts:55](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/types/email.ts#L55)

___

### fontWeight

• `Optional` **fontWeight**: `string`

Font weight for the email

**`defaultvalue`** 'normal'

#### Defined in

[types/email.ts:60](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/types/email.ts#L60)

___

### linkTags

• `Optional` **linkTags**: `string`

HTML <link> tags to add to <head> section. This is useful for embedding scripts, for example
if you are using a font from Google Fonts as your `fontFamily`.

#### Defined in

[types/email.ts:65](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/types/email.ts#L65)

___

### locale

• `Optional` **locale**: [`EmailTemplateLocale`](EmailTemplateLocale.md)

If provided, this object will be used to populate the text in the email.

#### Defined in

[types/email.ts:69](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/types/email.ts#L69)
