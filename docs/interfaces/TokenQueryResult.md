[faunauth](../index.md) / TokenQueryResult

# Interface: TokenQueryResult

## Table of contents

### Properties

- [data](TokenQueryResult.md#data)
- [hashed\_secret](TokenQueryResult.md#hashed_secret)
- [instance](TokenQueryResult.md#instance)
- [ref](TokenQueryResult.md#ref)
- [ts](TokenQueryResult.md#ts)
- [ttl](TokenQueryResult.md#ttl)

## Properties

### data

• **data**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `email?` | `string` |
| `loggedOut?` | `boolean` |
| `type` | `string` |
| `used` | `boolean` |

#### Defined in

[types/auth.ts:17](https://github.com/alexnitta/faunauth/blob/fca71dc/src/types/auth.ts#L17)

___

### hashed\_secret

• **hashed\_secret**: `string`

#### Defined in

[types/auth.ts:27](https://github.com/alexnitta/faunauth/blob/fca71dc/src/types/auth.ts#L27)

___

### instance

• **instance**: `default`

#### Defined in

[types/auth.ts:16](https://github.com/alexnitta/faunauth/blob/fca71dc/src/types/auth.ts#L16)

___

### ref

• **ref**: `Ref`

#### Defined in

[types/auth.ts:14](https://github.com/alexnitta/faunauth/blob/fca71dc/src/types/auth.ts#L14)

___

### ts

• **ts**: `number`

#### Defined in

[types/auth.ts:15](https://github.com/alexnitta/faunauth/blob/fca71dc/src/types/auth.ts#L15)

___

### ttl

• **ttl**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `@ts` | `string` |

#### Defined in

[types/auth.ts:23](https://github.com/alexnitta/faunauth/blob/fca71dc/src/types/auth.ts#L23)
