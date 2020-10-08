import React from 'react';
import Form from '../src/components/SchemaForm';

function validate(formData, errors) {
  if (formData.Password1 !== formData.Password) {
    errors.Password2.addError("Passwords don't match");
  }
  return errors;
}

export const basic = () => {
  const schema = {
    description: 'Fields will throw a validation error when they do not match',
    type: 'object',
    properties: {
      Password1: { type: 'string', minLength: 3 },
      Password2: { type: 'string', minLength: 3 },
    },
  };

  return (
    <Form
      schema={('Schema', schema)}
      validate={validate}
    />
  );
};
