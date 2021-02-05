import React from 'react';
import FieldHelperText from '.';

export default {
  title: 'Form/Base Components/FieldHelperText',
  component: FieldHelperText,
};

export const Default = () => (
  <FieldHelperText>
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
