faunauth

# faunauth

## Table of contents

### Classes

-   [ErrorWithKey](classes/ErrorWithKey.md)

### Interfaces

-   [EmailTemplateConfig](interfaces/EmailTemplateConfig.md)
-   [EmailTemplateLocale](interfaces/EmailTemplateLocale.md)
-   [ChangePasswordInput](interfaces/ChangePasswordInput.md)
-   [ClientLoginResult](interfaces/ClientLoginResult.md)
-   [CollectionQueryResult](interfaces/CollectionQueryResult.md)
-   [CollectionQueryResultMap](interfaces/CollectionQueryResultMap.md)
-   [FaunaGraphQLResponse](interfaces/FaunaGraphQLResponse.md)
-   [FaunaLoginResult](interfaces/FaunaLoginResult.md)
-   [FaunaRefreshResult](interfaces/FaunaRefreshResult.md)
-   [LogoutInput](interfaces/LogoutInput.md)
-   [RegisterInput](interfaces/RegisterInput.md)
-   [RegisterResult](interfaces/RegisterResult.md)
-   [RequestPasswordResetInput](interfaces/RequestPasswordResetInput.md)
-   [RequestPasswordResetResult](interfaces/RequestPasswordResetResult.md)
-   [ResetPasswordInput](interfaces/ResetPasswordInput.md)
-   [RotateTokensInput](interfaces/RotateTokensInput.md)
-   [EmailTemplateInput](interfaces/EmailTemplateInput.md)
-   [ServerLoginResult](interfaces/ServerLoginResult.md)
-   [Token](interfaces/Token.md)
-   [TokenCollectionQueryResult](interfaces/TokenCollectionQueryResult.md)
-   [TokenPair](interfaces/TokenPair.md)
-   [TokenQueryResult](interfaces/TokenQueryResult.md)
-   [TokenResult](interfaces/TokenResult.md)
-   [UpdateUserInput](interfaces/UpdateUserInput.md)
-   [UpdateUserResult](interfaces/UpdateUserResult.md)
-   [UserData](interfaces/UserData.md)

### Type aliases

-   [ErrorKey](README.md#errorkey)
-   [LoginInput](README.md#logininput)
-   [Maybe](README.md#maybe)
-   [SendEmailFromTemplate](README.md#sendemail)

### Functions

-   [changePassword](README.md#changepassword)
-   [getEmailContent](README.md#getemailcontent)
-   [login](README.md#login)
-   [logout](README.md#logout)
-   [register](README.md#register)
-   [requestPasswordReset](README.md#requestpasswordreset)
-   [setPassword](README.md#resetpassword)
-   [rotateTokens](README.md#rotatetokens)
-   [updateUser](README.md#updateuser)

## Type aliases

### ErrorKey

Ƭ **ErrorKey**: `"accessTokenMissing"` \| `"emailNotConfirmed"` \| `"emailOrPasswordMissing"` \| `"errorWhenInvalidatingTokens"` \| `"failedToAuthenticateWithNewPassword"` \| `"failedToSetPassword"` \| `"failedToSetPassword"` \| `"failedToCreateToken"` \| `"failedToCreateTokenAndSendEmailFromTemplate"` \| `"failedToRefreshToken"` \| `"failedToSendEmailFromTemplate"` \| `"failedToLogout"` \| `"failedToUpdateUser"` \| `"publicFaunaKeyMissing"` \| `"invalidToken"` \| `"invalidUserOrPassword"` \| `"notAuthenticated"` \| `"refreshTokenLockout"` \| `"refreshTokenMissing"` \| `"tokensNotFound"` \| `"userAlreadyExists"` \| `"userDoesNotExist"` \| `"userRefIsMissing"` \| `"queryError"`

#### Defined in

[src/types/errors.ts:1](https://github.com/alexnitta/faunauth/blob/aaffd52/src/types/errors.ts#L1)

---

### LoginInput

Ƭ **LoginInput**: `LoginInputWithEmail` \| `LoginInputWithUsername`

#### Defined in

[src/auth/login.ts:32](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/login.ts#L32)

---

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| `null`

[graphql-code-generator](https://www.graphql-code-generator.com/) generates types that use a
Maybe generic type. To keep things consistent, we're also going to do that here.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

[src/types/general.ts:5](https://github.com/alexnitta/faunauth/blob/aaffd52/src/types/general.ts#L5)

---

### SendEmailFromTemplate

Ƭ **SendEmailFromTemplate**<`SendEmailFromTemplateResult`\>: (`input`: [`EmailTemplateInput`](interfaces/EmailTemplateInput.md)) => `Promise`<`SendEmailFromTemplateResult`\>

#### Type parameters

| Name                          |
| :---------------------------- |
| `SendEmailFromTemplateResult` |

#### Type declaration

▸ (`input`): `Promise`<`SendEmailFromTemplateResult`\>

Async function for sending an email; accepts a [EmailTemplateInput](interfaces/EmailTemplateInput.md) and returns a Promise
that resolves to the generic <SendEmailFromTemplateResult>.

**`remarks`**
Typically this will be something like [https://www.npmjs.com/package/@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail).
If using \@sendgrid/mail as `sgMail`, you will need to set an API key using
`sgMail.setApiKey('API_KEY')` before passing in `sgMail` as a `SendMail` function.

##### Parameters

| Name    | Type                                                     |
| :------ | :------------------------------------------------------- |
| `input` | [`EmailTemplateInput`](interfaces/EmailTemplateInput.md) |

##### Returns

`Promise`<`SendEmailFromTemplateResult`\>

#### Defined in

[src/types/email.ts:102](https://github.com/alexnitta/faunauth/blob/aaffd52/src/types/email.ts#L102)

## Functions

### changePassword

▸ **changePassword**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Change the password for a user who knows their old password

#### Parameters

| Name    | Type                                                       |
| :------ | :--------------------------------------------------------- |
| `input` | [`ChangePasswordInput`](interfaces/ChangePasswordInput.md) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

-   [ServerLoginResult](interfaces/ServerLoginResult.md)

#### Defined in

[src/auth/changePassword.ts:17](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/changePassword.ts#L17)

---

### getEmailContent

▸ **getEmailContent**(`input`): `Object`

Returns the HTML template for an authentication email, which will be used to confirm either a
user registration or a password reset.

#### Parameters

| Name    | Type                                                       | Description                                                  |
| :------ | :--------------------------------------------------------- | :----------------------------------------------------------- |
| `input` | [`EmailTemplateConfig`](interfaces/EmailTemplateConfig.md) | see [EmailTemplateConfig](interfaces/EmailTemplateConfig.md) |

#### Returns

`Object`

| Name      | Type     |
| :-------- | :------- |
| `html`    | `string` |
| `subject` | `string` |
| `text`    | `string` |

#### Defined in

[src/email/getEmailContent.ts:12](https://github.com/alexnitta/faunauth/blob/aaffd52/src/email/getEmailContent.ts#L12)

---

### login

▸ **login**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Log a user in. The input can include either an `email` or a `username` in order to identify the
user. The returned data will include an `accessToken`, `refreshToken` and `user` object including
the user's `id` as well as any other data on the User document.

#### Parameters

| Name    | Type                                 | Description                        |
| :------ | :----------------------------------- | :--------------------------------- |
| `input` | [`LoginInput`](README.md#logininput) | [LoginInput](README.md#logininput) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

-   {@link LoginResult}

#### Defined in

[src/auth/login.ts:41](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/login.ts#L41)

---

### logout

▸ **logout**(`input`): `Promise`<`boolean`\>

Log a user out.

#### Parameters

| Name    | Type                                       | Description                              |
| :------ | :----------------------------------------- | :--------------------------------------- |
| `input` | [`LogoutInput`](interfaces/LogoutInput.md) | [LogoutInput](interfaces/LogoutInput.md) |

#### Returns

`Promise`<`boolean`\>

true if user was signed out

#### Defined in

[src/auth/logout.ts:22](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/logout.ts#L22)

---

### register

▸ **register**<`SendEmailFromTemplateResult`\>(`input`): `Promise`<[`RegisterResult`](interfaces/RegisterResult.md)<`SendEmailFromTemplateResult`\>\>

Register a user by creating a user in the User collection and sending the user an email with a
confirmation link that will can be used to confirm their account. A unique `input.userData.email`
is required. If desired, you can provide a unique username on `input.userData.username`. If you
do this (or if you later modify the user by adding a username to its `data` property), you can
call the `login` function with the username rather than the email.

#### Type parameters

| Name                          |
| :---------------------------- |
| `SendEmailFromTemplateResult` |

#### Parameters

| Name    | Type                                                                           |
| :------ | :----------------------------------------------------------------------------- |
| `input` | [`RegisterInput`](interfaces/RegisterInput.md)<`SendEmailFromTemplateResult`\> |

#### Returns

`Promise`<[`RegisterResult`](interfaces/RegisterResult.md)<`SendEmailFromTemplateResult`\>\>

-   [RegisterResult](interfaces/RegisterResult.md)

#### Defined in

[src/auth/register.ts:61](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/register.ts#L61)

---

### requestPasswordReset

▸ **requestPasswordReset**<`SendEmailFromTemplateResult`\>(`input`): `Promise`<[`RequestPasswordResetResult`](interfaces/RequestPasswordResetResult.md)<`SendEmailFromTemplateResult`\>\>

Initiate the "forgot password" process for a user who doesn't know their old password by setting
a token in the database, then sending an email with a link that includes the token. Upon clicking
the link, `completePasswordReset` will need to be invoked with the token to completed the process
and allow the user to log in with their new password.

#### Type parameters

| Name                          |
| :---------------------------- |
| `SendEmailFromTemplateResult` |

#### Parameters

| Name    | Type                                                                                                   |
| :------ | :----------------------------------------------------------------------------------------------------- |
| `input` | [`RequestPasswordResetInput`](interfaces/RequestPasswordResetInput.md)<`SendEmailFromTemplateResult`\> |

#### Returns

`Promise`<[`RequestPasswordResetResult`](interfaces/RequestPasswordResetResult.md)<`SendEmailFromTemplateResult`\>\>

-   [RequestPasswordResetResult](interfaces/RequestPasswordResetResult.md)

#### Defined in

[src/auth/requestPasswordReset.ts:56](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/requestPasswordReset.ts#L56)

---

### setPassword

▸ **setPassword**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Finish either the "register" or "forgot password" flow for a user. At this point,
the user has already triggered either `register` or `requestPasswordReset` to request a token.
The token has been created in the database, and an email has been sent to the user with a link
which includes the token. The user has clicked the link, which opens a page containing a form
input for the new password. This function must then check the token to see an exact match for the
token exists in the database which:

-   has not expired
-   belongs to the user associated with the given email
    If these conditions are met, the given password is used to reset the user's password.

#### Parameters

| Name    | Type                                                     |
| :------ | :------------------------------------------------------- |
| `input` | [`ResetPasswordInput`](interfaces/ResetPasswordInput.md) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

-   [ServerLoginResult](interfaces/ServerLoginResult.md)

#### Defined in

[src/auth/setPassword.ts:38](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/setPassword.ts#L38)

---

### rotateTokens

▸ **rotateTokens**(`input`): `Promise`<[`TokenPair`](interfaces/TokenPair.md)\>

Using the user's current refresh token, get a new pair of access & refresh tokens.

#### Parameters

| Name    | Type                                                   | Description                                          |
| :------ | :----------------------------------------------------- | :--------------------------------------------------- |
| `input` | [`RotateTokensInput`](interfaces/RotateTokensInput.md) | [RotateTokensInput](interfaces/RotateTokensInput.md) |

#### Returns

`Promise`<[`TokenPair`](interfaces/TokenPair.md)\>

the new access and refresh tokens if successful

#### Defined in

[src/auth/rotateTokens.ts:19](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/rotateTokens.ts#L19)

---

### updateUser

▸ **updateUser**(`input`): `Promise`<[`UpdateUserResult`](interfaces/UpdateUserResult.md)\>

Update data for the current user.

#### Parameters

| Name    | Type                                               |
| :------ | :------------------------------------------------- |
| `input` | [`UpdateUserInput`](interfaces/UpdateUserInput.md) |

#### Returns

`Promise`<[`UpdateUserResult`](interfaces/UpdateUserResult.md)\>

a Promise that resolves to the [UpdateUserResult](interfaces/UpdateUserResult.md)

#### Defined in

[src/auth/updateUser.ts:27](https://github.com/alexnitta/faunauth/blob/aaffd52/src/auth/updateUser.ts#L27)
