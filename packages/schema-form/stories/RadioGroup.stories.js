import React from 'react';
import Form from '../src/components/SchemaForm';

export const RadioGroup = () => {
  const schema = {
    type: 'object',
    properties: {
      interacted: {
        type: 'string',
        enum: ['a', 'b', 'c'],
        uniqueItems: true,
      },
    },
  };

  const uischema = {
    interacted: {
      'ui:widget': 'radiogroup',
      'ui:options': {
        label: 'Example Label',
      },
    },
  };

  return (
    <Form
      schema={('Schema', schema)}
      uiSchema={('uiSchema', uischema)}
      theme="astro"
    />
  );
};
