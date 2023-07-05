import React from 'react';

import { switchFieldArgTypes } from '../../../components/SwitchField/switchFieldAttributes';
import { ListItemSwitchField } from '../../../index';
import { onHoverArgTypes } from '../../../utils/docUtils/hoverProps';

delete switchFieldArgTypes.label;

export default {
  title: 'Experimental/StyledListItem/Controls/ListItemSwitchField',
  component: ListItemSwitchField,
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
  <ListItemSwitchField {...args} />
);
