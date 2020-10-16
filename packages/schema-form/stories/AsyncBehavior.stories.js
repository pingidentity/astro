import React from 'react';
import Form from '../src/components/SchemaForm';

/* eslint-disable arrow-body-style */
/* eslint-disable no-alert */

export const customErrors = () => {
  const schema = {
    title: 'Example Title',
    type: 'object',
    properties: {
      test: {
        type: 'string',
        minLength: 3,
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  };

  const uiSchema = {
    test: {
      'ui:options': {
        label: 'Text Label',
      },
    },
  };

  const handleServerError = async (/* response */) => {
    // Do something with the response here...
    // It might be undefined if there was an issue sending the request...

    return Promise.resolve({
      _form: {
        __errors: ['Form error'],
      },
      test: {
        __errors: ['Example error'],
      },
    });
  };

  return (
    <Form
      schema={('Schema', schema)}
      uiSchema={('UI Schema', uiSchema)}
      endpoint="https://google.com"
      onServerError={handleServerError}
    />
  );
};

export const customSuccess = () => {
  const schema = {
    title: 'Example Title',
    type: 'object',
    properties: {
      test: {
        type: 'string',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  };

  const uiSchema = {
    test: {
      'ui:options': {
        label: 'Text Label',
      },
    },
  };

  const handleServerSuccess = () => {
    alert('success!');
  };

  // Just here to force a successful submission
  const handleSubmit = (_form, _event, _onError, onSuccess) => {
    onSuccess();
  };

  return (
    <Form
      schema={('Schema', schema)}
      uiSchema={('UI Schema', uiSchema)}
      onSubmit={handleSubmit}
      onServerSuccess={handleServerSuccess}
      formSuccessTitle="Huzzah"
      formSuccessMessage="You were successful! You will be redirected to pingidentity.com shortly."
    />
  );
};

export const customSubmit = () => {
  const schema = {
    title: 'Example Title',
    type: 'object',
    properties: {
      test: {
        type: 'string',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  };

  const uiSchema = {
    test: {
      'ui:options': {
        label: 'Text Label',
      },
    },
  };

  const handleServerError = async () => Promise.resolve({
    _form: {
      __errors: ['Form error'],
    },
    test: {
      __errors: ['Example error'],
    },
  });

  const handleServerSuccess = () => {
    alert('success!');
  };

  const handleSubmit = async ({ formData }, _event, onServerError, onServerSuccess) => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (formData && formData.test && formData.test === 'abc') {
      onServerSuccess();
    } else {
      onServerError();
    }
  };

  return (
    <Form
      schema={('Schema', schema)}
      uiSchema={('UI Schema', uiSchema)}
      onServerError={handleServerError}
      onServerSuccess={handleServerSuccess}
      onSubmit={handleSubmit}
      formSuccessTitle="Huzzah"
      formSuccessMessage="You were successful! Reload this doc to reset."
    />
  );
};
