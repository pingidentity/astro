import React from 'react';

import { switchFieldArgTypes } from '../../../components/SwitchField/switchFieldAttributes';
import { ListViewItemSwitchField } from '../../../index';
import { onHoverArgTypes } from '../../../utils/docUtils/hoverProps';

delete switchFieldArgTypes.label;

export default {
  title: 'Experimental/ListViewItem/Controls/ListViewItemSwitchField',
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
};

export const Default = args => (
  <ListViewItemSwitchField {...args} />
);
