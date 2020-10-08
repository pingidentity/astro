import React from 'react';
import Form from '../src/components/SchemaForm';

const rules = [{
  conditions: {
    dropdownExample: {
      not: {
        is: 'Yes',
      },
    },
  },
  event: {
    type: 'remove',
    params: {
      field: 'colorList',
    },
  },
},
{
  conditions: {
    colorList: {
      not: {
        is: 'Other',
      },
    },
  },
  event: {
    type: 'remove',
    params: {
      field: 'otherField',
    },
  },
},
];

export const ConditionalsExample = () => {
  const schema = {
    type: 'object',
    properties: {
      dropdownExample: {
        type: 'string',
        enum: [
          'No',
          'Yes',
        ],
      },
      colorList: {
        type: 'string',
        enum: [
          'Red',
          'Yellow',
          'Blue',
          'Other',
        ],
      },
      otherField: {
        type: 'string',
      },
    },
  };

  const uiSchema = {
    dropdownExample: {
      'ui:options': {
        label: 'Do you have a favorite color?',
      },
    },
    colorList: {
      'ui:options': {
        label: 'Which is closest to your favorite?',
      },
    },
    otherField: {
      'ui:widget': 'textarea',
      'ui:options': {
        label: 'Please tell us your favorite color!',
      },
    },
  };

  return (
    <Form
      schema={('Schema', schema)}
      uiSchema={('uiSchema', uiSchema)}
      rules={rules}
    />
  );
};
