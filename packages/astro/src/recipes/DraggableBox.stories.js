import React from 'react';
import Box from '../components/Box';
import Icon from '../components/Icon';
import Text from '../components/Text';

export default {
  title: 'Recipes/DraggableBox',
};

const DragIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z" />
  </svg>
);

const FormTextboxIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M17,7H22V17H17V19A1,1 0 0,0 18,20H20V22H17.5C16.95,22 16,21.55 16,21C16,21.55 15.05,22 14.5,22H12V20H14A1,1 0 0,0 15,19V5A1,1 0 0,0 14,4H12V2H14.5C15.05,2 16,2.45 16,3C16,2.45 16.95,2 17.5,2H20V4H18A1,1 0 0,0 17,5V7M2,7H13V9H4V15H13V17H2V7M20,15V9H17V15H20Z" />
  </svg>
);

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
      <Icon icon={DragIcon} size={22} color="neutral.60" />
      <Icon icon={FormTextboxIcon} size={22} ml="sm" />
      <Text fontWeight={500} ml="md">
        Text Input
      </Text>
    </Box>
  );
};
