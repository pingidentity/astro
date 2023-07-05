import React from 'react';

import { iconButtonArgTypes } from '../../../components/IconButton/iconButtonAttributes';
import { ListItemEditButton } from '../../../index';

delete iconButtonArgTypes.size;
delete iconButtonArgTypes.icon;

export default {
  title: 'Experimental/StyledListItem/Controls/ListItemEditButton',
  component: ListItemEditButton,
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
  <ListItemEditButton {...args} />
);
