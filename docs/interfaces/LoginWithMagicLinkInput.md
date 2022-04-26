[faunauth](../index.md) / LoginWithMagicLinkInput

# Interface: LoginWithMagicLinkInput

## Table of contents

### Properties

- [clientConfig](LoginWithMagicLinkInput.md#clientconfig)
- [email](LoginWithMagicLinkInput.md#email)
- [publicFaunaKey](LoginWithMagicLinkInput.md#publicfaunakey)
- [token](LoginWithMagicLinkInput.md#token)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/loginWithMagicLink.ts:11](https://github.com/alexnitta/faunauth/blob/210b57d/src/auth/loginWithMagicLink.ts#L11)

___

### email

• **email**: `string`

Email address for the user who wants to log in

#### Defined in

[auth/loginWithMagicLink.ts:15](https://github.com/alexnitta/faunauth/blob/210b57d/src/auth/loginWithMagicLink.ts#L15)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[auth/loginWithMagicLink.ts:20](https://github.com/alexnitta/faunauth/blob/210b57d/src/auth/loginWithMagicLink.ts#L20)

___

### token

• **token**: `string`

Token that was previously created in the database

#### Defined in

[auth/loginWithMagicLink.ts:24](https://github.com/alexnitta/faunauth/blob/210b57d/src/auth/loginWithMagicLink.ts#L24)
