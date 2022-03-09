[faunauth](../index.md) / ChangePasswordInput

# Interface: ChangePasswordInput

## Table of contents

### Properties

- [email](ChangePasswordInput.md#email)
- [newPassword](ChangePasswordInput.md#newpassword)
- [oldPassword](ChangePasswordInput.md#oldpassword)
- [publicFaunaKey](ChangePasswordInput.md#publicfaunakey)

## Properties

### email

• **email**: `string`

The user's email address

#### Defined in

[src/auth/changePassword.ts:10](https://github.com/alexnitta/faunauth/blob/2cd7813/src/auth/changePassword.ts#L10)

___

### newPassword

• **newPassword**: `string`

The desired password

#### Defined in

[src/auth/changePassword.ts:14](https://github.com/alexnitta/faunauth/blob/2cd7813/src/auth/changePassword.ts#L14)

___

### oldPassword

• **oldPassword**: `string`

The current password

#### Defined in

[src/auth/changePassword.ts:18](https://github.com/alexnitta/faunauth/blob/2cd7813/src/auth/changePassword.ts#L18)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[src/auth/changePassword.ts:23](https://github.com/alexnitta/faunauth/blob/2cd7813/src/auth/changePassword.ts#L23)
