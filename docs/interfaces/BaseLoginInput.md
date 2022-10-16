[faunauth](../index.md) / BaseLoginInput

# Interface: BaseLoginInput

## Hierarchy

- **`BaseLoginInput`**

  ↳ [`LoginInputWithEmail`](LoginInputWithEmail.md)

  ↳ [`LoginInputWithUsername`](LoginInputWithUsername.md)

## Table of contents

### Properties

- [clientConfig](BaseLoginInput.md#clientconfig)
- [password](BaseLoginInput.md#password)
- [publicFaunaKey](BaseLoginInput.md#publicfaunakey)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/login.ts:15](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/login.ts#L15)

___

### password

• **password**: `string`

The user's password

#### Defined in

[auth/login.ts:24](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/login.ts#L24)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[auth/login.ts:20](https://github.com/alexnitta/faunauth/blob/bbbbd0c/src/auth/login.ts#L20)
