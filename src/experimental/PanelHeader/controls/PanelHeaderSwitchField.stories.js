import React from 'react';

import { switchFieldArgTypes } from '../../../components/SwitchField/switchFieldAttributes';
import { PanelHeaderSwitchField } from '../../../index';
import { onHoverArgTypes } from '../../../utils/docUtils/hoverProps';

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
    ...onHoverArgTypes,
  },
};

export const Default = args => (
  <PanelHeaderSwitchField {...args} />
);
