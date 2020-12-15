import React from 'react';
import Form from '../src/components/SchemaForm';

export const Checkbox = () => {
  const schema = {
    type: 'object',
    properties: {
      singleCheckbox: {
        type: 'boolean',
      },
    },
  };

  const uischema = {
    singleCheckbox: {
      'ui:widget': 'checkbox',
      'ui:options': {
        label: 'Example Label',
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

export const CheckboxGroup = () => {
  const schema = {
    type: 'object',
    properties: {
      interacted: {
        type: 'array',
        minItems: 1,
        items: {
          type: 'string',
          enum: ['one', 'two', 'three'],
        },
        uniqueItems: true,
      },
    },
  };

  const uischema = {
    interacted: {
      'ui:widget': 'checkboxes',
      'ui:options': {
        label: 'Example Label',
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
