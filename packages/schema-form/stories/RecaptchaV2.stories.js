import React from 'react';
import Form from '../src/components/SchemaForm';

export default {
  title: 'Custom Widgets/RecaptchaV2',
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export const Basic = () => {
  const schema = {
    type: 'object',
    properties: {
      exampleRecaptcha: {
        type: 'string',
      },
    },
  };

  const uischema = {
    exampleRecaptcha: {
      'ui:widget': 'recaptchaV2',
      'ui:options': {
        label: 'Example of form recaptcha',
      },
    },
  };

  return (
    <Form
      schema={('Schema', schema)}
      uiSchema={('uiSchema', uischema)}
      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    />
  );
};
