import React from 'react';

import { PanelHeaderSwitchField } from '../../../index';
import { switchFieldArgTypes } from '../../SwitchField/switchFieldAttributes';

delete switchFieldArgTypes.label;

export default {
  title: 'Components/PanelHeader/Controls/PanelHeaderSwitchField',
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
