import React from 'react';
import CheckboxField from './CheckboxField';

export default {
  title: 'CheckboxField',
  component: CheckboxField,
};

export const Default = () => (
  <CheckboxField>Click me</CheckboxField>
);

export const DefaultSelected = () => (
  <CheckboxField controlProps={{ isDefaultSelected: true }}>Click me</CheckboxField>
);

export const withControlProps = () => {
  const [isSelected, setSelected] = React.useState();
  return (
    <CheckboxField controlProps={{ onClick: () => setSelected(isSelected) }}>
      Click me
    </CheckboxField>
  );
};
