import React from 'react';
import Input from '.';

export default {
  title: 'Input',
  component: Input,
};

export const Default = args => (
  <Input placeholder="This is a basic input" {...args} />
);

export const Password = args => (
  <Input placeholder="This is a password input" type="password" {...args} />
);

export const LargeInput = args => (
  <Input variant="forms.input.large" placeholder="This is a large input" {...args} />
);
