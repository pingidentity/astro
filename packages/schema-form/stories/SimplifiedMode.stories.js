import React from 'react';
import SchemaForm from '../src/components/SchemaForm';

export const simplified = () => {
  const schema = {
    type: 'object',
    properties: {
      test: {
        type: 'string',
      },
    },
  };

  const uischema = {
    test: {
      'ui:options': {
        label: 'Example Field',
      },
    },
  };

  return (
    <SchemaForm
      schema={('Schema', schema)}
      uiSchema={('uiSchema', uischema)}
      mode="simplified"
    />
  );
};
