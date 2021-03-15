import React from 'react';
import Form from '../src/components/SchemaForm';

export const Basic = () => {
  const schema = {
    type: 'object',
    properties: {
      exampleTextBox: {
        type: 'string',
        title: 'Example Text Input',
      },
    },
  };

  const uischema = {
    exampleTextBox: {
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

export const PasswordInput = () => {
  const schema = {
    type: 'object',
    properties: {
      exampleTextBox: {
        type: 'string',
        title: 'Example Password Text Input',
      },
    },
  };
  const uischema = {
    exampleTextBox: {
      'ui:widget': 'passwordWithRequirements',
      'ui:options': {
        label: false,
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

export const EmailInput = () => {
  const schema = {
    type: 'object',
    properties: {
      exampleTextBox: {
        type: 'string',
        title: 'Example Email Text Input',
        format: 'email',
      },
    },
  };
  const uischema = {
    exampleTextBox: {
      'ui:widget': 'email',
      'ui:options': {
        label: 'Example Label',
        inputType: 'email',
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
