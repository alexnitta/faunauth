[faunauth](../index.md) / FaunaLoginResult

# Interface: FaunaLoginResult

## Table of contents

### Properties

- [account](FaunaLoginResult.md#account)
- [id](FaunaLoginResult.md#id)
- [tokens](FaunaLoginResult.md#tokens)

## Properties

### account

• **account**: [`CollectionQueryResult`](CollectionQueryResult.md)<[`UserData`](UserData.md)\>

#### Defined in

[types/auth.ts:69](https://github.com/alexnitta/faunauth/blob/8d66af9/src/types/auth.ts#L69)

___

### id

• **id**: `string`

#### Defined in

[types/auth.ts:70](https://github.com/alexnitta/faunauth/blob/8d66af9/src/types/auth.ts#L70)

___

### tokens

• **tokens**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `access` | [`TokenResult`](TokenResult.md) |
| `refresh` | [`TokenResult`](TokenResult.md) |

#### Defined in

[types/auth.ts:65](https://github.com/alexnitta/faunauth/blob/8d66af9/src/types/auth.ts#L65)
