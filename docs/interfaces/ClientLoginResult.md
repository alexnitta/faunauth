[faunauth](../index.md) / ClientLoginResult

# Interface: ClientLoginResult

A ClientLoginResult only exposes the accessSecret so that a malicious actor cannot acquire new
tokens by stealing a refreshSecret from the browser's local persistence.

## Hierarchy

- **`ClientLoginResult`**

  ↳ [`ServerLoginResult`](ServerLoginResult.md)

## Table of contents

### Properties

- [accessSecret](ClientLoginResult.md#accesssecret)
- [user](ClientLoginResult.md#user)

## Properties

### accessSecret

• **accessSecret**: `string`

A token that can be used to authenticate further requests against the public Fauna APIs.
Fauna's docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[types/auth.ts:90](https://github.com/alexnitta/faunauth/blob/8d66af9/src/types/auth.ts#L90)

___

### user

• **user**: [`UserData`](UserData.md)

Details for the user that was signed in

#### Defined in

[types/auth.ts:94](https://github.com/alexnitta/faunauth/blob/8d66af9/src/types/auth.ts#L94)
