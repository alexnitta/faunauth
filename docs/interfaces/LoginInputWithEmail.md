[faunauth](../index.md) / LoginInputWithEmail

# Interface: LoginInputWithEmail

## Hierarchy

- [`BaseLoginInput`](BaseLoginInput.md)

  ↳ **`LoginInputWithEmail`**

## Table of contents

### Properties

- [email](LoginInputWithEmail.md#email)
- [password](LoginInputWithEmail.md#password)
- [publicFaunaKey](LoginInputWithEmail.md#publicfaunakey)

## Properties

### email

• **email**: `string`

Email address for the user who wants to sign in

#### Defined in

[src/auth/login.ts:22](https://github.com/alexnitta/faunauth/blob/b9d71a1/src/auth/login.ts#L22)

___

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
