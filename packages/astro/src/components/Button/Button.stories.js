import React from 'react';
import Button from '.';

export default {
  title: 'Button',
  component: Button,
};

export const Default = args => (
  <Button {...args}>
    Button Text
  </Button>
);
