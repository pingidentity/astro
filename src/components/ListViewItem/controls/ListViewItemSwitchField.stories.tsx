import React from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { ListViewItemSwitchField } from '../../..';
import { ListViewItemSwitchFieldProps } from '../../../types';
import { onHoverArgTypes } from '../../../utils/docUtils/hoverProps';
import { switchFieldArgs, switchFieldArgTypes } from '../../SwitchField/switchFieldAttributes';

delete switchFieldArgTypes.label;

export default {
  title: 'Components/ListViewItem/Controls/ListViewItemSwitchField',
  component: ListViewItemSwitchField,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    ...switchFieldArgTypes,
    ...onHoverArgTypes,
  },
  args: {
    ...switchFieldArgs,
    label: '',
  },
} satisfies Meta<typeof ListViewItemSwitchField>;

export const Default: StoryFn<ListViewItemSwitchFieldProps> = args => (
  <ListViewItemSwitchField {...args} />
);
