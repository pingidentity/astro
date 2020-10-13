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
