[faunauth](../index.md) / AuthEmailConfig

# Interface: AuthEmailConfig

## Table of contents

### Properties

- [appName](AuthEmailConfig.md#appname)
- [buttonColor](AuthEmailConfig.md#buttoncolor)
- [buttonColorOnHover](AuthEmailConfig.md#buttoncoloronhover)
- [callbackUrl](AuthEmailConfig.md#callbackurl)
- [fontFamily](AuthEmailConfig.md#fontfamily)
- [fontSize](AuthEmailConfig.md#fontsize)
- [fontWeight](AuthEmailConfig.md#fontweight)
- [linkTags](AuthEmailConfig.md#linktags)
- [locale](AuthEmailConfig.md#locale)

## Properties

### appName

• **appName**: `string`

User-facing application name

#### Defined in

[src/types/email.ts:32](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/email.ts#L32)

___

### buttonColor

• **buttonColor**: `string`

HTML color value for the call to action button

#### Defined in

[src/types/email.ts:44](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/email.ts#L44)

___

### buttonColorOnHover

• **buttonColorOnHover**: `string`

HTML color to apply on buttons on hover

#### Defined in

[src/types/email.ts:36](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/email.ts#L36)

___

### callbackUrl

• **callbackUrl**: `string`

Target URL for the call to action button

#### Defined in

[src/types/email.ts:40](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/email.ts#L40)

___

### fontFamily

• `Optional` **fontFamily**: `string`

Font family for the email

**`defaultvalue`** 'Arial, sans-serif'

#### Defined in

[src/types/email.ts:49](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/email.ts#L49)

___

### fontSize

• `Optional` **fontSize**: `string`

Font size for the email

**`defaultvalue`** '14px'

#### Defined in

[src/types/email.ts:54](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/email.ts#L54)

___

### fontWeight

• `Optional` **fontWeight**: `string`

Font weight for the email

**`defaultvalue`** 'normal'

#### Defined in

[src/types/email.ts:59](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/email.ts#L59)

___

### linkTags

• `Optional` **linkTags**: `string`

HTML <link> tags to add to <head> section. This is useful for embedding scripts, for example
if you are using a font from Google Fonts as your `fontFamily`.

#### Defined in

[src/types/email.ts:64](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/email.ts#L64)

___

### locale

• `Optional` **locale**: [`AuthEmailLocale`](AuthEmailLocale.md)

If provided, this object will be used to populate the text in the email.

#### Defined in

[src/types/email.ts:68](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/email.ts#L68)
