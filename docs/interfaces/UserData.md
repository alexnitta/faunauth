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

[src/types/auth.ts:110](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/auth.ts#L110)

___

### details

• **details**: `Record`<`string`, `string` \| `number` \| `boolean`\>

Any other details about the user

#### Defined in

[src/types/auth.ts:114](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/auth.ts#L114)

___

### email

• **email**: `string`

Email address for the user. This is lower-cased during account creation and when signing the
user in, so it is not case-sensitive.

#### Defined in

[src/types/auth.ts:119](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/auth.ts#L119)

___

### id

• `Optional` **id**: `string`

The user ID - this is auto-generated when the user is created in Fauna.

#### Defined in

[src/types/auth.ts:105](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/auth.ts#L105)

___

### locale

• **locale**: `string`

User's preferred locale code, like 'en-US'

#### Defined in

[src/types/auth.ts:123](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/auth.ts#L123)

___

### username

• **username**: `string`

Optional username for the user. By default, users are signed up by using their email address
as a unique identifier. It's also possible to define a username when signing up so that the
user can login via a username.

#### Defined in

[src/types/auth.ts:129](https://github.com/alexnitta/faunauth/blob/40cc7e0/src/types/auth.ts#L129)
