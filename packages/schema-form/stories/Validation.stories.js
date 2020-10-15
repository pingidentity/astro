import React from 'react';
import Form from '../src/components/SchemaForm';

function validate(formData, errors) {
  if (formData.Password1 !== formData.Password2) {
    errors.Password2.addError("Passwords don't match");
  }
  return errors;
}

export const basic = () => {
  const schema = {
    description: 'Fields will throw a validation error upon submit when they do not match',
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

export const liveOn = () => {
  const schema = {
    description: 'Fields will throw a validation error in real-time when they do not match',
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
      liveValidate="on"
    />
  );
};

export const livePostSubmit = () => {
  const schema = {
    description: 'Fields will throw a validation error on submit and then in real-time when they do not match',
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
      liveValidate="postSubmit"
    />
  );
};
