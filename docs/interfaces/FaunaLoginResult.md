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

[src/types/auth.ts:53](https://github.com/alexnitta/faunauth/blob/380e952/src/types/auth.ts#L53)

___

### id

• **id**: `string`

#### Defined in

[src/types/auth.ts:54](https://github.com/alexnitta/faunauth/blob/380e952/src/types/auth.ts#L54)

___

### tokens

• **tokens**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `access` | [`TokenResult`](TokenResult.md) |
| `refresh` | [`TokenResult`](TokenResult.md) |

#### Defined in

[src/types/auth.ts:49](https://github.com/alexnitta/faunauth/blob/380e952/src/types/auth.ts#L49)
