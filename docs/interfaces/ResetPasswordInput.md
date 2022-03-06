[faunauth](../index.md) / ResetPasswordInput

# Interface: ResetPasswordInput

## Table of contents

### Properties

- [email](ResetPasswordInput.md#email)
- [password](ResetPasswordInput.md#password)
- [publicFaunaKey](ResetPasswordInput.md#publicfaunakey)
- [token](ResetPasswordInput.md#token)

## Properties

### email

• **email**: `string`

Email address for the user who wants to reset their password

#### Defined in

[src/auth/resetPassword.ts:10](https://github.com/alexnitta/faunauth/blob/70b5ca8/src/auth/resetPassword.ts#L10)

___

### password

• **password**: `string`

New password to use

#### Defined in

[src/auth/resetPassword.ts:19](https://github.com/alexnitta/faunauth/blob/70b5ca8/src/auth/resetPassword.ts#L19)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[src/auth/resetPassword.ts:15](https://github.com/alexnitta/faunauth/blob/70b5ca8/src/auth/resetPassword.ts#L15)

___

### token

• **token**: `string`

Token that was previously created in the database

#### Defined in

[src/auth/resetPassword.ts:23](https://github.com/alexnitta/faunauth/blob/70b5ca8/src/auth/resetPassword.ts#L23)
