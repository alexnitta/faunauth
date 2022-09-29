[faunauth](../index.md) / RegisterAdminInput

# Interface: RegisterAdminInput

## Table of contents

### Properties

- [adminKey](RegisterAdminInput.md#adminkey)
- [clientConfig](RegisterAdminInput.md#clientconfig)
- [password](RegisterAdminInput.md#password)
- [userData](RegisterAdminInput.md#userdata)

## Properties

### adminKey

• **adminKey**: `string`

A Fauna secret that has "admin" permissions

#### Defined in

[auth/registerAdmin.ts:20](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/registerAdmin.ts#L20)

___

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/registerAdmin.ts:16](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/registerAdmin.ts#L16)

___

### password

• **password**: `string`

Password for the new user

#### Defined in

[auth/registerAdmin.ts:24](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/registerAdmin.ts#L24)

___

### userData

• **userData**: [`UserDataInput`](../index.md#userdatainput)

Details for the new user - see [UserDataInput](../index.md#userdatainput)

#### Defined in

[auth/registerAdmin.ts:28](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/registerAdmin.ts#L28)
