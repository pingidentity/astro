import React from 'react';
import { Item } from 'react-stately';

import { menuArgTypes } from '../../../components/Menu/menuAttributes';
import { PanelHeaderMenu } from '../../../index';

export default {
  title: 'Experimental/PanelHeader/Controls/PanelHeaderMenu',
  component: PanelHeaderMenu,
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
  <PanelHeaderMenu>
    <Item key="enable">Enable user</Item>
    <Item key="disable">Disable user</Item>
    <Item key="delete">Delete user</Item>
  </PanelHeaderMenu>
);
