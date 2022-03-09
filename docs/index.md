faunauth

# faunauth

## Table of contents

### Classes

-   [ErrorWithKey](classes/ErrorWithKey.md)

### Interfaces

-   [AuthInputWithCustomEmail](interfaces/AuthInputWithCustomEmail.md)
-   [AuthInputWithEmailTemplate](interfaces/AuthInputWithEmailTemplate.md)
-   [AuthWithCustomEmailResult](interfaces/AuthWithCustomEmailResult.md)
-   [AuthWithEmailTemplateResult](interfaces/AuthWithEmailTemplateResult.md)
-   [BaseAuthEmailResult](interfaces/BaseAuthEmailResult.md)
-   [BaseLoginInput](interfaces/BaseLoginInput.md)
-   [BaseRegisterInput](interfaces/BaseRegisterInput.md)
-   [BaseRequestPasswordResetInput](interfaces/BaseRequestPasswordResetInput.md)
-   [ChangePasswordInput](interfaces/ChangePasswordInput.md)
-   [ClientLoginResult](interfaces/ClientLoginResult.md)
-   [CollectionQueryResult](interfaces/CollectionQueryResult.md)
-   [CollectionQueryResultMap](interfaces/CollectionQueryResultMap.md)
-   [CreateOrUpdateUserRoleInput](interfaces/CreateOrUpdateUserRoleInput.md)
-   [EmailTemplateConfig](interfaces/EmailTemplateConfig.md)
-   [EmailTemplateInput](interfaces/EmailTemplateInput.md)
-   [EmailTemplateLocale](interfaces/EmailTemplateLocale.md)
-   [FaunaGraphQLResponse](interfaces/FaunaGraphQLResponse.md)
-   [FaunaLoginResult](interfaces/FaunaLoginResult.md)
-   [FaunaRefreshResult](interfaces/FaunaRefreshResult.md)
-   [LoginInputWithEmail](interfaces/LoginInputWithEmail.md)
-   [LoginInputWithUsername](interfaces/LoginInputWithUsername.md)
-   [LogoutInput](interfaces/LogoutInput.md)
-   [ResetPasswordInput](interfaces/ResetPasswordInput.md)
-   [RotateTokensInput](interfaces/RotateTokensInput.md)
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

-   [AuthEmailResult](index.md#authemailresult)
-   [ErrorKey](index.md#errorkey)
-   [LoginInput](index.md#logininput)
-   [Maybe](index.md#maybe)
-   [RegisterInput](index.md#registerinput)
-   [RequestPasswordResetInput](index.md#requestpasswordresetinput)
-   [SendCustomEmail](index.md#sendcustomemail)
-   [SendEmailFromTemplate](index.md#sendemailfromtemplate)

### Functions

-   [changePassword](index.md#changepassword)
-   [createOrUpdateUserRole](index.md#createorupdateuserrole)
-   [getEmailContent](index.md#getemailcontent)
-   [login](index.md#login)
-   [logout](index.md#logout)
-   [register](index.md#register)
-   [requestPasswordReset](index.md#requestpasswordreset)
-   [resetPassword](index.md#resetpassword)
-   [rotateTokens](index.md#rotatetokens)
-   [updateUser](index.md#updateuser)

## Type aliases

### AuthEmailResult

Ƭ **AuthEmailResult**<`SendEmailResult`\>: [`BaseAuthEmailResult`](interfaces/BaseAuthEmailResult.md) & [`AuthWithEmailTemplateResult`](interfaces/AuthWithEmailTemplateResult.md)<`SendEmailResult`\> \| [`AuthWithCustomEmailResult`](interfaces/AuthWithCustomEmailResult.md)<`SendEmailResult`\>

#### Type parameters

| Name              |
| :---------------- |
| `SendEmailResult` |

#### Defined in

[src/types/email.ts:167](https://github.com/alexnitta/faunauth/blob/380e952/src/types/email.ts#L167)

---

### ErrorKey

Ƭ **ErrorKey**: `"accessTokenMissing"` \| `"emailNotConfirmed"` \| `"emailOrPasswordMissing"` \| `"errorWhenInvalidatingTokens"` \| `"failedToAuthenticateWithNewPassword"` \| `"failedToSetPassword"` \| `"failedToSetPassword"` \| `"failedToCreateToken"` \| `"failedToCreateTokenAndSendEmail"` \| `"failedToRefreshToken"` \| `"failedToSendEmail"` \| `"failedToLogout"` \| `"failedToUpdateUser"` \| `"publicFaunaKeyMissing"` \| `"invalidToken"` \| `"invalidUserOrPassword"` \| `"notAuthenticated"` \| `"refreshTokenLockout"` \| `"refreshTokenMissing"` \| `"tokensNotFound"` \| `"userAlreadyExists"` \| `"userDoesNotExist"` \| `"userRefIsMissing"` \| `"queryError"`

#### Defined in

[src/types/errors.ts:1](https://github.com/alexnitta/faunauth/blob/380e952/src/types/errors.ts#L1)

---

### LoginInput

Ƭ **LoginInput**: [`LoginInputWithEmail`](interfaces/LoginInputWithEmail.md) \| [`LoginInputWithUsername`](interfaces/LoginInputWithUsername.md)

#### Defined in

[src/auth/login.ts:32](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/login.ts#L32)

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

[src/types/general.ts:5](https://github.com/alexnitta/faunauth/blob/380e952/src/types/general.ts#L5)

---

### RegisterInput

Ƭ **RegisterInput**<`SendEmailResult`\>: [`BaseRegisterInput`](interfaces/BaseRegisterInput.md) & [`AuthInputWithEmailTemplate`](interfaces/AuthInputWithEmailTemplate.md)<`SendEmailResult`\> \| [`AuthInputWithCustomEmail`](interfaces/AuthInputWithCustomEmail.md)<`SendEmailResult`\>

#### Type parameters

| Name              |
| :---------------- |
| `SendEmailResult` |

#### Defined in

[src/auth/register.ts:37](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/register.ts#L37)

---

### RequestPasswordResetInput

Ƭ **RequestPasswordResetInput**<`SendEmailResult`\>: [`BaseRequestPasswordResetInput`](interfaces/BaseRequestPasswordResetInput.md) & [`AuthInputWithEmailTemplate`](interfaces/AuthInputWithEmailTemplate.md)<`SendEmailResult`\> \| [`AuthInputWithCustomEmail`](interfaces/AuthInputWithCustomEmail.md)<`SendEmailResult`\>

#### Type parameters

| Name              |
| :---------------- |
| `SendEmailResult` |

#### Defined in

[src/auth/requestPasswordReset.ts:33](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/requestPasswordReset.ts#L33)

---

### SendCustomEmail

Ƭ **SendCustomEmail**<`SendCustomEmailResult`\>: (`callbackUrl`: `string`) => `Promise`<`SendCustomEmailResult`\>

#### Type parameters

| Name                    |
| :---------------------- |
| `SendCustomEmailResult` |

#### Type declaration

▸ (`callbackUrl`): `Promise`<`SendCustomEmailResult`\>

Async function for sending an email; accepts a callback URL and returns a Promise
that resolves to the generic \`<SendCustomEmailResult>\`. Use this when you want to provide your
own email template logic.

**`remarks`**
Typically this will a wrapper around something like
[https://www.npmjs.com/package/@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail). If using \@sendgrid/mail as `sgMail`, you
will need to set an API key using `sgMail.setApiKey('API_KEY')` before passing in `sgMail` as a
`SendCustomEmail` function.

##### Parameters

| Name          | Type     |
| :------------ | :------- |
| `callbackUrl` | `string` |

##### Returns

`Promise`<`SendCustomEmailResult`\>

#### Defined in

[src/types/email.ts:121](https://github.com/alexnitta/faunauth/blob/380e952/src/types/email.ts#L121)

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
that resolves to the generic \`<SendEmailFromTemplateResult>\`. Use this when you want to send
emails with the built-in template system provided by faunauth.

**`remarks`**
Typically this will be a wrapper around something like
[https://www.npmjs.com/package/@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail). If using \@sendgrid/mail as `sgMail`, you
will need to set an API key using `sgMail.setApiKey('API_KEY')` before passing in `sgMail` as a
`SendEmailFromTemplate` function.

##### Parameters

| Name    | Type                                                     |
| :------ | :------------------------------------------------------- |
| `input` | [`EmailTemplateInput`](interfaces/EmailTemplateInput.md) |

##### Returns

`Promise`<`SendEmailFromTemplateResult`\>

#### Defined in

[src/types/email.ts:107](https://github.com/alexnitta/faunauth/blob/380e952/src/types/email.ts#L107)

## Functions

### changePassword

▸ **changePassword**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Change the password for a user who knows their old password.

#### Parameters

| Name    | Type                                                       |
| :------ | :--------------------------------------------------------- |
| `input` | [`ChangePasswordInput`](interfaces/ChangePasswordInput.md) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

-   [ServerLoginResult](interfaces/ServerLoginResult.md)

#### Defined in

[src/auth/changePassword.ts:30](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/changePassword.ts#L30)

---

### createOrUpdateUserRole

▸ **createOrUpdateUserRole**(`__namedParameters`): `Promise`<`void`\>

Create or update a Fauna role that is scoped appropriately for a user. You will need to call
this function with a `privileges` array that is populated for your particular database structure.
A good way to do this is by creating a script that calls `createOrUpdateUserRole` and passes in
the privileges that your app requires. Then you can call your script when you need to set up the
role, allowing you to save your permissions in a reproducible form.

Here is an example of a script that calls `createOrUpdateUserRole`:

```JavaScript
// scripts/setUpUserRole.js

// Read more on how dotenv works here: https://github.com/motdotla/dotenv
require('dotenv').config();

const { exit } = require('process');
const { Collection, Index } = require('faunadb');
const { createOrUpdateUserRole } = require('faunauth');

const faunaAdminKey = process.env.FAUNA_ADMIN_KEY;

// Create a FaunaDB role that is scoped appropriately for a user.
const main = async () => {
if (!faunaAdminKey) {
console.error('process.env.FAUNA_ADMIN_KEY is missing, closing');

exit(1);
}

try {
await createOrUpdateUserRole({
faunaAdminKey,
roleName: 'user',
privileges: [
{
resource: Collection('Person'),
actions: {
create: true,
read: true,
delete: true,
write: true,
},
},
// ... more privileges go here
],
});
} catch(err) {
console.error('createOrUpdateUserRole threw error:\n', err);

exit(1);
}

exit(0);
};

main();
```

You could then set up a package.json script that calls this function, ie:

```JSON
 {
     scripts: {
         set-up-user-role: "node scripts/setUpUserRole.js";
     }
 }
```

#### Parameters

| Name                | Type                                                                       |
| :------------------ | :------------------------------------------------------------------------- |
| `__namedParameters` | [`CreateOrUpdateUserRoleInput`](interfaces/CreateOrUpdateUserRoleInput.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/createOrUpdateUserRole.ts:88](https://github.com/alexnitta/faunauth/blob/380e952/src/utils/createOrUpdateUserRole.ts#L88)

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

[src/email/getEmailContent.ts:12](https://github.com/alexnitta/faunauth/blob/380e952/src/email/getEmailContent.ts#L12)

---

### login

▸ **login**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Log a user in. The input can include either an `email` or a `username` in order to identify the
user. The returned data will include an `accessToken`, `refreshToken` and `user` object including
the user's `id` as well as any other data on the User document.

#### Parameters

| Name    | Type                                | Description                       |
| :------ | :---------------------------------- | :-------------------------------- |
| `input` | [`LoginInput`](index.md#logininput) | [LoginInput](index.md#logininput) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

-   {@link LoginResult}

#### Defined in

[src/auth/login.ts:41](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/login.ts#L41)

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

[src/auth/logout.ts:22](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/logout.ts#L22)

---

### register

▸ **register**<`SendEmailResult`\>(`input`): `Promise`<[`AuthEmailResult`](index.md#authemailresult)<`SendEmailResult`\>\>

Register a user by creating a user in the User collection and sending the user an email with a
confirmation link that will can be used to confirm their account. A unique `input.userData.email`
is required. If desired, you can provide a unique username on `input.userData.username`. If you
do this (or if you later modify the user by adding a username to its `data` property), you can
call the `login` function with the username rather than the email.

**`remarks`**
You can either use the built-in email template system by passing in an input that conforms to
[AuthInputWithEmailTemplate](interfaces/AuthInputWithEmailTemplate.md), or create your own email template by passing in an input that
conforms to [AuthInputWithCustomEmail](interfaces/AuthInputWithCustomEmail.md).

#### Type parameters

| Name              |
| :---------------- |
| `SendEmailResult` |

#### Parameters

| Name    | Type                                                          |
| :------ | :------------------------------------------------------------ |
| `input` | [`RegisterInput`](index.md#registerinput)<`SendEmailResult`\> |

#### Returns

`Promise`<[`AuthEmailResult`](index.md#authemailresult)<`SendEmailResult`\>\>

-   {@link RegisterResult}

#### Defined in

[src/auth/register.ts:56](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/register.ts#L56)

---

### requestPasswordReset

▸ **requestPasswordReset**<`SendEmailResult`\>(`input`): `Promise`<[`AuthEmailResult`](index.md#authemailresult)<`SendEmailResult`\>\>

Initiate the "forgot password" process for a user who doesn't know their old password by setting
a token in the database, then sending an email with a link that includes the token. Upon clicking
the link, `completePasswordReset` will need to be invoked with the token to completed the process
and allow the user to log in with their new password.

**`remarks`**
You can either use the built-in email template system by passing in an input that conforms to
[AuthInputWithEmailTemplate](interfaces/AuthInputWithEmailTemplate.md), or create your own email template by passing in an input that
conforms to [AuthInputWithCustomEmail](interfaces/AuthInputWithCustomEmail.md).

#### Type parameters

| Name              |
| :---------------- |
| `SendEmailResult` |

#### Parameters

| Name    | Type                                                                                  |
| :------ | :------------------------------------------------------------------------------------ |
| `input` | [`RequestPasswordResetInput`](index.md#requestpasswordresetinput)<`SendEmailResult`\> |

#### Returns

`Promise`<[`AuthEmailResult`](index.md#authemailresult)<`SendEmailResult`\>\>

-   {@link RequestPasswordResetResult}

#### Defined in

[src/auth/requestPasswordReset.ts:52](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/requestPasswordReset.ts#L52)

---

### resetPassword

▸ **resetPassword**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

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

[src/auth/resetPassword.ts:38](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/resetPassword.ts#L38)

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

[src/auth/rotateTokens.ts:19](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/rotateTokens.ts#L19)

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

[src/auth/updateUser.ts:27](https://github.com/alexnitta/faunauth/blob/380e952/src/auth/updateUser.ts#L27)
