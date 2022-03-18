[faunauth](../index.md) / RotateTokensInput

# Interface: RotateTokensInput

## Table of contents

### Properties

- [refreshToken](RotateTokensInput.md#refreshtoken)

## Properties

### refreshToken

• **refreshToken**: `string`

A token that can be used to authenticate further Fauna requests. Fauna's docs refer to this
as a 'secret'; from the client perspective it's a JWT.

#### Defined in

[src/auth/rotateTokens.ts:11](https://github.com/alexnitta/faunauth/blob/5f9823a/src/auth/rotateTokens.ts#L11)
