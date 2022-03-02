[faunauth](../index.md) / ErrorWithKey

# Class: ErrorWithKey

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
| `key` | [`ErrorKey`](../index.md#errorkey) |
| `apiError?` | `Error` |

#### Overrides

Error.constructor

#### Defined in

[src/utils/ErrorWithKey.ts:24](https://github.com/alexnitta/faunauth/blob/aaffd52/src/utils/ErrorWithKey.ts#L24)

## Properties

### \_\_proto\_\_

• **\_\_proto\_\_**: `Error`

#### Defined in

[src/utils/ErrorWithKey.ts:22](https://github.com/alexnitta/faunauth/blob/aaffd52/src/utils/ErrorWithKey.ts#L22)

___

### apiError

• `Optional` **apiError**: `Error`

If there was an underlying error thrown by a third-party API, it can be included here.

#### Defined in

[src/utils/ErrorWithKey.ts:19](https://github.com/alexnitta/faunauth/blob/aaffd52/src/utils/ErrorWithKey.ts#L19)

___

### key

• **key**: `string`

The unique key for this kind of error. In your consuming application, you can use this to
display the error in the user's locale as part of your internationalization logic.

#### Defined in

[src/utils/ErrorWithKey.ts:14](https://github.com/alexnitta/faunauth/blob/aaffd52/src/utils/ErrorWithKey.ts#L14)

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

The error name - this is always set to "ErrorWithKey"

#### Overrides

Error.name

#### Defined in

[src/utils/ErrorWithKey.ts:8](https://github.com/alexnitta/faunauth/blob/aaffd52/src/utils/ErrorWithKey.ts#L8)

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