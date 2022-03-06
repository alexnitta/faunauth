[faunauth](../index.md) / LogoutInput

# Interface: LogoutInput

## Table of contents

### Properties

- [logoutAll](LogoutInput.md#logoutall)
- [refreshToken](LogoutInput.md#refreshtoken)

## Properties

### logoutAll

• **logoutAll**: `boolean`

If true, will expire all tokens for the account (which could be on different machines or
different browsers). If false, will just expire tokens for the current browser.

#### Defined in

[src/auth/logout.ts:10](https://github.com/alexnitta/faunauth/blob/f5a1862/src/auth/logout.ts#L10)

___

### refreshToken

• **refreshToken**: `string`

The user's refresh token secret

#### Defined in

[src/auth/logout.ts:14](https://github.com/alexnitta/faunauth/blob/f5a1862/src/auth/logout.ts#L14)
