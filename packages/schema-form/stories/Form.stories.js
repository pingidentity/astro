import React from 'react';
import { object, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
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
  const liveValidate = boolean('liveValidate', false);
  const theme = select('Theme', ['astro', 'end-user'], 'end-user');
  const schema = object('schema', {
    title: 'Example Title',
    description: 'Example of schema forms using uiSchema',
    type: 'object',
    properties: {
      textInput: {
        type: 'string',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  });
  const uiSchema = object('uiSchema', {
    textInput: {
      'ui:options': {
        label: 'Example text label',
      },
    },
  });
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
    />
  );
};
