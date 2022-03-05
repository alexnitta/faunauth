[faunauth](../index.md) / TokenPair

# Interface: TokenPair

## Table of contents

### Properties

- [accessToken](TokenPair.md#accesstoken)
- [refreshToken](TokenPair.md#refreshtoken)

## Properties

### accessToken

• **accessToken**: `string`

A token that can be used to authenticate further requests against the FaunaDB API. Fauna's
docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[src/types/auth.ts:93](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/auth.ts#L93)

___

### refreshToken

• **refreshToken**: `string`

A token that can be used to refresh the access token. Fauna's docs refer to this as a
'secret'; from the client perspective it's a JWT.

#### Defined in

[src/types/auth.ts:98](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/auth.ts#L98)
