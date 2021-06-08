import React from 'react';
import Input from '.';

export default {
  title: 'Form/Base Components/Input',
  component: Input,
  argTypes: {
    placeholder: {
      defaultValue: 'This is a basic input',
    },
    type: {},
    name: {},
    id: {},
  },
};

export const Default = args => (
  <Input {...args} />
);

export const Password = args => (
  <Input placeholder="This is a password input" type="password" {...args} />
);

export const LargeInput = args => (
  <Input variant="forms.input.large" placeholder="This is a large input" {...args} />
);
