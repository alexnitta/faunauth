[faunauth](../index.md) / BaseRegisterInput

# Interface: BaseRegisterInput

## Table of contents

### Properties

- [callbackUrl](BaseRegisterInput.md#callbackurl)
- [password](BaseRegisterInput.md#password)
- [publicFaunaKey](BaseRegisterInput.md#publicfaunakey)
- [userData](BaseRegisterInput.md#userdata)

## Properties

### callbackUrl

• **callbackUrl**: `string`

Target URL for the call to action button. A URL parameter called `data` will be appended to
the callback URL which will include a Base64-encoded string containing the email and token.
Your app needs to expose a page at this route that will read the `data` param, decode the
email and token from it, and pass them to the `setPassword` function.

#### Defined in

[src/auth/register.ts:21](https://github.com/alexnitta/faunauth/blob/5f9823a/src/auth/register.ts#L21)

___

### password

• **password**: `string`

Password for the new user

#### Defined in

[src/auth/register.ts:30](https://github.com/alexnitta/faunauth/blob/5f9823a/src/auth/register.ts#L30)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[src/auth/register.ts:26](https://github.com/alexnitta/faunauth/blob/5f9823a/src/auth/register.ts#L26)

___

### userData

• **userData**: [`UserData`](UserData.md)

Details for the new user - see [UserData](UserData.md)

#### Defined in

[src/auth/register.ts:34](https://github.com/alexnitta/faunauth/blob/5f9823a/src/auth/register.ts#L34)
