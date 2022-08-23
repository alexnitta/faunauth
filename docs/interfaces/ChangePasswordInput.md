[faunauth](../index.md) / ChangePasswordInput

# Interface: ChangePasswordInput

## Table of contents

### Properties

- [clientConfig](ChangePasswordInput.md#clientconfig)
- [email](ChangePasswordInput.md#email)
- [newPassword](ChangePasswordInput.md#newpassword)
- [oldPassword](ChangePasswordInput.md#oldpassword)
- [publicFaunaKey](ChangePasswordInput.md#publicfaunakey)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/changePassword.ts:15](https://github.com/alexnitta/faunauth/blob/baabf83/src/auth/changePassword.ts#L15)

___

### email

• **email**: `string`

The user's email address

#### Defined in

[auth/changePassword.ts:19](https://github.com/alexnitta/faunauth/blob/baabf83/src/auth/changePassword.ts#L19)

___

### newPassword

• **newPassword**: `string`

The desired password

#### Defined in

[auth/changePassword.ts:23](https://github.com/alexnitta/faunauth/blob/baabf83/src/auth/changePassword.ts#L23)

___

### oldPassword

• **oldPassword**: `string`

The current password

#### Defined in

[auth/changePassword.ts:27](https://github.com/alexnitta/faunauth/blob/baabf83/src/auth/changePassword.ts#L27)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[auth/changePassword.ts:32](https://github.com/alexnitta/faunauth/blob/baabf83/src/auth/changePassword.ts#L32)
