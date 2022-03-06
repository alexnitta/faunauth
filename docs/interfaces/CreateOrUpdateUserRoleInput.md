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

[src/utils/createOrUpdateUserRole.ts:10](https://github.com/alexnitta/faunauth/blob/62fa1d8/src/utils/createOrUpdateUserRole.ts#L10)

___

### privileges

• **privileges**: `ExprVal`[]

Array of privileges to grant to every user.

#### Defined in

[src/utils/createOrUpdateUserRole.ts:14](https://github.com/alexnitta/faunauth/blob/62fa1d8/src/utils/createOrUpdateUserRole.ts#L14)

___

### roleName

• `Optional` **roleName**: `string`

A name for this role; defaults to "user".

#### Defined in

[src/utils/createOrUpdateUserRole.ts:18](https://github.com/alexnitta/faunauth/blob/62fa1d8/src/utils/createOrUpdateUserRole.ts#L18)
