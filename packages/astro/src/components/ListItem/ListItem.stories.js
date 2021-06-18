import React from 'react';
import CreateIcon from 'mdi-react/CreateIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import FormSelectIcon from 'mdi-react/FormSelectIcon';
import ListItem from './ListItem';
import Box from '../Box';
import Icon from '../Icon';
import Text from '../Text';
import Button from '../Button';

export default {
  title: 'ListItem',
  component: ListItem,
};

export const Default = args => (
  <ListItem {...args}>
    <Box isRow mr="auto" alignSelf="center" >
      <Icon icon={FormSelectIcon} mr="sm" color="text.primary" size={25} />
      <Text variant="itemTitle" alignSelf="center">Form 1</Text>
    </Box>
    <Box isRow alignSelf="center">
      <Button variant="icon" >
        <Icon icon={CreateIcon} size={20} />
      </Button>
      <Button variant="icon">
        <Icon icon={MoreVertIcon} size={20} />
      </Button>
    </Box>
  </ListItem>
);
