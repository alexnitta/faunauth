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

[src/auth/setPassword.ts:11](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/auth/setPassword.ts#L11)

___

### email

• **email**: `string`

Email address for the user who wants to reset their password

#### Defined in

[src/auth/setPassword.ts:15](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/auth/setPassword.ts#L15)

___

### password

• **password**: `string`

New password to use

#### Defined in

[src/auth/setPassword.ts:24](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/auth/setPassword.ts#L24)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[src/auth/setPassword.ts:20](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/auth/setPassword.ts#L20)

___

### token

• **token**: `string`

Token that was previously created in the database

#### Defined in

[src/auth/setPassword.ts:28](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/auth/setPassword.ts#L28)
