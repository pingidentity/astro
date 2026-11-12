import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { ListViewItemEditButton } from '../../..';
import { ListViewItemEditButtonProps } from '../../../types';
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
} satisfies Meta<typeof ListViewItemEditButton>;

export const Default: StoryFn<ListViewItemEditButtonProps> = args => (
  <ListViewItemEditButton aria-label="edit-icon" {...args} />
);
