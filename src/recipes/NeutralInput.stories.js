import React from 'react';
import CheckboxField from '../components/CheckboxField';

export default {
  title: 'Recipes/Neutral Checkbox Field',
};

export const Default = () => (
  <CheckboxField controlProps={{ color: 'neutral.10' }}>Click me</CheckboxField>
);
