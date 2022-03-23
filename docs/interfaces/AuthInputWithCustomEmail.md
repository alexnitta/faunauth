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

[src/types/email.ts:145](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/types/email.ts#L145)

___

### sendCustomEmail

• **sendCustomEmail**: [`SendCustomEmail`](../index.md#sendcustomemail)<`SendEmailResult`\>

See [SendCustomEmail](../index.md#sendcustomemail)

#### Defined in

[src/types/email.ts:149](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/types/email.ts#L149)