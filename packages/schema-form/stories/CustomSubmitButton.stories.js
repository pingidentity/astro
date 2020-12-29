import React, { useState } from 'react';
import SchemaForm from '../src/components/SchemaForm';

export const customSubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      onSubmit={() => {
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => setIsLoading(false), 3000);
      }}
    >
      <button type="submit" disabled={isLoading}>
        {
          isLoading
            ? '...'
            : 'Click me'
        }
      </button>
    </SchemaForm>
  );
};
