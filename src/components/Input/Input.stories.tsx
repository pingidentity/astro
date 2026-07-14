import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { Input } from '../../index';
import { InputProps } from '../../types';

import { inputArgTypes } from './inputAttributes';

export default {
  title: 'Form/Base Components/Input',
  component: Input,
  argTypes: { ...inputArgTypes },
  args: {
    placeholder: 'This is a basic input',
  },
} satisfies Meta<typeof Input>;

export const Default: StoryFn<InputProps> = (args: InputProps) => (
  <Input {...args} />
);

export const Password: StoryFn = args => (
  <Input placeholder="This is a password input" type="password" {...args} />
);

export const LargeInput: StoryFn = args => (
  <Input variant="forms.input.large" placeholder="This is a large input" {...args} />
);
