[faunauth](../index.md) / UserData

# Interface: UserData

## Table of contents

### Properties

- [confirmedEmail](UserData.md#confirmedemail)
- [details](UserData.md#details)
- [email](UserData.md#email)
- [id](UserData.md#id)
- [locale](UserData.md#locale)
- [username](UserData.md#username)

## Properties

### confirmedEmail

• **confirmedEmail**: `boolean`

True when this user's email address has been confirmed after signing up. This is not set to
false if a user requests a password reset.

#### Defined in

[types/auth.ts:132](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/auth.ts#L132)

___

### details

• **details**: `Record`<`string`, `string` \| `number` \| `boolean`\>

Any other application-specific details about the user

#### Defined in

[types/auth.ts:136](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/auth.ts#L136)

___

### email

• **email**: `string`

Email address for the user. This is lower-cased during account creation and when signing the
user in, so it is not case-sensitive.

#### Defined in

[types/auth.ts:141](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/auth.ts#L141)

___

### id

• **id**: `string`

The user ID - this is auto-generated when the user is created in Fauna.

#### Defined in

[types/auth.ts:127](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/auth.ts#L127)

___

### locale

• **locale**: `string`

User's preferred locale code, like 'en-US'

#### Defined in

[types/auth.ts:145](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/auth.ts#L145)

___

### username

• **username**: `string`

Optional username for the user. By default, users are signed up by using their email address
as a unique identifier. It's also possible to define a username when signing up so that the
user can login via a username.

#### Defined in

[types/auth.ts:151](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/auth.ts#L151)
