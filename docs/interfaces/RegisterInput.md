[faunauth](../none) / [Exports](../modules.md) / RegisterInput

# Interface: RegisterInput<SendEmailResult\>

## Type parameters

| Name |
| :------ |
| `SendEmailResult` |

## Table of contents

### Properties

- [emailConfig](RegisterInput.md#emailconfig)
- [fromEmail](RegisterInput.md#fromemail)
- [password](RegisterInput.md#password)
- [publicFaunaKey](RegisterInput.md#publicfaunakey)
- [sendEmail](RegisterInput.md#sendemail)
- [userData](RegisterInput.md#userdata)

## Properties

### emailConfig

• **emailConfig**: [`AuthEmailConfig`](AuthEmailConfig.md)

A configuration object for the email template - see [AuthEmailConfig](AuthEmailConfig.md)

#### Defined in

[src/auth/register.ts:22](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/auth/register.ts#L22)

___

### fromEmail

• **fromEmail**: `string`

Email address to use as the sender

#### Defined in

[src/auth/register.ts:18](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/auth/register.ts#L18)

___

### password

• **password**: `string`

Password for the new user

#### Defined in

[src/auth/register.ts:31](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/auth/register.ts#L31)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[src/auth/register.ts:27](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/auth/register.ts#L27)

___

### sendEmail

• **sendEmail**: [`SendEmail`](../modules.md#sendemail)<`SendEmailResult`\>

See [SendEmail](../modules.md#sendemail)

#### Defined in

[src/auth/register.ts:35](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/auth/register.ts#L35)

___

### userData

• **userData**: [`UserData`](UserData.md)

Details for the new user - see [UserData](UserData.md)

#### Defined in

[src/auth/register.ts:39](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/auth/register.ts#L39)
