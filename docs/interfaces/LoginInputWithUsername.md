[faunauth](../index.md) / LoginInputWithUsername

# Interface: LoginInputWithUsername

## Hierarchy

- [`BaseLoginInput`](BaseLoginInput.md)

  ↳ **`LoginInputWithUsername`**

## Table of contents

### Properties

- [clientConfig](LoginInputWithUsername.md#clientconfig)
- [password](LoginInputWithUsername.md#password)
- [publicFaunaKey](LoginInputWithUsername.md#publicfaunakey)
- [username](LoginInputWithUsername.md#username)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Inherited from

[BaseLoginInput](BaseLoginInput.md).[clientConfig](BaseLoginInput.md#clientconfig)

#### Defined in

[auth/login.ts:11](https://github.com/alexnitta/faunauth/blob/b462f3a/src/auth/login.ts#L11)

___

### password

• **password**: `string`

The user's password

#### Inherited from

[BaseLoginInput](BaseLoginInput.md).[password](BaseLoginInput.md#password)

#### Defined in

[auth/login.ts:20](https://github.com/alexnitta/faunauth/blob/b462f3a/src/auth/login.ts#L20)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Inherited from

[BaseLoginInput](BaseLoginInput.md).[publicFaunaKey](BaseLoginInput.md#publicfaunakey)

#### Defined in

[auth/login.ts:16](https://github.com/alexnitta/faunauth/blob/b462f3a/src/auth/login.ts#L16)

___

### username

• **username**: `string`

Username for the user who wants to sign in

#### Defined in

[auth/login.ts:34](https://github.com/alexnitta/faunauth/blob/b462f3a/src/auth/login.ts#L34)
