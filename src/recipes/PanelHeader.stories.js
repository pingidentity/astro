import React from 'react';
import AccountIcon from 'mdi-react/AccountIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';

import Box from '../components/Box';
import Icon from '../components/Icon';
import IconButton from '../components/IconButton';
import PopoverMenu from '../components/PopoverMenu';
import Text from '../components/Text';
import { Item, Menu, OverlayProvider } from '../index';

export default {
  title: 'Recipes/Panel Header',
};

const sx = {
  wrapper: {
    width: 'fit-content',
    alignItems: 'center',
    bg: 'accent.99',
    py: 'sm',
    pl: 'md',
  },
  title: {
    fontSize: 'md',
    lineHeight: '18px',
  },
  subtitle: {
    fontSize: 'sm',
    my: '1px',
    lineHeight: '16px',
  },
};

export const Default = () => (
  <Box isRow sx={sx.wrapper}>
    <Icon icon={AccountIcon} size={25} color="accent.40" />
    <Box ml="sm" mr="xx">
      <Text sx={sx.title} variant="bodyStrong">Fons Vernall</Text>
      <Text sx={sx.subtitle} variant="subtitle">fvernall0@google.it</Text>
    </Box>
    <OverlayProvider>
      <PopoverMenu>
        <IconButton aria-label="Menu Button">
          <Icon icon={DotsVerticalIcon} size="xs" color="Neutral.40" m="0.61px" />
        </IconButton>
        <Menu>
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
        <Icon icon={CloseIcon} size="xs" color="Neutral.40" m="0.61px" />
      </IconButton>
    </Box>
  </Box>
);
