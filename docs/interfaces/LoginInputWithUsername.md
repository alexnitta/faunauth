[faunauth](../index.md) / LoginInputWithUsername

# Interface: LoginInputWithUsername

## Hierarchy

- [`BaseLoginInput`](BaseLoginInput.md)

  ↳ **`LoginInputWithUsername`**

## Table of contents

### Properties

- [password](LoginInputWithUsername.md#password)
- [publicFaunaKey](LoginInputWithUsername.md#publicfaunakey)
- [username](LoginInputWithUsername.md#username)

## Properties

### password

• **password**: `string`

The user's password

#### Inherited from

[BaseLoginInput](BaseLoginInput.md).[password](BaseLoginInput.md#password)

#### Defined in

[src/auth/login.ts:15](https://github.com/alexnitta/faunauth/blob/b9d71a1/src/auth/login.ts#L15)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Inherited from

[BaseLoginInput](BaseLoginInput.md).[publicFaunaKey](BaseLoginInput.md#publicfaunakey)

#### Defined in

[src/auth/login.ts:11](https://github.com/alexnitta/faunauth/blob/b9d71a1/src/auth/login.ts#L11)

___

### username

• **username**: `string`

Username for the user who wants to sign in

#### Defined in

[src/auth/login.ts:29](https://github.com/alexnitta/faunauth/blob/b9d71a1/src/auth/login.ts#L29)
