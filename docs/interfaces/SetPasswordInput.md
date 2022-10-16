[faunauth](../index.md) / SetPasswordInput

# Interface: SetPasswordInput

## Table of contents

### Properties

- [clientConfig](SetPasswordInput.md#clientconfig)
- [email](SetPasswordInput.md#email)
- [password](SetPasswordInput.md#password)
- [publicFaunaKey](SetPasswordInput.md#publicfaunakey)
- [token](SetPasswordInput.md#token)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/setPassword.ts:14](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/setPassword.ts#L14)

___

### email

• **email**: `string`

Email address for the user who wants to reset their password

#### Defined in

[auth/setPassword.ts:18](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/setPassword.ts#L18)

___

### password

• **password**: `string`

New password to use

#### Defined in

[auth/setPassword.ts:27](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/setPassword.ts#L27)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[auth/setPassword.ts:23](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/setPassword.ts#L23)

___

### token

• **token**: `string`

Token that was previously created in the database

#### Defined in

[auth/setPassword.ts:31](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/setPassword.ts#L31)
