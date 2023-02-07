import React from 'react';
import Card from './Card';
import Box from '../Box';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    children: {
      description: 'Card content.',
      defaultValue: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut at enim nunc. Cras congue consequat odio, ac sodales lacus imperdiet quis. In id ex eu lorem sollicitudin hendrerit feugiat ultrices elit. Curabitur imperdiet libero vitae luctus blandit. Ut ac dignissim tortor. Pellentesque convallis eu metus vitae mollis. Donec sapien felis, laoreet eu egestas eu, blandit quis tellus. Donec luctus suscipit nibh, et tincidunt nisl facilisis ut. Mauris molestie purus at lectus venenatis, ac ultrices felis ultrices.',
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

export const CardRow = (args) => {
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
    <Box isRow gap="md" as="ul" pl="0px" >
      <Box as="li" sx={sx.li} >
        <Card sx={sx.card} {...args} />
      </Box>
      <Box as="li" sx={sx.li} >
        <Card sx={sx.card} {...args} />
      </Box>
      <Box as="li" sx={sx.li} >
        <Card sx={sx.card} {...args} />
      </Box>
    </Box>
  );
};
