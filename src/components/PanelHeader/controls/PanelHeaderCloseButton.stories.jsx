import React from 'react';

import { PanelHeaderCloseButton } from '../../../index';
import { iconButtonArgTypes } from '../../IconButton/iconButtonAttributes';

delete iconButtonArgTypes.size;
delete iconButtonArgTypes.icon;

export default {
  title: 'Components/PanelHeader/Controls/PanelHeaderCloseButton',
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
