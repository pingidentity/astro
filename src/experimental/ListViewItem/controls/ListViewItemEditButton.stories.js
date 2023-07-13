import React from 'react';

import { iconButtonArgTypes } from '../../../components/IconButton/iconButtonAttributes';
import { ListViewItemEditButton } from '../../../index';

delete iconButtonArgTypes.size;
delete iconButtonArgTypes.icon;

export default {
  title: 'Experimental/ListViewItem/Controls/ListViewItemEditButton',
  component: ListViewItemEditButton,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: iconButtonArgTypes,
};

export const Default = args => (
  <ListViewItemEditButton {...args} />
);
