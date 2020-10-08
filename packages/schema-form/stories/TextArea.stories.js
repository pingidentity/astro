import React from 'react';
import Form from '../src/components/SchemaForm';

export const Basic = () => {
  const schema = {
    type: 'object',
    properties: {
      exampleTextArea: {
        type: 'string',
      },
    },
  };

  const uischema = {
    exampleTextArea: {
      'ui:widget': 'textarea',
      'ui:options': {
        label: 'Text Area',
      },
    },
  };

  return (
    <Form
      schema={('Schema', schema)}
      uiSchema={('uiSchema', uischema)}
    />
  );
};
