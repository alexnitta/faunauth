[faunauth](../index.md) / TokenPair

# Interface: TokenPair

## Table of contents

### Properties

- [accessSecret](TokenPair.md#accesssecret)
- [refreshSecret](TokenPair.md#refreshsecret)

## Properties

### accessSecret

• **accessSecret**: `string`

A secret that can be used to authenticate further requests against the public Fauna APIs.
Fauna's docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[types/auth.ts:114](https://github.com/alexnitta/faunauth/blob/50078b7/src/types/auth.ts#L114)

___

### refreshSecret

• **refreshSecret**: `string`

A secret that can be used to acquire a new pair of accessSecret / refreshSecret values.
Fauna's
docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[types/auth.ts:120](https://github.com/alexnitta/faunauth/blob/50078b7/src/types/auth.ts#L120)
