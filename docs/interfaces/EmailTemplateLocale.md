[faunauth](../index.md) / EmailTemplateLocale

# Interface: EmailTemplateLocale

## Table of contents

### Properties

- [body](EmailTemplateLocale.md#body)
- [previewHeader](EmailTemplateLocale.md#previewheader)
- [subject](EmailTemplateLocale.md#subject)

## Properties

### body

• **body**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `afterCallToAction` | `string`[] | Each of these strings will be rendered as a body paragraph after the call to action button. |
| `beforeCallToAction` | `string`[] | Each of these strings will be rendered as a body paragraph before the call to action button. |
| `callToAction` | `string` | Text for the call to action button, i.e.: "Confirm" |

#### Defined in

[types/email.ts:2](https://github.com/alexnitta/faunauth/blob/fd08a1e/src/types/email.ts#L2)

___

### previewHeader

• **previewHeader**: `string`

Text shown as preview in email clients, i.e. "Confirm your email to set up [App Name] account"

#### Defined in

[types/email.ts:21](https://github.com/alexnitta/faunauth/blob/fd08a1e/src/types/email.ts#L21)

___

### subject

• **subject**: `string`

Email subject, i.e.: "Confirm your [App Name] account"

#### Defined in

[types/email.ts:25](https://github.com/alexnitta/faunauth/blob/fd08a1e/src/types/email.ts#L25)
