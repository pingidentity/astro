import React from 'react';
import Form from '../src/components/SchemaForm';

export const Dropdown = () => {
  const schema = {
    type: 'object',
    properties: {
      dropdownExample: {
        type: 'string',
        enum: [
          'Selection 1',
          'Selection 2',
          'Selection 3',
        ],
      },
    },
  };

  const uischema = {
    dropdownExample: {
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
