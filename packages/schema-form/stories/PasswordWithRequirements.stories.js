import React from 'react';
import Form from '../src/components/SchemaForm';

export const PasswordWithRequirements = () => {
  const validateRequirements = (e, data) => {
    const firstReq = e.target.value.length >= 13;
    const secondReq = /[a-z]/.test(e.target.value);
    const thirdReq = /[A-Z]/.test(e.target.value);

    const newData = [
      { ...data[0], status: firstReq ? 'success' : 'default' },
      { ...data[1], status: secondReq ? 'success' : 'default' },
      { ...data[2], status: thirdReq ? 'success' : 'default' },
    ];

    return newData;
  };

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
        requirements: [
          { name: 'Minimum of 13 characters', status: 'default' },
          { name: 'Has at least 1 lower case letter', status: 'default' },
          { name: 'Has at least 1 upper case letter', status: 'default' },
        ],
        validateRequirements,
        controlProps: {
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
