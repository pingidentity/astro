import React, { useState } from 'react';
import { Pressable } from '@react-aria/interactions';

import SwitchField from '.';
import { ariaAttributeBaseArgTypes } from '../../utils/devUtils/props/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/devUtils/props/fieldAttributes';
import { Tooltip, TooltipTrigger } from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';

export default {
  title: 'Form/SwitchField',
  component: SwitchField,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Example Label',
    },
    helperText: {
      control: {
        type: 'text',
      },
    },
    hintText: {
      control: {
        type: 'text',
      },
    },
    value: {
      defaultValue: 'my-switch',
    },
    name: {},
    className: {},
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
    },
    isDisabled: {},
    isRequired: {},
    isReadOnly: {},
    isDefaultSelected: {},
    hasAutoFocus: {},
    id: {},
    isSelected: {
      control: {
        type: 'none',
      },
    },
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
};

export const Default = args => (
  <SwitchField
    {...args}
  />
);

export const Controlled = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <SwitchField
      isSelected={isSelected}
      label="Controlled"
      onChange={setIsSelected}
      value="my-switch"
    />
  );
};

export const DefaultSelected = () => (
  <SwitchField
    isDefaultSelected
    label="Default selected"
    value="my-switch"
  />
);

export const Disabled = () => (
  <SwitchField
    isDisabled
    label="Disabled"
    value="my-switch"
  />
);

export const NoVisibleLabel = () => (
  <SwitchField
    aria-label="my-label"
    value="my-switch"
  />
);

export const Required = () => (
  <SwitchField isRequired label="Required" value="my-switch" />
);

export const WithTooltip = () => (
  <TooltipTrigger crossOffset={15} offset={20}>
    <Pressable>
      <SwitchField aria-label="my-label" value="my-switch" />
    </Pressable>
    <Tooltip>Tooltip Content</Tooltip>
  </TooltipTrigger>
);
