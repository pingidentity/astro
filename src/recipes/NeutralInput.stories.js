import React from 'react';
import CheckboxField from '../components/CheckboxField';

export default {
  title: 'Recipes/Neutral Checkbox Field',
};
const sx = {
  checkboxColor: {
    color: 'neutral.10',
  },
};

export const Default = () => (
  <CheckboxField sx={sx.checkboxColor}>Click me</CheckboxField>
);
