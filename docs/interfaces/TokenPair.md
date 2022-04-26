[faunauth](../index.md) / TokenPair

# Interface: TokenPair

## Table of contents

### Properties

- [accessToken](TokenPair.md#accesstoken)
- [refreshToken](TokenPair.md#refreshtoken)

## Properties

### accessToken

• **accessToken**: `string`

A token that can be used to authenticate further requests against the public Fauna APIs.
Fauna's docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[types/auth.ts:98](https://github.com/alexnitta/faunauth/blob/13b973e/src/types/auth.ts#L98)

___

### refreshToken

• **refreshToken**: `string`

A token that can be used to acquire a new pair of accessToken / refreshToken values. Fauna's
docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[types/auth.ts:103](https://github.com/alexnitta/faunauth/blob/13b973e/src/types/auth.ts#L103)
