[faunauth](../index.md) / BaseLoginInput

# Interface: BaseLoginInput

## Hierarchy

- **`BaseLoginInput`**

  ↳ [`LoginInputWithEmail`](LoginInputWithEmail.md)

  ↳ [`LoginInputWithUsername`](LoginInputWithUsername.md)

## Table of contents

### Properties

- [password](BaseLoginInput.md#password)
- [publicFaunaKey](BaseLoginInput.md#publicfaunakey)

## Properties

### password

• **password**: `string`

New password to use

#### Defined in

[src/auth/login.ts:15](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/auth/login.ts#L15)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[src/auth/login.ts:11](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/auth/login.ts#L11)
