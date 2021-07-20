import React from 'react';
import Form from '../src/components/SchemaForm';

export const PasswordWithRequirements = () => {
  const schema = {
    type: 'object',
    properties: {
      password: {
        type: 'string',
      },
    },
  };

  const uischema = {
    password: {
      'ui:widget': 'passwordWithRequirements',
      'ui:options': {
        requirementsTitle: 'Password Requirements',
        requirementsData: [
          { name: 'Minimum of 13 characters', status: 'yes' },
          { name: 'B', status: 'no' },
          { name: 'C', status: 'error' },
        ],
        inputProps: {
          autoComplete: 'new-password',
        },
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
