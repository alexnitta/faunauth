[faunauth](../index.md) / RotateTokensInput

# Interface: RotateTokensInput

## Table of contents

### Properties

- [refreshToken](RotateTokensInput.md#refreshtoken)

## Properties

### refreshToken

• **refreshToken**: `string`

A token that can be used to authenticate further requests against the FaunaDB API. Fauna's
docs refer to this as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[src/auth/rotateTokens.ts:11](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/rotateTokens.ts#L11)
