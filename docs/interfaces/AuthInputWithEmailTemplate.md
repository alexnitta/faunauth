[faunauth](../index.md) / AuthInputWithEmailTemplate

# Interface: AuthInputWithEmailTemplate<SendEmailFromTemplateResult\>

## Type parameters

| Name |
| :------ |
| `SendEmailFromTemplateResult` |

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

[src/types/email.ts:133](https://github.com/alexnitta/faunauth/blob/6a0971c/src/types/email.ts#L133)

___

### fromEmail

• **fromEmail**: `string`

Email address to use as the sender

#### Defined in

[src/types/email.ts:129](https://github.com/alexnitta/faunauth/blob/6a0971c/src/types/email.ts#L129)

___

### sendEmailFromTemplate

• **sendEmailFromTemplate**: [`SendEmailFromTemplate`](../index.md#sendemailfromtemplate)<`SendEmailFromTemplateResult`\>

See [SendEmailFromTemplate](../index.md#sendemailfromtemplate)

#### Defined in

[src/types/email.ts:137](https://github.com/alexnitta/faunauth/blob/6a0971c/src/types/email.ts#L137)
