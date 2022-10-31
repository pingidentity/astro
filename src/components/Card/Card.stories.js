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

export const CardRow = () => {
  const sx = {
    li: {
      display: 'inline',
      flexGrow: 1,
      flexBasis: '0%',
    },
    card: {
      display: 'block',
    },
  };

  return (
    <Box isRow gap="md" as="ul" pl="0px">
      <Box as="li" sx={sx.li} >
        <Card sx={sx.card}>First</Card>
      </Box>
      <Box as="li" sx={sx.li} >
        <Card sx={sx.card}>Second</Card>
      </Box>
      <Box as="li" sx={sx.li} >
        <Card sx={sx.card}>Third</Card>
      </Box>
    </Box>
  );
};
