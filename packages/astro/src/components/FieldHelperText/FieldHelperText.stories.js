import React from 'react';

import statuses from '../../utils/devUtils/constants/statuses';

import FieldHelperText from '.';

export default {
  title: 'Form/Base Components/FieldHelperText',
  component: FieldHelperText,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
    },
  },
};

export const Default = args => (
  <FieldHelperText {...args}>
    Look at me!
  </FieldHelperText>
);

export const Error = () => (
  <FieldHelperText status="error">
    Look at me!
  </FieldHelperText>
);

export const Success = () => (
  <FieldHelperText status="success">
    Look at me!
  </FieldHelperText>
);

export const Warning = () => (
  <FieldHelperText status="warning">
    Look at me!
  </FieldHelperText>
);
