[faunauth](../index.md) / RequestPasswordResetResult

# Interface: RequestPasswordResetResult<SendEmailResult\>

## Type parameters

| Name |
| :------ |
| `SendEmailResult` |

## Table of contents

### Properties

- [sendEmailResult](RequestPasswordResetResult.md#sendemailresult)
- [tokenCreated](RequestPasswordResetResult.md#tokencreated)

## Properties

### sendEmailResult

• **sendEmailResult**: `SendEmailResult`

Result of sending email

#### Defined in

[src/auth/requestPasswordReset.ts:46](https://github.com/alexnitta/faunauth/blob/f5a1862/src/auth/requestPasswordReset.ts#L46)

___

### tokenCreated

• **tokenCreated**: `boolean`

True if a password reset token was created in database

#### Defined in

[src/auth/requestPasswordReset.ts:42](https://github.com/alexnitta/faunauth/blob/f5a1862/src/auth/requestPasswordReset.ts#L42)
