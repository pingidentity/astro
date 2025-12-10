import React from 'react';

import { ListViewItemEditButton } from '../../..';
import { iconButtonArgs, iconButtonArgTypes } from '../../IconButton/iconButtonAttributes';

delete iconButtonArgTypes.size;
delete iconButtonArgTypes.icon;

export default {
  title: 'Components/ListViewItem/Controls/ListViewItemEditButton',
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
