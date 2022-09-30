import React from 'react';
import DragVerticalIcon from 'mdi-react/DragVerticalIcon';
import FormTextboxIcon from 'mdi-react/FormTextboxIcon';
import Box from '../components/Box';
import Icon from '../components/Icon';
import Text from '../components/Text';

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
      <Icon icon={DragVerticalIcon} size={22} color="neutral.60" />
      <Icon icon={FormTextboxIcon} size={22} ml="sm" />
      <Text fontWeight={500} ml="md">
        Text Input
      </Text>
    </Box>
  );
};
