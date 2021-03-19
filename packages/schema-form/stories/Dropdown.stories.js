import React from 'react';
import Form from '../src/components/SchemaForm';

export const Dropdown = () => {
  const schema = {
    type: 'object',
    properties: {
      dropdownExample: {
        title: 'Example List',
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
      'ui:widget': 'select',
      'ui:options': {
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
