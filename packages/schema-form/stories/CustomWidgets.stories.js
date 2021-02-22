import React from 'react';
import SchemaForm from '../src/components/SchemaForm';

const MyWidget = () => <div>I am a custom widget...</div>;

export const CustomWidgets = () => {
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
      'ui:widget': 'myWidget',
    },
  };

  const widgets = {
    myWidget: MyWidget,
  };

  return (
    <SchemaForm
      schema={('Schema', schema)}
      uiSchema={('uiSchema', uischema)}
      widgets={('widgets', widgets)}
    />
  );
};
