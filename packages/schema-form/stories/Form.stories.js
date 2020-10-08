import React from 'react';
import Form from '../src/components/SchemaForm';

export const basic = () => {
  const schema = {
    type: 'object',
    properties: {
      test: {
        type: 'string',
        title: 'Example text input',
      },
      exampleTextBox: {
        type: 'string',
        title: 'Example email input',
        format: 'email',
      },

    },
  };

  return (
    <Form
      schema={('Schema', schema)}
    />
  );
};

export const UISchema = () => {
  const schema = {
    title: 'Example Title',
    description: 'Example of schema forms using uiSchema',
    type: 'object',
    properties: {
      textInput: {
        type: 'string',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  };
  const uiSchema = {
    textInput: {
      'ui:options': {
        label: 'Example text label',
      },
    },
  };

  return (
    <Form
      schema={('Schema', schema)}
      uiSchema={('UI Schema', uiSchema)}
    />
  );
};
