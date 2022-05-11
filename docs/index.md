faunauth

# faunauth

## Table of contents

### Interfaces

-   [AddParamsToPathInput](interfaces/AddParamsToPathInput.md)
-   [AuthInputWithCustomEmail](interfaces/AuthInputWithCustomEmail.md)
-   [AuthInputWithEmailTemplate](interfaces/AuthInputWithEmailTemplate.md)
-   [BaseLoginInput](interfaces/BaseLoginInput.md)
-   [BaseRegisterInput](interfaces/BaseRegisterInput.md)
-   [BaseRequestPasswordResetInput](interfaces/BaseRequestPasswordResetInput.md)
-   [ChangePasswordInput](interfaces/ChangePasswordInput.md)
-   [ClientLoginResult](interfaces/ClientLoginResult.md)
-   [CollectionQueryResult](interfaces/CollectionQueryResult.md)
-   [CollectionQueryResultMap](interfaces/CollectionQueryResultMap.md)
-   [CreateOrUpdateUserRoleInput](interfaces/CreateOrUpdateUserRoleInput.md)
-   [CreateTokenResult](interfaces/CreateTokenResult.md)
-   [EmailTemplateConfig](interfaces/EmailTemplateConfig.md)
-   [EmailTemplateInput](interfaces/EmailTemplateInput.md)
-   [EmailTemplateLocale](interfaces/EmailTemplateLocale.md)
-   [FaunaGraphQLResponse](interfaces/FaunaGraphQLResponse.md)
-   [FaunaLoginResult](interfaces/FaunaLoginResult.md)
-   [FaunaRefreshResult](interfaces/FaunaRefreshResult.md)
-   [LoginInputWithEmail](interfaces/LoginInputWithEmail.md)
-   [LoginInputWithUsername](interfaces/LoginInputWithUsername.md)
-   [LoginWithMagicLinkInput](interfaces/LoginWithMagicLinkInput.md)
-   [LogoutInput](interfaces/LogoutInput.md)
-   [RotateTokensInput](interfaces/RotateTokensInput.md)
-   [ServerLoginResult](interfaces/ServerLoginResult.md)
-   [SetPasswordInput](interfaces/SetPasswordInput.md)
-   [Token](interfaces/Token.md)
-   [TokenCollectionQueryResult](interfaces/TokenCollectionQueryResult.md)
-   [TokenPair](interfaces/TokenPair.md)
-   [TokenQueryResult](interfaces/TokenQueryResult.md)
-   [TokenResult](interfaces/TokenResult.md)
-   [UpdateUserInput](interfaces/UpdateUserInput.md)
-   [UpdateUserResult](interfaces/UpdateUserResult.md)
-   [UserData](interfaces/UserData.md)

### Type aliases

-   [LoginInput](index.md#logininput)
-   [Maybe](index.md#maybe)
-   [RegisterInput](index.md#registerinput)
-   [RequestPasswordResetInput](index.md#requestpasswordresetinput)
-   [SendCustomEmail](index.md#sendcustomemail)
-   [SendEmailFromTemplate](index.md#sendemailfromtemplate)
-   [URLParamTuple](index.md#urlparamtuple)

### Variables

-   [errors](index.md#errors)

### Functions

-   [addParamsToPath](index.md#addparamstopath)
-   [changePassword](index.md#changepassword)
-   [createOrUpdateUserRole](index.md#createorupdateuserrole)
-   [getEmailContent](index.md#getemailcontent)
-   [login](index.md#login)
-   [loginWithMagicLink](index.md#loginwithmagiclink)
-   [logout](index.md#logout)
-   [register](index.md#register)
-   [rotateTokens](index.md#rotatetokens)
-   [sendConfirmationEmail](index.md#sendconfirmationemail)
-   [setPassword](index.md#setpassword)
-   [updateUser](index.md#updateuser)

## Type aliases

### LoginInput

Ƭ **LoginInput**: [`LoginInputWithEmail`](interfaces/LoginInputWithEmail.md) \| [`LoginInputWithUsername`](interfaces/LoginInputWithUsername.md)

#### Defined in

[auth/login.ts:37](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/login.ts#L37)

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

[types/general.ts:5](https://github.com/alexnitta/faunauth/blob/13b973e/src/types/general.ts#L5)

---

### RegisterInput

Ƭ **RegisterInput**<`SendEmailResult`\>: [`BaseRegisterInput`](interfaces/BaseRegisterInput.md) & [`AuthInputWithEmailTemplate`](interfaces/AuthInputWithEmailTemplate.md)<`SendEmailResult`\> \| [`AuthInputWithCustomEmail`](interfaces/AuthInputWithCustomEmail.md)<`SendEmailResult`\>

#### Type parameters

| Name              |
| :---------------- |
| `SendEmailResult` |

#### Defined in

[auth/register.ts:36](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/register.ts#L36)

---

### RequestPasswordResetInput

Ƭ **RequestPasswordResetInput**<`SendEmailResult`\>: [`BaseRequestPasswordResetInput`](interfaces/BaseRequestPasswordResetInput.md) & [`AuthInputWithEmailTemplate`](interfaces/AuthInputWithEmailTemplate.md)<`SendEmailResult`\> \| [`AuthInputWithCustomEmail`](interfaces/AuthInputWithCustomEmail.md)<`SendEmailResult`\>

#### Type parameters

| Name              |
| :---------------- |
| `SendEmailResult` |

#### Defined in

[auth/sendConfirmationEmail.ts:29](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/sendConfirmationEmail.ts#L29)

---

### SendCustomEmail

Ƭ **SendCustomEmail**<`SendEmailResult`\>: (`callbackUrl`: `string`) => `Promise`<`SendEmailResult`\>

#### Type parameters

| Name              |
| :---------------- |
| `SendEmailResult` |

#### Type declaration

▸ (`callbackUrl`): `Promise`<`SendEmailResult`\>

Async function for sending an email; accepts a callback URL and returns a Promise
that resolves to the generic \`<SendEmailResult>\`. Use this when you want to provide your
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

`Promise`<`SendEmailResult`\>

#### Defined in

[types/email.ts:119](https://github.com/alexnitta/faunauth/blob/13b973e/src/types/email.ts#L119)

---

### SendEmailFromTemplate

Ƭ **SendEmailFromTemplate**<`SendEmailResult`\>: (`input`: [`EmailTemplateInput`](interfaces/EmailTemplateInput.md)) => `Promise`<`SendEmailResult`\>

#### Type parameters

| Name              |
| :---------------- |
| `SendEmailResult` |

#### Type declaration

▸ (`input`): `Promise`<`SendEmailResult`\>

Async function for sending an email; accepts a [EmailTemplateInput](interfaces/EmailTemplateInput.md) and returns a Promise
that resolves to the generic \`<SendEmailResult>\`. Use this when you want to send
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

`Promise`<`SendEmailResult`\>

#### Defined in

[types/email.ts:105](https://github.com/alexnitta/faunauth/blob/13b973e/src/types/email.ts#L105)

---

### URLParamTuple

Ƭ **URLParamTuple**: [name: string, value: string]

A [name, value] pair that will be used to create a URL search parameter.

#### Defined in

[utils/addParamsToPath.ts:4](https://github.com/alexnitta/faunauth/blob/13b973e/src/utils/addParamsToPath.ts#L4)

## Variables

### errors

• `Const` **errors**: `Object`

#### Type declaration

| Name                             | Type     |
| :------------------------------- | :------- |
| `failedToChangePassword`         | `string` |
| `failedToCreateToken`            | `string` |
| `failedToLogout`                 | `string` |
| `failedToRefreshToken`           | `string` |
| `failedToRegisterUser`           | `string` |
| `failedToSendEmail`              | `string` |
| `failedToSendEmailAndDeleteUser` | `string` |
| `failedToSetPassword`            | `string` |
| `failedToUpdateUser`             | `string` |
| `invalidEmailConfirmationToken`  | `string` |
| `invalidOldPassword`             | `string` |
| `invalidUserOrPassword`          | `string` |
| `missingAccessToken`             | `string` |
| `missingPublicFaunaKey`          | `string` |
| `missingUserRef`                 | `string` |
| `passwordAlreadyInUse`           | `string` |
| `userAlreadyExists`              | `string` |
| `userDoesNotExist`               | `string` |

#### Defined in

[fauna/src/errors.ts:1](https://github.com/alexnitta/faunauth/blob/13b973e/src/fauna/src/errors.ts#L1)

## Functions

### addParamsToPath

▸ **addParamsToPath**(`input`): `string`

Add URL search params to a path. If the path contains existing search parameters or a hash, they
will be preserved.

Search params are encoded to their UTF-8 equivalent by the `new URLSearchParams` constructor,
similar to how
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
works.

#### Parameters

| Name    | Type                                                         | Description                                                    |
| :------ | :----------------------------------------------------------- | :------------------------------------------------------------- |
| `input` | [`AddParamsToPathInput`](interfaces/AddParamsToPathInput.md) | see [AddParamsToPathInput](interfaces/AddParamsToPathInput.md) |

#### Returns

`string`

the input.path with the input.params added as search params

#### Defined in

[utils/addParamsToPath.ts:29](https://github.com/alexnitta/faunauth/blob/13b973e/src/utils/addParamsToPath.ts#L29)

---

### changePassword

▸ **changePassword**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Change the password for a user who knows their old password.

The `input.email` is converted to lowercase, so it is case-insensitive.

#### Parameters

| Name    | Type                                                       |
| :------ | :--------------------------------------------------------- |
| `input` | [`ChangePasswordInput`](interfaces/ChangePasswordInput.md) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

-   [ServerLoginResult](interfaces/ServerLoginResult.md)

#### Defined in

[auth/changePassword.ts:37](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/changePassword.ts#L37)

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
// This is an example of what a privilege object looks like; you would need to
// change it to fit your needs.
{
resource: Collection('dinos'),
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

[utils/createOrUpdateUserRole.ts:95](https://github.com/alexnitta/faunauth/blob/13b973e/src/utils/createOrUpdateUserRole.ts#L95)

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

[email/getEmailContent.ts:12](https://github.com/alexnitta/faunauth/blob/13b973e/src/email/getEmailContent.ts#L12)

---

### login

▸ **login**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Log a user in. The input can include either an `email` or a `username` in order to identify the
user. The returned data will include an `accessSecret`, `refreshToken` and `user` object including
the user's `id` as well as any other data on the User document.

If the email/username or password is incorrect, this function throws the same error. This is by
design; the person trying to log in should not be allowed to know which of these values is
incorrect because it would help them guess the other value if they are a malicious actor.

The `input.email` or `input.username` is converted to lowercase, so it is case-insensitive.

#### Parameters

| Name    | Type                                | Description                       |
| :------ | :---------------------------------- | :-------------------------------- |
| `input` | [`LoginInput`](index.md#logininput) | [LoginInput](index.md#logininput) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

-   {@link LoginResult}

#### Defined in

[auth/login.ts:52](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/login.ts#L52)

---

### loginWithMagicLink

▸ **loginWithMagicLink**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Log in a user via a link sent in an email. The link contains an encoded token which must be
passed to this function as the `token` argument. This function checks the token to see if an exact
match for the token exists in the database which:

-   has not expired
-   belongs to the user associated with the given email
    If these conditions are met, the user is logged in. The returned data will include an
    `accessSecret`, `refreshToken` and `user` object including the user's `id` as well as any other
    data on the User document.

The `input.email` is converted to lowercase, so it is case-insensitive.

#### Parameters

| Name    | Type                                                               |
| :------ | :----------------------------------------------------------------- |
| `input` | [`LoginWithMagicLinkInput`](interfaces/LoginWithMagicLinkInput.md) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

-   [ServerLoginResult](interfaces/ServerLoginResult.md)

#### Defined in

[auth/loginWithMagicLink.ts:40](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/loginWithMagicLink.ts#L40)

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

[auth/logout.ts:27](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/logout.ts#L27)

---

### register

▸ **register**<`SendEmailResult`\>(`input`): `Promise`<`SendEmailResult`\>

Register a user by creating a user in the User collection and sending the user an email with a
confirmation link to the specified callbackUrl that includes the encoded token and email address.
`setPassword` will need to be invoked with the decoded token to complete the process.

A unique `input.userData.email` is required. If desired, you can provide a unique username on
`input.userData.username`. If you do this (or if you later modify the user by adding a username
to its `data` property), you can call the `login` function with the username rather than the
email.

Both `input.userData.email` and `input.userData.username` are converted to lowercase, so they
are case-insensitive.

**`remarks`**
The token and email are wrapped into an object, then Base64-encoded and appended as a single
URL search parameter called `data`. Your client-side code can read these values by doing:

```JavaScript
const { email, token } = JSON.parse(atob(data));
```

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

`Promise`<`SendEmailResult`\>

the generic \`<SendEmailResult>\` that you specify

#### Defined in

[auth/register.ts:67](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/register.ts#L67)

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

[auth/rotateTokens.ts:24](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/rotateTokens.ts#L24)

---

### sendConfirmationEmail

▸ **sendConfirmationEmail**<`SendEmailResult`\>(`input`): `Promise`<`SendEmailResult`\>

Create an email confirmation token in the database, then send an email with a confirmation link
that includes the token and email address. Upon clicking the link, either `setPassword` or
`loginWithMagicLink` will need to be invoked with the decoded token to complete the process.

The `input.email` is converted to lowercase, so it is case-insensitive.

**`remarks`**
The token and email are wrapped into an object, then Base64-encoded and appended as a single
URL search parameter called `data`. Your client-side code can read these values by doing:

```TypeScript
 // If you're using react-router, you can get search params with useSearchParams()
 const search = window.location.search
 const urlQuery = new URLSearchParams(search);
 const data = urlQuery.get('data');

 try {
     const { email, token } = JSON.parse(atob(data));
 } catch {
     // could not read data from URL search parameter
 }
```

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

`Promise`<`SendEmailResult`\>

the generic \`<SendEmailResult>\` that you specify

#### Defined in

[auth/sendConfirmationEmail.ts:64](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/sendConfirmationEmail.ts#L64)

---

### setPassword

▸ **setPassword**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Set a user's password in order to finish either the "register" or "forgot password" flow. By now,
the user has already triggered either `register` or `sendConfirmationEmail` to request a token.
The token has been created in the database, and an email has been sent to the user with a link
which includes an encoded copy of the token. The user has clicked the link, opening a page in the
frontend app that calls an API endpoint which calls this function. This function checks
the token to see if an exact match for the token exists in the database which:

-   has not expired
-   belongs to the user associated with the given email

If these conditions are met, the given password is set as the user's current password.
The `input.email` is converted to lowercase, so it is case-insensitive.

#### Parameters

| Name    | Type                                                 |
| :------ | :--------------------------------------------------- |
| `input` | [`SetPasswordInput`](interfaces/SetPasswordInput.md) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

-   [ServerLoginResult](interfaces/ServerLoginResult.md)

#### Defined in

[auth/setPassword.ts:44](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/setPassword.ts#L44)

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

[auth/updateUser.ts:32](https://github.com/alexnitta/faunauth/blob/13b973e/src/auth/updateUser.ts#L32)
