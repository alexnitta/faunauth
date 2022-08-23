[faunauth](../index.md) / CreateOrUpdateUserRoleInput

# Interface: CreateOrUpdateUserRoleInput

## Table of contents

### Properties

- [clientConfig](CreateOrUpdateUserRoleInput.md#clientconfig)
- [faunaAdminKey](CreateOrUpdateUserRoleInput.md#faunaadminkey)
- [privileges](CreateOrUpdateUserRoleInput.md#privileges)
- [roleName](CreateOrUpdateUserRoleInput.md#rolename)

## Properties

### clientConfig

• `Optional` **clientConfig**: `Omit`<`ClientConfig`, ``"secret"``\>

Fauna client config object

#### Defined in

[utils/createOrUpdateUserRole.ts:11](https://github.com/alexnitta/faunauth/blob/8d66af9/src/utils/createOrUpdateUserRole.ts#L11)

___

### faunaAdminKey

• **faunaAdminKey**: `string`

A Fauna key that has the built-in role of "Admin"

#### Defined in

[utils/createOrUpdateUserRole.ts:15](https://github.com/alexnitta/faunauth/blob/8d66af9/src/utils/createOrUpdateUserRole.ts#L15)

___

### privileges

• **privileges**: `ExprVal`[]

Array of privileges to grant to every user.

#### Defined in

[utils/createOrUpdateUserRole.ts:19](https://github.com/alexnitta/faunauth/blob/8d66af9/src/utils/createOrUpdateUserRole.ts#L19)

___

### roleName

• `Optional` **roleName**: `string`

A name for this role; defaults to "user".

#### Defined in

[utils/createOrUpdateUserRole.ts:23](https://github.com/alexnitta/faunauth/blob/8d66af9/src/utils/createOrUpdateUserRole.ts#L23)
