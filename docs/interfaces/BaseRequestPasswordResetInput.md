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

src/auth/sendConfirmationEmail.ts:19

___

### email

• **email**: `string`

Email address for the user who wants to reset their password

#### Defined in

src/auth/sendConfirmationEmail.ts:23

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

src/auth/sendConfirmationEmail.ts:28
