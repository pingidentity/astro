import React, { useState } from 'react';
import SwitchField from '.';
import statuses from '../../utils/devUtils/constants/statuses';

export default {
  title: 'Form/SwitchField',
  component: SwitchField,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Example Label',
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
    value: {
      defaultValue: 'my-switch',
    },
    name: {},
    className: {},
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
    },
    isDisabled: {},
    isRequired: {},
    isReadOnly: {},
    isDefaultSelected: {},
    hasAutoFocus: {},
    containerProps: {},
    labelProps: {},
    controlProps: {},
    id: {},
    'aria-label': {
      control: {
        type: 'text',
      },
    },
    'aria-labelledby': {
      control: {
        type: 'text',
      },
    },
    'aria-describedby': {
      control: {
        type: 'text',
      },
    },
    'aria-details': {
      control: {
        type: 'text',
      },
    },
    isSelected: {
      control: {
        type: 'none',
      },
    },
  },
};

export const Default = args => (
  <SwitchField
    {...args}
  />
);

export const Controlled = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <SwitchField
      isSelected={isSelected}
      label="Controlled"
      onChange={setIsSelected}
      value="my-switch"
    />
  );
};

export const DefaultSelected = () => (
  <SwitchField
    isDefaultSelected
    label="Default selected"
    value="my-switch"
  />
);

export const Disabled = () => (
  <SwitchField
    isDisabled
    label="Disabled"
    value="my-switch"
  />
);

export const NoVisibleLabel = () => (
  <SwitchField
    aria-label="my-label"
    value="my-switch"
  />
);

export const Required = () => (
  <SwitchField
    isRequired
    label="Required"
    value="my-switch"
  />
);
