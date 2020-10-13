import React from 'react';
import CheckboxField from './CheckboxField';

export default {
  title: 'CheckboxField',
  component: CheckboxField,
};

export const Default = args => (
  <CheckboxField {...args}>Click me</CheckboxField>
);

export const DefaultSelected = () => (
  <CheckboxField controlProps={{ isDefaultSelected: true }}>Click me</CheckboxField>
);
