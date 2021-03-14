import React from 'react';
import { boolean, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Form from '../src/components/SchemaForm';

function validate(formData, errors) {
  if (formData.Password1 !== formData.Password2) {
    errors.Password2.addError("Passwords don't match");
  }
  return errors;
}

export const basic = () => {
  const liveValidate = boolean('liveValidate', false);
  const theme = select('Theme', ['astro', 'end-user'], 'end-user');
  const schema = object('schema', {
    description: 'Fields will throw a validation error upon submit when they do not match',
    type: 'object',
    properties: {
      Password1: { type: 'string', minLength: 3 },
      Password2: { type: 'string', minLength: 3 },
    },
  });
  const uiSchema = object('uiSchema', {});
  const extraErrors = object('extraErrors', {});

  const onChange = action('onChange');
  const transformErrorsAction = action('transformErrors');
  const transformErrors = (errors, ...restArgs) => {
    transformErrorsAction(errors, ...restArgs);
    return errors; // should return errors back or story will not show errors to us anymore
  };

  return (
    <Form
      schema={('Schema', schema)}
      uiSchema={('uiSchema', uiSchema)}
      liveValidate={liveValidate}
      onChange={onChange}
      theme={theme}
      transformErrors={transformErrors}
      extraErrors={extraErrors}
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
