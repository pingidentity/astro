import React from 'react';
import Card from './Card';
import Box from '../Box';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    children: { control: 'text' },
  },
};

export const Default = args => (
  <Card {...args} />
);

export const CardRow = () => (
  <Box isRow gap="md" >
    <Card>First</Card>
    <Card>Second</Card>
    <Card>Third</Card>
  </Box>
);

Default.args = {
  children: 'Card Children',
};
