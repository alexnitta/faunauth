[faunauth](../index.md) / AuthInputWithEmailTemplate

# Interface: AuthInputWithEmailTemplate<SendEmailResult\>

## Type parameters

| Name |
| :------ |
| `SendEmailResult` |

## Table of contents

### Properties

- [emailConfig](AuthInputWithEmailTemplate.md#emailconfig)
- [fromEmail](AuthInputWithEmailTemplate.md#fromemail)
- [sendEmailFromTemplate](AuthInputWithEmailTemplate.md#sendemailfromtemplate)

## Properties

### emailConfig

• **emailConfig**: [`EmailTemplateConfig`](EmailTemplateConfig.md)

A configuration object for the email template - see [EmailTemplateConfig](EmailTemplateConfig.md)

#### Defined in

[types/email.ts:131](https://github.com/alexnitta/faunauth/blob/f54dc52/src/types/email.ts#L131)

___

### fromEmail

• **fromEmail**: `string`

Email address to use as the sender

#### Defined in

[types/email.ts:127](https://github.com/alexnitta/faunauth/blob/f54dc52/src/types/email.ts#L127)

___

### sendEmailFromTemplate

• **sendEmailFromTemplate**: [`SendEmailFromTemplate`](../index.md#sendemailfromtemplate)<`SendEmailResult`\>

See [SendEmailFromTemplate](../index.md#sendemailfromtemplate)

#### Defined in

[types/email.ts:135](https://github.com/alexnitta/faunauth/blob/f54dc52/src/types/email.ts#L135)
