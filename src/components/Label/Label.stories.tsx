import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Label } from '../../index';
import { LabelProps } from '../../types';
import { modes } from '../../utils/devUtils/constants/labelModes';

import { labelArgTypes } from './labelAttributes';

export default {
  title: 'Form/Base Components/Label',
  component: Label,
  argTypes: labelArgTypes as unknown as Meta<typeof Label>['argTypes'],
  args: {
    mode: modes.DEFAULT,
  },
} satisfies Meta<typeof Label>;

export const Default: StoryFn<LabelProps> = (args: LabelProps) => (
  <Label {...args}>This is a label</Label>
);

export const Float: StoryFn = args => (
  <Label {...args} mode="float">This is a float label</Label>
);

export const WithHelpHint: StoryFn<LabelProps> = (args: LabelProps) => (
  <Label
    hintText="Example Hint"
    {...args}
  >
    This is a label
  </Label>
);
