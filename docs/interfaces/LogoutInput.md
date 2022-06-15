[faunauth](../index.md) / LogoutInput

# Interface: LogoutInput

## Table of contents

### Properties

- [clientConfig](LogoutInput.md#clientconfig)
- [logoutAll](LogoutInput.md#logoutall)
- [refreshSecret](LogoutInput.md#refreshsecret)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/logout.ts:10](https://github.com/alexnitta/faunauth/blob/5b231ad/src/auth/logout.ts#L10)

___

### logoutAll

• **logoutAll**: `boolean`

If true, will expire all tokens for the account (which could be on different machines or
different browsers). If false, will just expire tokens for the current browser.

#### Defined in

[auth/logout.ts:15](https://github.com/alexnitta/faunauth/blob/5b231ad/src/auth/logout.ts#L15)

___

### refreshSecret

• **refreshSecret**: `string`

The user's refresh token secret

#### Defined in

[auth/logout.ts:19](https://github.com/alexnitta/faunauth/blob/5b231ad/src/auth/logout.ts#L19)
