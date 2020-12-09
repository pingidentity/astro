import React from 'react';
import CheckboxField from './CheckboxField';
import Link from '../Link';
import Text from '../Text';

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

export const Controlled = () => {
  const [isSelected, setSelected] = React.useState();
  return (
    <CheckboxField controlProps={{ isSelected, onChange: setSelected }}>
      Click me
    </CheckboxField>
  );
};

export const Required = () => (
  <CheckboxField isRequired>
    <Text>
      I agree to the <Link href="https://pingidentity.com" target="_blank">Terms and Conditions</Link>
    </Text>
  </CheckboxField>
);

export const HelperText = () => (
  <CheckboxField status="error" helperText="Here is some helpful text...">Click me</CheckboxField>
);
