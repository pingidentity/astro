import React, { useState } from 'react';

import { ariaAttributeBaseArgTypes } from '../../utils/devUtils/props/ariaAttributes';
import RadioGroupField from '.';
import RadioField from '../RadioField';
import statuses from '../../utils/devUtils/constants/statuses';

export default {
  title: 'Form/RadioGroupField',
  component: RadioGroupField,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Pick one',
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    hintText: {
      control: {
        type: 'text',
      },
    },
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
    },
    defaultValue: {
      defaultValue: 'A',
    },
    orientation: {},
    isDisabled: {},
    isRequired: {},
    name: {},
    id: {},
    value: {
      control: {
        type: 'none',
      },
    },
    ...ariaAttributeBaseArgTypes,
  },
};

export const Default = args => (
  <RadioGroupField {...args}>
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

export const HorizontalOrientation = () => (
  <RadioGroupField label="Pick one" orientation="horizontal">
    <RadioField value="A" label="A" />
    <RadioField value="B" label="B" />
    <RadioField value="C" label="C" />
  </RadioGroupField>
);
