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

[auth/sendConfirmationEmail.ts:17](https://github.com/alexnitta/faunauth/blob/5138961/src/auth/sendConfirmationEmail.ts#L17)

___

### email

• **email**: `string`

Email address for the user who wants to reset their password

#### Defined in

[auth/sendConfirmationEmail.ts:21](https://github.com/alexnitta/faunauth/blob/5138961/src/auth/sendConfirmationEmail.ts#L21)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[auth/sendConfirmationEmail.ts:26](https://github.com/alexnitta/faunauth/blob/5138961/src/auth/sendConfirmationEmail.ts#L26)
