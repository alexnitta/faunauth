[faunauth](../index.md) / BaseRequestPasswordResetInput

# Interface: BaseRequestPasswordResetInput

## Table of contents

### Properties

- [callbackUrl](BaseRequestPasswordResetInput.md#callbackurl)
- [email](BaseRequestPasswordResetInput.md#email)
- [publicFaunaKey](BaseRequestPasswordResetInput.md#publicfaunakey)

## Properties

### callbackUrl

• **callbackUrl**: `string`

Target URL for the call to action button. A URL parameter called `data` will be appended to
the callback URL which will include a Base64-encoded string containing the email and token.
Your app needs to expose a page at this route that will read the `data` param, decode the
email and token from it, and pass them to the `resetPassword` function.

#### Defined in

[src/auth/requestPasswordReset.ts:21](https://github.com/alexnitta/faunauth/blob/6a0971c/src/auth/requestPasswordReset.ts#L21)

___

### email

• **email**: `string`

Email address for the user who wants to reset their password

#### Defined in

[src/auth/requestPasswordReset.ts:25](https://github.com/alexnitta/faunauth/blob/6a0971c/src/auth/requestPasswordReset.ts#L25)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[src/auth/requestPasswordReset.ts:30](https://github.com/alexnitta/faunauth/blob/6a0971c/src/auth/requestPasswordReset.ts#L30)
