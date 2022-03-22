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
- [apiErrors](ErrorWithKey.md#apierrors)
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

• **new ErrorWithKey**(`key`, `apiErrors?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | [`ErrorKey`](../index.md#errorkey) |
| `apiErrors?` | `Error`[] |

#### Overrides

Error.constructor

#### Defined in

[src/utils/ErrorWithKey.ts:25](https://github.com/alexnitta/faunauth/blob/a52671e/src/utils/ErrorWithKey.ts#L25)

## Properties

### \_\_proto\_\_

• **\_\_proto\_\_**: `Error`

#### Defined in

[src/utils/ErrorWithKey.ts:23](https://github.com/alexnitta/faunauth/blob/a52671e/src/utils/ErrorWithKey.ts#L23)

___

### apiErrors

• `Optional` **apiErrors**: `Error`[]

If there were any underlying errors thrown by third-party APIs, they can be included here by
calling `new ErrorWithKey(key, apiErrors)`.

#### Defined in

[src/utils/ErrorWithKey.ts:20](https://github.com/alexnitta/faunauth/blob/a52671e/src/utils/ErrorWithKey.ts#L20)

___

### key

• **key**: `string`

The unique key for this kind of error. In your consuming application, you can use this to
display the error in the user's locale as part of your internationalization logic.

#### Defined in

[src/utils/ErrorWithKey.ts:14](https://github.com/alexnitta/faunauth/blob/a52671e/src/utils/ErrorWithKey.ts#L14)

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

[src/utils/ErrorWithKey.ts:8](https://github.com/alexnitta/faunauth/blob/a52671e/src/utils/ErrorWithKey.ts#L8)

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
