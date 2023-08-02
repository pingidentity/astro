import React, { useRef, useState } from 'react';
import { Pressable } from '@react-aria/interactions';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  SwitchField,
  Tooltip,
  TooltipTrigger,
} from '../../index';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import SwitchFieldReadme from './SwitchField.mdx';
import { switchFieldArgs, switchFieldArgTypes } from './switchFieldAttributes';

export default {
  title: 'Form/SwitchField',
  component: SwitchField,
  parameters: {
    docs: {
      page: () => (
        <>
          <SwitchFieldReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    ...switchFieldArgTypes,
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: switchFieldArgs,
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
