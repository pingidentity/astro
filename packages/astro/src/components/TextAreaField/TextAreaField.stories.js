import React from 'react';
import TextAreaField from './TextAreaField';

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
