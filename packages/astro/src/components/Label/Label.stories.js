import React from 'react';
import Label from '.';
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
  },
};

export const Default = args => (
  <Label {...args}>This is a label</Label>
);

export const Float = () => (
  <Label mode="float">This is a float label</Label>
);
