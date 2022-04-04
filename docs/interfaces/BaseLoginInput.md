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

[auth/login.ts:11](https://github.com/alexnitta/faunauth/blob/31b65b8/src/auth/login.ts#L11)

___

### password

• **password**: `string`

The user's password

#### Defined in

[auth/login.ts:20](https://github.com/alexnitta/faunauth/blob/31b65b8/src/auth/login.ts#L20)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[auth/login.ts:16](https://github.com/alexnitta/faunauth/blob/31b65b8/src/auth/login.ts#L16)
