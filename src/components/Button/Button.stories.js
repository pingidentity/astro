import React from 'react';
import Box from '../Box/Box';
import Button from '.';
import Icon from '../Icon';

export default {
  title: 'Button',
  component: Button,
};

export const Default = args => (
  <Button {...args}>
    Button Text
  </Button>
);

const EditIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
  </svg>
);

export const IconButton = args => (
  <Button {...args} variant="icon">
    <Icon icon={EditIcon} size={20} />
  </Button>
);

const PlusIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </svg>
);

export const TextIconButton = () => (
  <Button mb="sm">
    <Box isRow alignItems="center">
      <Icon icon={PlusIcon} mr="sm" color="active" size={20} />
      Add a Form
    </Box>
  </Button>
);
