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

[auth/changePassword.ts:11](https://github.com/alexnitta/faunauth/blob/fa844e9/src/auth/changePassword.ts#L11)

___

### email

• **email**: `string`

The user's email address

#### Defined in

[auth/changePassword.ts:15](https://github.com/alexnitta/faunauth/blob/fa844e9/src/auth/changePassword.ts#L15)

___

### newPassword

• **newPassword**: `string`

The desired password

#### Defined in

[auth/changePassword.ts:19](https://github.com/alexnitta/faunauth/blob/fa844e9/src/auth/changePassword.ts#L19)

___

### oldPassword

• **oldPassword**: `string`

The current password

#### Defined in

[auth/changePassword.ts:23](https://github.com/alexnitta/faunauth/blob/fa844e9/src/auth/changePassword.ts#L23)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[auth/changePassword.ts:28](https://github.com/alexnitta/faunauth/blob/fa844e9/src/auth/changePassword.ts#L28)
