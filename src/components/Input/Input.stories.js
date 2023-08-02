import React from 'react';

import { Input } from '../../index';

export default {
  title: 'Form/Base Components/Input',
  component: Input,
  argTypes: {
    placeholder: {},
    type: {},
    name: {},
    id: {},
  },
  args: {
    placeholder: 'This is a basic input',
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
