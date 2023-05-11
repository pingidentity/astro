import React, { useRef, useState } from 'react';
import { Pressable } from '@react-aria/interactions';

import {
  SwitchField,
  Tooltip,
  TooltipTrigger,
} from '../../index';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

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
    ...statusArgTypes,
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

export const WithTooltip = () => {
  const tooltipTrigger = useRef();
  return (
    <TooltipTrigger crossOffset={15} offset={20} targetRef={tooltipTrigger}>
      <Pressable ref={tooltipTrigger}>
        <SwitchField aria-label="my-label" value="my-switch" />
      </Pressable>
      <Tooltip>Tooltip Content</Tooltip>
    </TooltipTrigger>
  );
};
