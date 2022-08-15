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

[auth/register.ts:21](https://github.com/alexnitta/faunauth/blob/c913d73/src/auth/register.ts#L21)

___

### password

• **password**: `string`

Password for the new user

#### Defined in

[auth/register.ts:30](https://github.com/alexnitta/faunauth/blob/c913d73/src/auth/register.ts#L30)

___

### publicFaunaKey

• **publicFaunaKey**: `string`

A Fauna secret that is limited to permissions needed for public actions when creating users
and resetting passwords

#### Defined in

[auth/register.ts:26](https://github.com/alexnitta/faunauth/blob/c913d73/src/auth/register.ts#L26)

___

### userData

• **userData**: [`UserData`](UserData.md)

Details for the new user - see [UserData](UserData.md)

#### Defined in

[auth/register.ts:34](https://github.com/alexnitta/faunauth/blob/c913d73/src/auth/register.ts#L34)
