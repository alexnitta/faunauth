[faunauth](../index.md) / ServerLoginResult

# Interface: ServerLoginResult

A ServerLoginResult exposes both the accessToken and the refreshToken so they can be stored in
a secure, HTTP-only session cookie, and later used to acquire new tokens.

## Hierarchy

- [`ClientLoginResult`](ClientLoginResult.md)

  ↳ **`ServerLoginResult`**

## Table of contents

### Properties

- [accessToken](ServerLoginResult.md#accesstoken)
- [refreshToken](ServerLoginResult.md#refreshtoken)
- [user](ServerLoginResult.md#user)

## Properties

### accessToken

• **accessToken**: `string`

A token that can be used to authenticate further requests against the public Fauna APIs.
Fauna's docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Inherited from

[ClientLoginResult](ClientLoginResult.md).[accessToken](ClientLoginResult.md#accesstoken)

#### Defined in

[types/auth.ts:74](https://github.com/alexnitta/faunauth/blob/13b973e/src/types/auth.ts#L74)

___

### refreshToken

• **refreshToken**: `string`

A token that can be used to acquire a new pair of accessToken / refreshToken values. Fauna's
docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[types/auth.ts:90](https://github.com/alexnitta/faunauth/blob/13b973e/src/types/auth.ts#L90)

___

### user

• **user**: [`UserData`](UserData.md)

Details for the user that was signed in

#### Inherited from

[ClientLoginResult](ClientLoginResult.md).[user](ClientLoginResult.md#user)

#### Defined in

[types/auth.ts:78](https://github.com/alexnitta/faunauth/blob/13b973e/src/types/auth.ts#L78)
