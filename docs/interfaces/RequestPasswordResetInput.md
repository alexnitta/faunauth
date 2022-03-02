[faunauth](../index.md) / RequestPasswordResetInput

# Interface: RequestPasswordResetInput<SendEmailResult\>

## Type parameters

| Name |
| :------ |
| `SendEmailResult` |

## Table of contents

### Properties

- [email](RequestPasswordResetInput.md#email)
- [emailConfig](RequestPasswordResetInput.md#emailconfig)
- [fromEmail](RequestPasswordResetInput.md#fromemail)
- [publicFaunaKey](RequestPasswordResetInput.md#publicfaunakey)
- [sendEmail](RequestPasswordResetInput.md#sendemail)

## Properties

### email

• **email**: `string`

Email address for the user who wants to reset their password

#### Defined in

[src/auth/requestPasswordReset.ts:18](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/requestPasswordReset.ts#L18)

___

### emailConfig

• **emailConfig**: [`AuthEmailConfig`](AuthEmailConfig.md)

A configuration object for the email template - see [AuthEmailConfig](AuthEmailConfig.md)

#### Defined in

[src/auth/requestPasswordReset.ts:26](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/requestPasswordReset.ts#L26)

___

### fromEmail

• **fromEmail**: `string`

Email address to use as the email sender

#### Defined in

[src/auth/requestPasswordReset.ts:22](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/requestPasswordReset.ts#L22)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[src/auth/requestPasswordReset.ts:31](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/requestPasswordReset.ts#L31)

___

### sendEmail

• **sendEmail**: [`SendEmail`](../index.md#sendemail)<`SendEmailResult`\>

See [SendEmail](../index.md#sendemail)

#### Defined in

[src/auth/requestPasswordReset.ts:35](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/requestPasswordReset.ts#L35)
