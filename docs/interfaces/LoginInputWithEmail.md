[faunauth](../index.md) / LoginInputWithEmail

# Interface: LoginInputWithEmail

## Hierarchy

- [`BaseLoginInput`](BaseLoginInput.md)

  ↳ **`LoginInputWithEmail`**

## Table of contents

### Properties

- [clientConfig](LoginInputWithEmail.md#clientconfig)
- [email](LoginInputWithEmail.md#email)
- [password](LoginInputWithEmail.md#password)
- [publicFaunaKey](LoginInputWithEmail.md#publicfaunakey)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Inherited from

[BaseLoginInput](BaseLoginInput.md).[clientConfig](BaseLoginInput.md#clientconfig)

#### Defined in

[auth/login.ts:11](https://github.com/alexnitta/faunauth/blob/d68d595/src/auth/login.ts#L11)

___

### email

• **email**: `string`

Email address for the user who wants to sign in

#### Defined in

[auth/login.ts:27](https://github.com/alexnitta/faunauth/blob/d68d595/src/auth/login.ts#L27)

___

### password

• **password**: `string`

The user's password

#### Inherited from

[BaseLoginInput](BaseLoginInput.md).[password](BaseLoginInput.md#password)

#### Defined in

[auth/login.ts:20](https://github.com/alexnitta/faunauth/blob/d68d595/src/auth/login.ts#L20)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Inherited from

[BaseLoginInput](BaseLoginInput.md).[publicFaunaKey](BaseLoginInput.md#publicfaunakey)

#### Defined in

[auth/login.ts:16](https://github.com/alexnitta/faunauth/blob/d68d595/src/auth/login.ts#L16)
