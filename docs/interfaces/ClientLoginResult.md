[faunauth](../index.md) / ClientLoginResult

# Interface: ClientLoginResult

## Hierarchy

- **`ClientLoginResult`**

  ↳ [`ServerLoginResult`](ServerLoginResult.md)

## Table of contents

### Properties

- [accessToken](ClientLoginResult.md#accesstoken)
- [user](ClientLoginResult.md#user)

## Properties

### accessToken

• **accessToken**: `string`

A token that can be used to authenticate further requests against the FaunaDB API. Fauna's
docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[src/types/auth.ts:70](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/auth.ts#L70)

___

### user

• **user**: [`UserData`](UserData.md)

Details for the user that was signed in

#### Defined in

[src/types/auth.ts:74](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/auth.ts#L74)
