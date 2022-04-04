[faunauth](../index.md) / CreateOrUpdateUserRoleInput

# Interface: CreateOrUpdateUserRoleInput

## Table of contents

### Properties

- [faunaAdminKey](CreateOrUpdateUserRoleInput.md#faunaadminkey)
- [privileges](CreateOrUpdateUserRoleInput.md#privileges)
- [roleName](CreateOrUpdateUserRoleInput.md#rolename)

## Properties

### faunaAdminKey

• **faunaAdminKey**: `string`

A Fauna key that has the built-in role of "Admin"

#### Defined in

[utils/createOrUpdateUserRole.ts:10](https://github.com/alexnitta/faunauth/blob/31b65b8/src/utils/createOrUpdateUserRole.ts#L10)

___

### privileges

• **privileges**: `ExprVal`[]

Array of privileges to grant to every user.

#### Defined in

[utils/createOrUpdateUserRole.ts:14](https://github.com/alexnitta/faunauth/blob/31b65b8/src/utils/createOrUpdateUserRole.ts#L14)

___

### roleName

• `Optional` **roleName**: `string`

A name for this role; defaults to "user".

#### Defined in

[utils/createOrUpdateUserRole.ts:18](https://github.com/alexnitta/faunauth/blob/31b65b8/src/utils/createOrUpdateUserRole.ts#L18)
