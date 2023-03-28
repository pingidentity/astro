import React from 'react';

import { Label } from '../../index';

import { modes } from './constants';

export default {
  title: 'Form/Base Components/Label',
  component: Label,
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: modes,
      },
      defaultValue: modes.DEFAULT,
    },
    isDisabled: {},
    isRequired: {},
    requiredIndicator: {
      control: 'none',
    },
  },
};

export const Default = args => (
  <Label {...args}>This is a label</Label>
);

export const Float = () => (
  <Label mode="float">This is a float label</Label>
);

export const WithHelpHint = args => (
  <Label
    hintText="Example Hint"
    {...args}
  >
    This is a label
  </Label>
);
