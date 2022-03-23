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

[src/auth/register.ts:19](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/auth/register.ts#L19)

___

### password

• **password**: `string`

Password for the new user

#### Defined in

[src/auth/register.ts:28](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/auth/register.ts#L28)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[src/auth/register.ts:24](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/auth/register.ts#L24)

___

### userData

• **userData**: [`UserData`](UserData.md)

Details for the new user - see [UserData](UserData.md)

#### Defined in

[src/auth/register.ts:32](https://github.com/alexnitta/faunauth/blob/7e6e39b/src/auth/register.ts#L32)