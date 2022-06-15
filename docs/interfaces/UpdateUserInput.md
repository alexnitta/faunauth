[faunauth](../index.md) / UpdateUserInput

# Interface: UpdateUserInput

## Table of contents

### Properties

- [accessSecret](UpdateUserInput.md#accesssecret)
- [clientConfig](UpdateUserInput.md#clientconfig)
- [data](UpdateUserInput.md#data)
- [userID](UpdateUserInput.md#userid)

## Properties

### accessSecret

• **accessSecret**: `string`

A Fauna secret that was returned after authenticating the user

#### Defined in

[auth/updateUser.ts:13](https://github.com/alexnitta/faunauth/blob/5b231ad/src/auth/updateUser.ts#L13)

___

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/updateUser.ts:17](https://github.com/alexnitta/faunauth/blob/5b231ad/src/auth/updateUser.ts#L17)

___

### data

• **data**: `Record`<`string`, `unknown`\>

Data to update on the user

#### Defined in

[auth/updateUser.ts:21](https://github.com/alexnitta/faunauth/blob/5b231ad/src/auth/updateUser.ts#L21)

___

### userID

• **userID**: `string`

ID of the user to update

#### Defined in

[auth/updateUser.ts:25](https://github.com/alexnitta/faunauth/blob/5b231ad/src/auth/updateUser.ts#L25)
