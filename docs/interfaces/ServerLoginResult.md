[faunauth](../index.md) / ServerLoginResult

# Interface: ServerLoginResult

A ServerLoginResult exposes both the accessSecret and the refreshSecret so they can be stored in
a secure, HTTP-only session cookie, and later used to acquire new tokens.

## Hierarchy

- [`ClientLoginResult`](ClientLoginResult.md)

  ↳ **`ServerLoginResult`**

## Table of contents

### Properties

- [accessSecret](ServerLoginResult.md#accesssecret)
- [refreshSecret](ServerLoginResult.md#refreshsecret)
- [user](ServerLoginResult.md#user)

## Properties

### accessSecret

• **accessSecret**: `string`

A token that can be used to authenticate further requests against the public Fauna APIs.
Fauna's docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Inherited from

[ClientLoginResult](ClientLoginResult.md).[accessSecret](ClientLoginResult.md#accesssecret)

#### Defined in

[types/auth.ts:90](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/types/auth.ts#L90)

___

### refreshSecret

• **refreshSecret**: `string`

A secret that can be used to acquire a new pair of accessSecret / refreshSecret values.
Fauna's docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[types/auth.ts:106](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/types/auth.ts#L106)

___

### user

• **user**: [`UserData`](UserData.md)

Details for the user that was signed in

#### Inherited from

[ClientLoginResult](ClientLoginResult.md).[user](ClientLoginResult.md#user)

#### Defined in

[types/auth.ts:94](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/types/auth.ts#L94)
