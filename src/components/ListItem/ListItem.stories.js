import React from 'react';
import ListItem from './ListItem';
import Box from '../Box';
import Icon from '../Icon';
import Text from '../Text';
import Button from '../Button';

export default {
  title: 'ListItem',
  component: ListItem,
};

const FormSelectIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M15 5H18L16.5 7L15 5M5 2H19C20.11 2 21 2.9 21 4V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11 3 20V4C3 2.9 3.9 2 5 2M5 4V8H19V4H5M5 20H19V10H5V20M7 12H17V14H7V12M7 16H17V18H7V16Z" />
  </svg>
);

const EditIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
  </svg>
);

const DotsVerticalIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
  </svg>
);

export const Default = () => (
  <ListItem>
    <Box isRow mr="auto" alignSelf="center" >
      <Icon icon={FormSelectIcon} mr="sm" color="text.primary" size={25} />
      <Text variant="itemTitle" alignSelf="center">Form 1</Text>
    </Box>
    <Box isRow alignSelf="center">
      <Button variant="icon" >
        <Icon icon={EditIcon} size={20} />
      </Button>
      <Button variant="icon">
        <Icon icon={DotsVerticalIcon} size={20} />
      </Button>
    </Box>
  </ListItem>
);
