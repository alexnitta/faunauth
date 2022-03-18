[faunauth](../index.md) / SetPasswordInput

# Interface: SetPasswordInput

## Table of contents

### Properties

- [email](SetPasswordInput.md#email)
- [password](SetPasswordInput.md#password)
- [publicFaunaKey](SetPasswordInput.md#publicfaunakey)
- [token](SetPasswordInput.md#token)

## Properties

### email

• **email**: `string`

Email address for the user who wants to reset their password

#### Defined in

[src/auth/setPassword.ts:10](https://github.com/alexnitta/faunauth/blob/5f9823a/src/auth/setPassword.ts#L10)

___

### password

• **password**: `string`

New password to use

#### Defined in

[src/auth/setPassword.ts:19](https://github.com/alexnitta/faunauth/blob/5f9823a/src/auth/setPassword.ts#L19)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[src/auth/setPassword.ts:15](https://github.com/alexnitta/faunauth/blob/5f9823a/src/auth/setPassword.ts#L15)

___

### token

• **token**: `string`

Token that was previously created in the database

#### Defined in

[src/auth/setPassword.ts:23](https://github.com/alexnitta/faunauth/blob/5f9823a/src/auth/setPassword.ts#L23)
