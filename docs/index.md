faunauth

# faunauth

## Table of contents

### Interfaces

- [AddParamsToPathInput](interfaces/AddParamsToPathInput.md)
- [Anomaly](interfaces/Anomaly.md)
- [AnomalyData](interfaces/AnomalyData.md)
- [AnomalyError](interfaces/AnomalyError.md)
- [AuthInputWithCustomEmail](interfaces/AuthInputWithCustomEmail.md)
- [AuthInputWithEmailTemplate](interfaces/AuthInputWithEmailTemplate.md)
- [BaseLoginInput](interfaces/BaseLoginInput.md)
- [BaseRegisterInput](interfaces/BaseRegisterInput.md)
- [BaseRequestPasswordResetInput](interfaces/BaseRequestPasswordResetInput.md)
- [ChangePasswordInput](interfaces/ChangePasswordInput.md)
- [ClientLoginResult](interfaces/ClientLoginResult.md)
- [CollectionQueryResult](interfaces/CollectionQueryResult.md)
- [CollectionQueryResultMap](interfaces/CollectionQueryResultMap.md)
- [CreateKeyResult](interfaces/CreateKeyResult.md)
- [CreateOrUpdateUserRoleInput](interfaces/CreateOrUpdateUserRoleInput.md)
- [CreateTokenResult](interfaces/CreateTokenResult.md)
- [DatabaseClients](interfaces/DatabaseClients.md)
- [EmailTemplateConfig](interfaces/EmailTemplateConfig.md)
- [EmailTemplateInput](interfaces/EmailTemplateInput.md)
- [EmailTemplateLocale](interfaces/EmailTemplateLocale.md)
- [FaunaGraphQLResponse](interfaces/FaunaGraphQLResponse.md)
- [FaunaLoginResult](interfaces/FaunaLoginResult.md)
- [FaunaRefreshResult](interfaces/FaunaRefreshResult.md)
- [FaunauthError](interfaces/FaunauthError.md)
- [LoginInputWithEmail](interfaces/LoginInputWithEmail.md)
- [LoginInputWithUsername](interfaces/LoginInputWithUsername.md)
- [LoginWithMagicLinkInput](interfaces/LoginWithMagicLinkInput.md)
- [LogoutInput](interfaces/LogoutInput.md)
- [RegisterAdminInput](interfaces/RegisterAdminInput.md)
- [RotateTokensInput](interfaces/RotateTokensInput.md)
- [ServerLoginResult](interfaces/ServerLoginResult.md)
- [SetPasswordInput](interfaces/SetPasswordInput.md)
- [TestDocument](interfaces/TestDocument.md)
- [Token](interfaces/Token.md)
- [TokenCollectionQueryResult](interfaces/TokenCollectionQueryResult.md)
- [TokenPair](interfaces/TokenPair.md)
- [TokenQueryResult](interfaces/TokenQueryResult.md)
- [TokenResult](interfaces/TokenResult.md)
- [UpdateUserInput](interfaces/UpdateUserInput.md)
- [User](interfaces/User.md)
- [UserData](interfaces/UserData.md)
- [UserResult](interfaces/UserResult.md)

### Type aliases

- [AnomalyCollectionQueryResult](index.md#anomalycollectionqueryresult)
- [DeleteUserInput](index.md#deleteuserinput)
- [LoginInput](index.md#logininput)
- [Maybe](index.md#maybe)
- [RefreshResult](index.md#refreshresult)
- [RegisterInput](index.md#registerinput)
- [RequestPasswordResetInput](index.md#requestpasswordresetinput)
- [SendCustomEmail](index.md#sendcustomemail)
- [SendEmailFromTemplate](index.md#sendemailfromtemplate)
- [SetUp](index.md#setup)
- [TearDown](index.md#teardown)
- [TestContext](index.md#testcontext)
- [URLParamTuple](index.md#urlparamtuple)
- [UserCollectionQueryResult](index.md#usercollectionqueryresult)
- [UserDataInput](index.md#userdatainput)

### Variables

- [errors](index.md#errors)

### Functions

- [addParamsToPath](index.md#addparamstopath)
- [changePassword](index.md#changepassword)
- [createOrUpdateUserRole](index.md#createorupdateuserrole)
- [deleteUser](index.md#deleteuser)
- [getEmailContent](index.md#getemailcontent)
- [login](index.md#login)
- [loginWithMagicLink](index.md#loginwithmagiclink)
- [logout](index.md#logout)
- [register](index.md#register)
- [registerAdmin](index.md#registeradmin)
- [rotateTokens](index.md#rotatetokens)
- [sendConfirmationEmail](index.md#sendconfirmationemail)
- [setPassword](index.md#setpassword)
- [updateUser](index.md#updateuser)

## Type aliases

### AnomalyCollectionQueryResult

Ƭ **AnomalyCollectionQueryResult**: [`CollectionQueryResult`](interfaces/CollectionQueryResult.md)<[`Anomaly`](interfaces/Anomaly.md)[]\>

#### Defined in

[types/auth.ts:205](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/auth.ts#L205)

___

### DeleteUserInput

Ƭ **DeleteUserInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientConfig?` | `Omit`<`ClientConfig`, ``"secret"``\> | Fauna client config object |
| `email?` | `string` | Email address of the user to delete. If email is not provided, userID must be provided. |
| `secret` | `string` | A Fauna secret. This can either be an accessSecret that was returned after authenticating the user or a Fauna secret that has "admin" permissions. |
| `userID?` | `string` | ID of the user to delete. If userID is not provided, email must be provided. |

#### Defined in

[auth/deleteUser.ts:9](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/deleteUser.ts#L9)

___

### LoginInput

Ƭ **LoginInput**: [`LoginInputWithEmail`](interfaces/LoginInputWithEmail.md) \| [`LoginInputWithUsername`](interfaces/LoginInputWithUsername.md)

#### Defined in

[auth/login.ts:41](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/login.ts#L41)

___

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| ``null``

[graphql-code-generator](https://www.graphql-code-generator.com/) generates types that use a
Maybe generic type. To keep things consistent, we're also going to do that here.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types/general.ts:5](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/general.ts#L5)

___

### RefreshResult

Ƭ **RefreshResult**: ``false`` \| [`FaunaLoginResult`](interfaces/FaunaLoginResult.md) \| [`AnomalyError`](interfaces/AnomalyError.md)

#### Defined in

[types/auth.ts:209](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/auth.ts#L209)

___

### RegisterInput

Ƭ **RegisterInput**<`SendEmailResult`\>: [`BaseRegisterInput`](interfaces/BaseRegisterInput.md) & [`AuthInputWithEmailTemplate`](interfaces/AuthInputWithEmailTemplate.md)<`SendEmailResult`\> \| [`AuthInputWithCustomEmail`](interfaces/AuthInputWithCustomEmail.md)<`SendEmailResult`\>

#### Type parameters

| Name |
| :------ |
| `SendEmailResult` |

#### Defined in

[auth/register.ts:38](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/register.ts#L38)

___

### RequestPasswordResetInput

Ƭ **RequestPasswordResetInput**<`SendEmailResult`\>: [`BaseRequestPasswordResetInput`](interfaces/BaseRequestPasswordResetInput.md) & [`AuthInputWithEmailTemplate`](interfaces/AuthInputWithEmailTemplate.md)<`SendEmailResult`\> \| [`AuthInputWithCustomEmail`](interfaces/AuthInputWithCustomEmail.md)<`SendEmailResult`\>

#### Type parameters

| Name |
| :------ |
| `SendEmailResult` |

#### Defined in

[auth/sendConfirmationEmail.ts:30](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/sendConfirmationEmail.ts#L30)

___

### SendCustomEmail

Ƭ **SendCustomEmail**<`SendEmailResult`\>: (`callbackUrl`: `string`) => `Promise`<`SendEmailResult`\>

#### Type parameters

| Name |
| :------ |
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

| Name | Type |
| :------ | :------ |
| `callbackUrl` | `string` |

##### Returns

`Promise`<`SendEmailResult`\>

#### Defined in

[types/email.ts:119](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/email.ts#L119)

___

### SendEmailFromTemplate

Ƭ **SendEmailFromTemplate**<`SendEmailResult`\>: (`input`: [`EmailTemplateInput`](interfaces/EmailTemplateInput.md)) => `Promise`<`SendEmailResult`\>

#### Type parameters

| Name |
| :------ |
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

| Name | Type |
| :------ | :------ |
| `input` | [`EmailTemplateInput`](interfaces/EmailTemplateInput.md) |

##### Returns

`Promise`<`SendEmailResult`\>

#### Defined in

[types/email.ts:105](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/email.ts#L105)

___

### SetUp

Ƭ **SetUp**: (`testName`: `string`) => `Promise`<[`TestContext`](index.md#testcontext)\>

#### Type declaration

▸ (`testName`): `Promise`<[`TestContext`](index.md#testcontext)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `testName` | `string` |

##### Returns

`Promise`<[`TestContext`](index.md#testcontext)\>

#### Defined in

[types/test.ts:15](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/test.ts#L15)

___

### TearDown

Ƭ **TearDown**: (`testName`: `string`, `context`: [`TestContext`](index.md#testcontext)) => `Promise`<``true``\>

#### Type declaration

▸ (`testName`, `context`): `Promise`<``true``\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `testName` | `string` |
| `context` | [`TestContext`](index.md#testcontext) |

##### Returns

`Promise`<``true``\>

#### Defined in

[types/test.ts:17](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/test.ts#L17)

___

### TestContext

Ƭ **TestContext**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `databaseClients` | [`DatabaseClients`](interfaces/DatabaseClients.md) |
| `loginResult?` | [`FaunauthError`](interfaces/FaunauthError.md) \| [`FaunaLoginResult`](interfaces/FaunaLoginResult.md) |
| `secret?` | `string` |
| `testDocumentRef?` | [`Maybe`](index.md#maybe)<`values.Ref`\> |

#### Defined in

[types/test.ts:8](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/test.ts#L8)

___

### URLParamTuple

Ƭ **URLParamTuple**: [name: string, value: string]

A [name, value] pair that will be used to create a URL search parameter.

#### Defined in

[utils/addParamsToPath.ts:4](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/utils/addParamsToPath.ts#L4)

___

### UserCollectionQueryResult

Ƭ **UserCollectionQueryResult**: [`CollectionQueryResult`](interfaces/CollectionQueryResult.md)<[`User`](interfaces/User.md)[]\>

#### Defined in

[types/auth.ts:207](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/auth.ts#L207)

___

### UserDataInput

Ƭ **UserDataInput**: `Omit`<[`UserData`](interfaces/UserData.md), ``"id"``\>

Data for creating a new user. The `id` is not included because it is auto-generated when the user
is created in Fauna.

#### Defined in

[types/auth.ts:158](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/types/auth.ts#L158)

## Variables

### errors

• `Const` **errors**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `failedToChangePassword` | `string` |
| `failedToCreateToken` | `string` |
| `failedToDeleteUser` | `string` |
| `failedToLogout` | `string` |
| `failedToRefreshToken` | `string` |
| `failedToRegisterUser` | `string` |
| `failedToSendEmail` | `string` |
| `failedToSendEmailAndDeleteUser` | `string` |
| `failedToSetPassword` | `string` |
| `failedToUpdateUser` | `string` |
| `invalidEmailConfirmationToken` | `string` |
| `invalidEmailOrPassword` | `string` |
| `invalidEmailOrSecret` | `string` |
| `invalidOldPassword` | `string` |
| `invalidUsernameOrPassword` | `string` |
| `missingAccessToken` | `string` |
| `missingAdminKey` | `string` |
| `missingEmailAndUserID` | `string` |
| `missingPublicFaunaKey` | `string` |
| `missingSecret` | `string` |
| `missingUserRef` | `string` |
| `passwordAlreadyInUse` | `string` |
| `unknownServerError` | `string` |
| `userAlreadyExists` | `string` |
| `userDoesNotExist` | `string` |

#### Defined in

[fauna/src/errors.ts:1](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/fauna/src/errors.ts#L1)

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`AddParamsToPathInput`](interfaces/AddParamsToPathInput.md) | see [AddParamsToPathInput](interfaces/AddParamsToPathInput.md) |

#### Returns

`string`

the input.path with the input.params added as search params

#### Defined in

[utils/addParamsToPath.ts:29](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/utils/addParamsToPath.ts#L29)

___

### changePassword

▸ **changePassword**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Change the password for a user who knows their old password.

The `input.email` is converted to lowercase, so it is case-insensitive.

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`ChangePasswordInput`](interfaces/ChangePasswordInput.md) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

- [ServerLoginResult](interfaces/ServerLoginResult.md)

#### Defined in

[auth/changePassword.ts:41](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/changePassword.ts#L41)

___

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

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`CreateOrUpdateUserRoleInput`](interfaces/CreateOrUpdateUserRoleInput.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/createOrUpdateUserRole.ts:95](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/utils/createOrUpdateUserRole.ts#L95)

___

### deleteUser

▸ **deleteUser**(`input`): `Promise`<[`UserResult`](interfaces/UserResult.md)\>

Delete a user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`DeleteUserInput`](index.md#deleteuserinput) |

#### Returns

`Promise`<[`UserResult`](interfaces/UserResult.md)\>

a Promise that resolves to the [UserResult](interfaces/UserResult.md) containing data for the user
that was just deleted.

#### Defined in

[auth/deleteUser.ts:34](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/deleteUser.ts#L34)

___

### getEmailContent

▸ **getEmailContent**(`input`): `Object`

Returns the HTML template for an authentication email, which will be used to confirm either a
user registration or a password reset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`EmailTemplateConfig`](interfaces/EmailTemplateConfig.md) | see [EmailTemplateConfig](interfaces/EmailTemplateConfig.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `html` | `string` |
| `subject` | `string` |
| `text` | `string` |

#### Defined in

[email/getEmailContent.ts:12](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/email/getEmailContent.ts#L12)

___

### login

▸ **login**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Log a user in. The input can include either an `email` or a `username` in order to identify the
user. The returned data will include an `accessSecret`, `refreshSecret` and `user` object including
the user's `id` as well as any other data on the User document.

If the email/username or password is incorrect, this function throws the same error. This is by
design; the person trying to log in should not be allowed to know which of these values is
incorrect because it would help them guess the other value if they are a malicious actor.

The `input.email` or `input.username` is converted to lowercase, so it is case-insensitive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`LoginInput`](index.md#logininput) | [LoginInput](index.md#logininput) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

- {@link LoginResult}

#### Defined in

[auth/login.ts:56](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/login.ts#L56)

___

### loginWithMagicLink

▸ **loginWithMagicLink**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Log in a user via a link sent in an email. The link contains an encoded secret which must be
passed to this function as the `secret` argument. This function checks the secret to see if a
token exists in the database which matches the secret, has not expired, and belongs to the user
associated with the given email. If these conditions are met, the user is logged in. The returned
data will include an `accessSecret`, `refreshSecret` and `user` object including the user's `id`
as well as any other data on the User document.

The `input.email` is converted to lowercase, so it is case-insensitive.

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`LoginWithMagicLinkInput`](interfaces/LoginWithMagicLinkInput.md) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

- [ServerLoginResult](interfaces/ServerLoginResult.md)

#### Defined in

[auth/loginWithMagicLink.ts:42](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/loginWithMagicLink.ts#L42)

___

### logout

▸ **logout**(`input`): `Promise`<`boolean`\>

Log a user out.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`LogoutInput`](interfaces/LogoutInput.md) | [LogoutInput](interfaces/LogoutInput.md) |

#### Returns

`Promise`<`boolean`\>

true if user was signed out

#### Defined in

[auth/logout.ts:27](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/logout.ts#L27)

___

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

| Name |
| :------ |
| `SendEmailResult` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`RegisterInput`](index.md#registerinput)<`SendEmailResult`\> |

#### Returns

`Promise`<`SendEmailResult`\>

the generic \`<SendEmailResult>\` that you specify

#### Defined in

[auth/register.ts:69](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/register.ts#L69)

___

### registerAdmin

▸ **registerAdmin**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Register a user by creating a user in the User collection without verifying an email confirmation
token. This is intended for use only when creating an account as an administrator and only works
with a Fauna client that is authenticated with an admin key. Use this with caution.

A unique `input.userData.email` is required. If desired, you can provide a unique username on
`input.userData.username`. If you do this (or if you later modify the user by adding a username
to its `data` property), you can call the `login` function with the username rather than the
email.

Both `input.userData.email` and `input.userData.username` are converted to lowercase, so they
are case-insensitive.

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`RegisterAdminInput`](interfaces/RegisterAdminInput.md) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

a [ServerLoginResult](interfaces/ServerLoginResult.md)

#### Defined in

[auth/registerAdmin.ts:45](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/registerAdmin.ts#L45)

___

### rotateTokens

▸ **rotateTokens**(`input`): `Promise`<[`TokenPair`](interfaces/TokenPair.md)\>

Using the user's current refresh token, get a new pair of access & refresh tokens.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`RotateTokensInput`](interfaces/RotateTokensInput.md) | [RotateTokensInput](interfaces/RotateTokensInput.md) |

#### Returns

`Promise`<[`TokenPair`](interfaces/TokenPair.md)\>

the new access and refresh tokens if successful

#### Defined in

[auth/rotateTokens.ts:24](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/rotateTokens.ts#L24)

___

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

| Name |
| :------ |
| `SendEmailResult` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`RequestPasswordResetInput`](index.md#requestpasswordresetinput)<`SendEmailResult`\> |

#### Returns

`Promise`<`SendEmailResult`\>

the generic \`<SendEmailResult>\` that you specify

#### Defined in

[auth/sendConfirmationEmail.ts:65](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/sendConfirmationEmail.ts#L65)

___

### setPassword

▸ **setPassword**(`input`): `Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

Set a user's password in order to finish either the "register" or "forgot password" flow. By now,
the user has already triggered either `register` or `sendConfirmationEmail` to request a token.
The token has been created in the database, and an email has been sent to the user with a link
which includes an encoded copy of the token. The user has clicked the link, opening a page in the
frontend app that calls an API endpoint which calls this function. This function checks
the token to see if an exact match for the token exists in the database which:
- has not expired
- belongs to the user associated with the given email

If these conditions are met, the given password is set as the user's current password.
The `input.email` is converted to lowercase, so it is case-insensitive.

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`SetPasswordInput`](interfaces/SetPasswordInput.md) |

#### Returns

`Promise`<[`ServerLoginResult`](interfaces/ServerLoginResult.md)\>

- [ServerLoginResult](interfaces/ServerLoginResult.md)

#### Defined in

[auth/setPassword.ts:48](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/setPassword.ts#L48)

___

### updateUser

▸ **updateUser**(`input`): `Promise`<[`UserResult`](interfaces/UserResult.md)\>

Update data for the current user.

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`UpdateUserInput`](interfaces/UpdateUserInput.md) |

#### Returns

`Promise`<[`UserResult`](interfaces/UserResult.md)\>

a Promise that resolves to the [UserResult](interfaces/UserResult.md)

#### Defined in

[auth/updateUser.ts:32](https://github.com/alexnitta/faunauth/blob/8cbba2b/src/auth/updateUser.ts#L32)
