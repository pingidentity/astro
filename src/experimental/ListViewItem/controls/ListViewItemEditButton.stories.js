import React from 'react';

import { iconButtonArgs, iconButtonArgTypes } from '../../../components/IconButton/iconButtonAttributes';
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
  args: iconButtonArgs,
};

export const Default = args => (
  <ListViewItemEditButton aria-label="edit-icon" {...args} />
);
