import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Label } from '../../index';
import { LabelProps } from '../../types';
import { modes } from '../../utils/devUtils/constants/labelModes';

export default {
  title: 'Form/Base Components/Label',
  component: Label,
  argTypes: {
    mode: {
      control: {
        type: 'select',
        options: modes,
      },
    },
    isDisabled: {},
    isRequired: {},
    requiredIndicator: {
      control: 'none',
    },
  },
  args: {
    mode: modes.DEFAULT,
  },
} as Meta;

export const Default: StoryFn<LabelProps> = (args: LabelProps) => (
  <Label {...args}>This is a label</Label>
);

export const Float: StoryFn = () => (
  <Label mode="float">This is a float label</Label>
);

export const WithHelpHint: StoryFn<LabelProps> = (args: LabelProps) => (
  <Label
    hintText="Example Hint"
    {...args}
  >
    This is a label
  </Label>
);
