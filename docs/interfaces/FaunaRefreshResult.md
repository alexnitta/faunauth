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

[src/types/auth.ts:62](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/auth.ts#L62)

___

### tokens

• **tokens**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `access` | [`TokenResult`](TokenResult.md) |
| `refresh` | [`TokenResult`](TokenResult.md) |

#### Defined in

[src/types/auth.ts:58](https://github.com/alexnitta/faunauth/blob/a52671e/src/types/auth.ts#L58)
