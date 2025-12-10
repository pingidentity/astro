import React from 'react';

import { ListViewItemSwitchField } from '../../..';
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
};

export const Default = args => (
  <ListViewItemSwitchField {...args} />
);
