import React from 'react';
import TextAreaField from '.';

export default {
  title: 'TextAreaField',
  component: TextAreaField,
};

export const Default = args => (
  <TextAreaField
    {...args}
    label="Example label"
  />
);

export const HelperText = () => (
  <TextAreaField
    helperText="Here is some helpful text..."
    label="Example Label"
    status="error"
  />
);
