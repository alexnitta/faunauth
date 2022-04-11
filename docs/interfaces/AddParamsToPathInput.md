[faunauth](../index.md) / AddParamsToPathInput

# Interface: AddParamsToPathInput

## Table of contents

### Properties

- [params](AddParamsToPathInput.md#params)
- [path](AddParamsToPathInput.md#path)

## Properties

### params

• **params**: [`URLParamTuple`](../index.md#urlparamtuple)[]

Array of [URLParamTuple](../index.md#urlparamtuple)s that will be used to create new URL search parameters.

#### Defined in

[utils/addParamsToPath.ts:15](https://github.com/alexnitta/faunauth/blob/d68d595/src/utils/addParamsToPath.ts#L15)

___

### path

• **path**: `string`

A path to add URL search parameters to. Can be a complete URL (starting in 'http://' or
'https://') or a path starting in '/'.

#### Defined in

[utils/addParamsToPath.ts:11](https://github.com/alexnitta/faunauth/blob/d68d595/src/utils/addParamsToPath.ts#L11)
