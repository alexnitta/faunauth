[faunauth](../index.md) / ClientLoginResult

# Interface: ClientLoginResult

A ClientLoginResult only exposes the accessToken so that a malicious actor cannot acquire new
tokens by stealing a refreshToken from the browser's local persistence.

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

A token that can be used to authenticate further requests against the public Fauna APIs.
Fauna's docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[types/auth.ts:74](https://github.com/alexnitta/faunauth/blob/f54dc52/src/types/auth.ts#L74)

___

### user

• **user**: [`UserData`](UserData.md)

Details for the user that was signed in

#### Defined in

[types/auth.ts:78](https://github.com/alexnitta/faunauth/blob/f54dc52/src/types/auth.ts#L78)
