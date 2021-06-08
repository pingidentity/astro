import React from 'react';
import Card from './Card';
import Box from '../Box';

export default {
  title: 'Card',
  component: Card,
  argTypes: {
    children: {
      description: 'Card content.',
      defaultValue: 'Card Children',
      table: {
        type: {
        },
      },
      control: {
        type: 'text',
      },
    },
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
