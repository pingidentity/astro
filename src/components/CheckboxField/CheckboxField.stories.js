import React from 'react';
import CheckboxField from './CheckboxField';
import Link from '../Link';
import Text from '../Text';

export default {
  title: 'Form/CheckboxField',
  component: CheckboxField,
};

export const Default = () => (
  <CheckboxField
    label="Click me"
  />
);

export const DefaultSelected = () => (
  <CheckboxField
    isDefaultSelected
    label="Click me"
  />
);

export const Controlled = () => {
  const [isSelected, setSelected] = React.useState(false);
  return (
    <CheckboxField
      isSelected={isSelected}
      onChange={setSelected}
      label="Click me"
    />
  );
};

export const Required = () => (
  <CheckboxField
    isRequired
    label={
      <Text>
        I agree to the <Link href="https://pingidentity.com" target="_blank">Terms and Conditions</Link>
      </Text>
    }
  />
);

export const HelperText = () => (
  <CheckboxField
    status="error"
    helperText="Here is some helpful text..."
    label="Click me"
  />
);
