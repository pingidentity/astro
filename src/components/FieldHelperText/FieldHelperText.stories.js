import React from 'react';

import { FieldHelperText } from '../../index';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

export default {
  title: 'Form/Base Components/FieldHelperText',
  component: FieldHelperText,
  argTypes: {
    ...statusArgTypes,
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
