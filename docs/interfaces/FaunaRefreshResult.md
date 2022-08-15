[faunauth](../index.md) / FaunaRefreshResult

# Interface: FaunaRefreshResult

## Table of contents

### Properties

- [account](FaunaRefreshResult.md#account)
- [tokens](FaunaRefreshResult.md#tokens)

## Properties

### account

• **account**: [`CollectionQueryResult`](CollectionQueryResult.md)<[`UserData`](UserData.md)\>

#### Defined in

[types/auth.ts:78](https://github.com/alexnitta/faunauth/blob/c913d73/src/types/auth.ts#L78)

___

### tokens

• **tokens**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `access` | [`TokenResult`](TokenResult.md) |
| `refresh` | [`TokenResult`](TokenResult.md) |

#### Defined in

[types/auth.ts:74](https://github.com/alexnitta/faunauth/blob/c913d73/src/types/auth.ts#L74)
