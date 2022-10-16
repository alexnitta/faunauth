[faunauth](../index.md) / BaseRequestPasswordResetInput

# Interface: BaseRequestPasswordResetInput

## Table of contents

### Properties

- [clientConfig](BaseRequestPasswordResetInput.md#clientconfig)
- [email](BaseRequestPasswordResetInput.md#email)
- [publicFaunaKey](BaseRequestPasswordResetInput.md#publicfaunakey)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/sendConfirmationEmail.ts:18](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/sendConfirmationEmail.ts#L18)

___

### email

• **email**: `string`

Email address for the user who wants to reset their password

#### Defined in

[auth/sendConfirmationEmail.ts:22](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/sendConfirmationEmail.ts#L22)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[auth/sendConfirmationEmail.ts:27](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/sendConfirmationEmail.ts#L27)
