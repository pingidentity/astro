import React from 'react';

import { iconButtonArgTypes } from '../../../components/IconButton/iconButtonAttributes';
import { PanelHeaderCloseButton } from '../../../index';

delete iconButtonArgTypes.size;
delete iconButtonArgTypes.icon;

export default {
  title: 'Experimental/PanelHeader/Controls/PanelHeaderCloseButton',
  component: PanelHeaderCloseButton,
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
  <PanelHeaderCloseButton {...args} />
);
