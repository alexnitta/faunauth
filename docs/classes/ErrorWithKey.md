[faunauth](../none) / [Exports](../modules.md) / ErrorWithKey

# Class: ErrorWithKey

A custom error class that has a `.key` property. This allows us to read `error.key` as a way to
translate an error into a locale-specific message.

**`property`** key - the unique key for this kind of error. This will be used to look up a message
from the `keyedErrors` constant.

**`property`** apiError - the error thrown by a third-party API, if any

## Hierarchy

- `Error`

  ↳ **`ErrorWithKey`**

## Table of contents

### Constructors

- [constructor](ErrorWithKey.md#constructor)

### Properties

- [\_\_proto\_\_](ErrorWithKey.md#__proto__)
- [apiError](ErrorWithKey.md#apierror)
- [key](ErrorWithKey.md#key)
- [message](ErrorWithKey.md#message)
- [name](ErrorWithKey.md#name)
- [stack](ErrorWithKey.md#stack)
- [prepareStackTrace](ErrorWithKey.md#preparestacktrace)
- [stackTraceLimit](ErrorWithKey.md#stacktracelimit)

### Methods

- [captureStackTrace](ErrorWithKey.md#capturestacktrace)

## Constructors

### constructor

• **new ErrorWithKey**(`key`, `apiError?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`ErrorKey`](../modules.md#errorkey) |
| `apiError?` | `Error` |

#### Overrides

Error.constructor

#### Defined in

[src/utils/ErrorWithKey.ts:21](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/utils/ErrorWithKey.ts#L21)

## Properties

### \_\_proto\_\_

• **\_\_proto\_\_**: `Error`

#### Defined in

[src/utils/ErrorWithKey.ts:19](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/utils/ErrorWithKey.ts#L19)

___

### apiError

• `Optional` **apiError**: `Error`

#### Defined in

[src/utils/ErrorWithKey.ts:16](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/utils/ErrorWithKey.ts#L16)

___

### key

• **key**: `string`

#### Defined in

[src/utils/ErrorWithKey.ts:14](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/utils/ErrorWithKey.ts#L14)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: `string`

#### Overrides

Error.name

#### Defined in

[src/utils/ErrorWithKey.ts:12](https://github.com/alexnitta/faunauth/blob/6bb89cc/src/utils/ErrorWithKey.ts#L12)

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
