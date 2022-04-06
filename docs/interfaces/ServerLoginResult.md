[faunauth](../index.md) / ServerLoginResult

# Interface: ServerLoginResult

When logging in within an API route, we have access to the refresh token.

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

A token that can be used to authenticate further requests against the FaunaDB API. Fauna's
docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Inherited from

[ClientLoginResult](ClientLoginResult.md).[accessToken](ClientLoginResult.md#accesstoken)

#### Defined in

[types/auth.ts:70](https://github.com/alexnitta/faunauth/blob/5c30082/src/types/auth.ts#L70)

___

### refreshToken

• **refreshToken**: `string`

A token that can be used to refresh the access token. Fauna's docs refer to this as a
'secret'; from the client perspective it's a JWT.

#### Defined in

[types/auth.ts:85](https://github.com/alexnitta/faunauth/blob/5c30082/src/types/auth.ts#L85)

___

### user

• **user**: [`UserData`](UserData.md)

Details for the user that was signed in

#### Inherited from

[ClientLoginResult](ClientLoginResult.md).[user](ClientLoginResult.md#user)

#### Defined in

[types/auth.ts:74](https://github.com/alexnitta/faunauth/blob/5c30082/src/types/auth.ts#L74)
