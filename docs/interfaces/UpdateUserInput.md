[faunauth](../index.md) / UpdateUserInput

# Interface: UpdateUserInput

## Table of contents

### Properties

- [accessToken](UpdateUserInput.md#accesstoken)
- [data](UpdateUserInput.md#data)
- [userID](UpdateUserInput.md#userid)

## Properties

### accessToken

• **accessToken**: `string`

A Fauna secret that was returned after authenticating the user

#### Defined in

[src/auth/updateUser.ts:12](https://github.com/alexnitta/faunauth/blob/6a0971c/src/auth/updateUser.ts#L12)

___

### data

• **data**: `Record`<`string`, `unknown`\>

Data to update on the user

#### Defined in

[src/auth/updateUser.ts:16](https://github.com/alexnitta/faunauth/blob/6a0971c/src/auth/updateUser.ts#L16)

___

### userID

• **userID**: `string`

ID of the user to update

#### Defined in

[src/auth/updateUser.ts:20](https://github.com/alexnitta/faunauth/blob/6a0971c/src/auth/updateUser.ts#L20)
