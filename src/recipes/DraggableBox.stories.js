import React from 'react';
import DragVerticalIcon from '@pingux/mdi-react/DragVerticalIcon';
import FormTextboxIcon from '@pingux/mdi-react/FormTextboxIcon';

import {
  Box,
  Icon,
  Text,
} from '../index';

export default {
  title: 'Recipes/Draggable Box',
};

export const Default = () => {
  return (
    <Box
      isRow
      alignItems="center"
      py="sm"
      px="xs"
      sx={{
        boxShadow: 'standard',
        ':hover': {
          cursor: 'grab',
        },
      }}
    >
      <Icon icon={DragVerticalIcon} size={22} color="neutral.60" title={{ name: 'Drag Vertical Icon' }} />
      <Icon icon={FormTextboxIcon} size={22} ml="sm" title={{ name: 'Form Textbox Icon' }} />
      <Text fontWeight={500} ml="md">
        Text Input
      </Text>
    </Box>
  );
};
