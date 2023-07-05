import React from 'react';
import { Item } from 'react-stately';

import { menuArgTypes } from '../../../components/Menu/menuAttributes';
import { ListItemMenu } from '../../../index';

export default {
  title: 'Experimental/StyledListItem/Controls/ListItemMenu',
  component: ListItemMenu,
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
  <ListItemMenu>
    <Item key="enable">Enable user</Item>
    <Item key="disable">Disable user</Item>
    <Item key="delete">Delete user</Item>
  </ListItemMenu>
);
