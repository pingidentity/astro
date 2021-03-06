import React from 'react';
import AccountIcon from 'mdi-react/AccountIcon';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import Box from '../components/Box';
import Icon from '../components/Icon';
import Text from '../components/Text';
import IconButton from '../components/IconButton';
import PopoverMenu from '../components/PopoverMenu';
import { Item, Menu, OverlayProvider } from '../index';

export default {
  title: 'Recipes/Panel Header',
};

export const Default = () => (
  <Box
    bg="accent.99"
    py="sm"
    pl="md"
    isRow
    alignItems="center"
    sx={{ width: 'fit-content' }}
  >
    <Icon icon={AccountIcon} size={25} color="accent.40" />
    <Box ml="sm" mr="xx" >
      <Text sx={{ fontSize: 'md', lineHeight: '18px' }} variant="bodyStrong">Fons Vernall</Text>
      <Text sx={{ fontSize: 'sm', my: '1px', lineHeight: '16px' }}variant="subtitle">fvernall0@google.it</Text>
    </Box>
    <OverlayProvider>
      <PopoverMenu>
        <IconButton aria-label="Menu Button" >
          <Icon icon={DotsVerticalIcon} size={16.8} color="Neutral.40" m="0.61px" />
        </IconButton>
        <Menu >
          <Item key="edit">Edit</Item>
          <Item key="duplicate">Duplicate</Item>
          <Item key="delete" textValue="delete">
            <Text color="critical.bright">Delete</Text>
          </Item>
        </Menu>
      </PopoverMenu>
    </OverlayProvider>
    <Box>
      <IconButton aria-label="Close Button" mx="10px">
        <Icon icon={CloseIcon} size={16.8} color="Neutral.40" m="0.61px" />
      </IconButton>
    </Box>
  </Box>
);
