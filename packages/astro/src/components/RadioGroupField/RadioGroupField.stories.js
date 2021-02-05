import React, { useState } from 'react';
import RadioGroupField from '.';
import RadioField from '../RadioField';

export default {
  title: 'Form/RadioGroupField',
  component: RadioGroupField,
};

export const Default = () => (
  <RadioGroupField label="Pick one" defaultValue="A">
    <RadioField value="A" label="A" />
    <RadioField value="B" label="B" />
    <RadioField value="C" label="C" />
  </RadioGroupField>
);

export const Controlled = () => {
  const [value, setValue] = useState('A');

  return (
    <RadioGroupField label="Pick one" value={value} onChange={newValue => setValue(newValue)}>
      <RadioField value="A" label="A" />
      <RadioField value="B" label="B" />
      <RadioField value="C" label="C" />
    </RadioGroupField>
  );
};

export const Required = () => (
  <RadioGroupField label="Pick one" isRequired>
    <RadioField value="A" label="A" />
    <RadioField value="B" label="B" />
    <RadioField value="C" label="C" />
  </RadioGroupField>
);

export const CheckedContent = () => (
  <RadioGroupField label="Pick one">
    <RadioField value="A" label="A" checkedContent="You chose A..." />
    <RadioField value="B" label="B" checkedContent="You chose B..." />
    <RadioField value="C" label="C" checkedContent="You chose C..." />
  </RadioGroupField>
);

export const HelperText = () => (
  <RadioGroupField
    label="Pick one"
    helperText="Here is some helpful text..."
    status="error"
  >
    <RadioField value="A" label="A" />
    <RadioField value="B" label="B" />
    <RadioField value="C" label="C" />
  </RadioGroupField>
);
