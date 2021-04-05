import React from 'react';
import { boolean, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Form from '../src/components/SchemaForm';

export const simplified = () => {
  const liveValidate = boolean('liveValidate', false);
  const theme = select('Theme', ['astro', 'end-user'], 'end-user');
  const schema = object('schema', {
    type: 'object',
    properties: {
      test: {
        type: 'string',
      },
    },
  });

  const uischema = object('uiSchema', {
    test: {
      'ui:options': {
        label: 'Example Field',
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
      uiSchema={('uiSchema', uischema)}
      liveValidate={liveValidate}
      onChange={onChange}
      theme={theme}
      mode="simplified"
      transformErrors={transformErrors}
      extraErrors={extraErrors}
    />
  );
};
