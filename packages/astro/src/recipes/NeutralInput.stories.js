import React from 'react';
import CheckboxField from '../components/CheckboxField';

export default {
  title: 'Recipes/NeutralCheckboxField',
};

export const Default = () => (
  <CheckboxField controlProps={{ color: 'neutral.10' }}>Click me</CheckboxField>
);
