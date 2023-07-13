import React from 'react';
import { Item } from 'react-stately';

import { menuArgTypes } from '../../../components/Menu/menuAttributes';
import { ListViewItemMenu } from '../../../index';

export default {
  title: 'Experimental/ListViewItem/Controls/ListViewItemMenu',
  component: ListViewItemMenu,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: menuArgTypes,
};

export const Default = () => (
  <ListViewItemMenu>
    <Item key="enable">Enable user</Item>
    <Item key="disable">Disable user</Item>
    <Item key="delete">Delete user</Item>
  </ListViewItemMenu>
);
