[faunauth](../index.md) / BaseRegisterInput

# Interface: BaseRegisterInput

## Table of contents

### Properties

- [clientConfig](BaseRegisterInput.md#clientconfig)
- [password](BaseRegisterInput.md#password)
- [publicFaunaKey](BaseRegisterInput.md#publicfaunakey)
- [userData](BaseRegisterInput.md#userdata)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/register.ts:22](https://github.com/alexnitta/faunauth/blob/b5e2f1f/src/auth/register.ts#L22)

___

### password

• **password**: `string`

Password for the new user

#### Defined in

[auth/register.ts:31](https://github.com/alexnitta/faunauth/blob/b5e2f1f/src/auth/register.ts#L31)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[auth/register.ts:27](https://github.com/alexnitta/faunauth/blob/b5e2f1f/src/auth/register.ts#L27)

___

### userData

• **userData**: [`UserDataInput`](../index.md#userdatainput)

Details for the new user - see [UserDataInput](../index.md#userdatainput)

#### Defined in

[auth/register.ts:35](https://github.com/alexnitta/faunauth/blob/b5e2f1f/src/auth/register.ts#L35)
