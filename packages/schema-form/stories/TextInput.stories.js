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
        labelMode: 'float',
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
        title: 'Example Password Input',
      },
    },
  };
  const uischema = {
    exampleTextBox: {
      'ui:widget': 'password',
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

export const PasswordWithRequirements = () => {
  const schema = {
    type: 'object',
    properties: {
      exampleTextBox: {
        type: 'string',
        title: 'Example Password Input w/ Requirements',
      },
    },
  };
  const uischema = {
    exampleTextBox: {
      'ui:options': {
        label: false,
        inputType: 'password',
        requirementsTitle: 'Password Requirements',
        requirementsData: [
          { name: 'Foo', status: 'no' },
          { name: 'Bar', status: 'no' },
          { name: 'Baz', status: 'yes' },
        ],
      },
      'ui:widget': 'passwordWithRequirements',
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
