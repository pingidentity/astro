import React from 'react';
import { Item } from 'react-stately';

import { ListViewItemMenu } from '../../..';
import { menuArgTypes } from '../../Menu/menuAttributes';

export default {
  title: 'Components/ListViewItem/Controls/ListViewItemMenu',
  component: ListViewItemMenu,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    ...menuArgTypes,
    iconButtonProps: {
      description: 'object that gets spread into the IconButton component',
    },
  },
};

export const Default = () => (
  <ListViewItemMenu iconButtonProps={{ 'data-id': 'list-item-menu' }}>
    <Item key="enable">Enable user</Item>
    <Item key="disable">Disable user</Item>
    <Item key="delete">Delete user</Item>
  </ListViewItemMenu>
);
