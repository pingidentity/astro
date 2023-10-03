import React from 'react';

import { switchFieldArgTypes } from '../../../components/SwitchField/switchFieldAttributes';
import { PanelHeaderSwitchField } from '../../../index';

delete switchFieldArgTypes.label;

export default {
  title: 'Experimental/PanelHeader/Controls/PanelHeaderSwitchField',
  component: PanelHeaderSwitchField,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    ...switchFieldArgTypes,
  },
};

export const Default = args => (
  <PanelHeaderSwitchField {...args} />
);
