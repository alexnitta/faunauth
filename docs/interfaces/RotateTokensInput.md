[faunauth](../index.md) / RotateTokensInput

# Interface: RotateTokensInput

## Table of contents

### Properties

- [clientConfig](RotateTokensInput.md#clientconfig)
- [refreshSecret](RotateTokensInput.md#refreshsecret)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/rotateTokens.ts:11](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/auth/rotateTokens.ts#L11)

___

### refreshSecret

• **refreshSecret**: `string`

A token that can be used to authenticate further Fauna requests. Fauna's docs refer to this
as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[auth/rotateTokens.ts:16](https://github.com/alexnitta/faunauth/blob/d9bf6c1/src/auth/rotateTokens.ts#L16)
