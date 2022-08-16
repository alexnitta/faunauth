[faunauth](../index.md) / AuthInputWithCustomEmail

# Interface: AuthInputWithCustomEmail<SendEmailResult\>

## Type parameters

| Name |
| :------ |
| `SendEmailResult` |

## Table of contents

### Properties

- [callbackUrl](AuthInputWithCustomEmail.md#callbackurl)
- [sendCustomEmail](AuthInputWithCustomEmail.md#sendcustomemail)

## Properties

### callbackUrl

• **callbackUrl**: `string`

Target URL for the call to action button, including a URL parameter called `data` which
includes a Base64-encoded string containing the email and token.

#### Defined in

[types/email.ts:143](https://github.com/alexnitta/faunauth/blob/86ceabe/src/types/email.ts#L143)

___

### sendCustomEmail

• **sendCustomEmail**: [`SendCustomEmail`](../index.md#sendcustomemail)<`SendEmailResult`\>

See [SendCustomEmail](../index.md#sendcustomemail)

#### Defined in

[types/email.ts:147](https://github.com/alexnitta/faunauth/blob/86ceabe/src/types/email.ts#L147)
