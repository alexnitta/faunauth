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

[auth/registerAdmin.ts:21](https://github.com/alexnitta/faunauth/blob/4737095/src/auth/registerAdmin.ts#L21)

___

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[auth/registerAdmin.ts:17](https://github.com/alexnitta/faunauth/blob/4737095/src/auth/registerAdmin.ts#L17)

___

### password

• **password**: `string`

Password for the new user

#### Defined in

[auth/registerAdmin.ts:25](https://github.com/alexnitta/faunauth/blob/4737095/src/auth/registerAdmin.ts#L25)

___

### userData

• **userData**: [`UserData`](UserData.md)

Details for the new user - see [UserData](UserData.md)

#### Defined in

[auth/registerAdmin.ts:29](https://github.com/alexnitta/faunauth/blob/4737095/src/auth/registerAdmin.ts#L29)
