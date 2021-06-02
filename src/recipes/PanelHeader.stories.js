import React from 'react';
import AccountIcon from 'mdi-react/AccountIcon';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import Box from '../components/Box';
import Icon from '../components/Icon';
import Text from '../components/Text';
import Button from '../components/Button';
import PopoverMenu from '../components/PopoverMenu';
import { Item, Menu, OverlayProvider } from '../index';

export default {
  title: 'Recipes/Panel Header',
};

export const Default = () => (
  <Box
    bg="accent.99"
    py="sm"
    px="lg"
    isRow
    alignItems="center"
    sx={{ width: 'fit-content' }}
  >
    <Icon icon={AccountIcon} size={25} />
    <Box ml="md" mr="xl">
      <Text variant="sectionTitle">Fons Vernall</Text>
      <Text variant="subtitle">fvernall0@google.it</Text>
    </Box>
    <OverlayProvider>
      <PopoverMenu>
        <Button variant="icon">
          <Icon icon={DotsVerticalIcon} size={24} />
        </Button>
        <Menu >
          <Item key="edit">Edit</Item>
          <Item key="duplicate">Duplicate</Item>
          <Item key="delete" textValue="delete">
            <Text color="critical.bright">Delete</Text>
          </Item>
        </Menu>
      </PopoverMenu>
    </OverlayProvider>
    <Button variant="icon" ml="sm" alignSelf="center">
      <Icon icon={CloseIcon} size={24} />
    </Button>
  </Box>
);
