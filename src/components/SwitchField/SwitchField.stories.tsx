import React, { useRef, useState } from 'react';
import { Pressable } from '@react-aria/interactions';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  SwitchField,
  Tooltip,
  TooltipTrigger,
} from '../../index';
import { SwitchFieldProps } from '../../types';
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
    },
  },
  argTypes: {
    ...switchFieldArgTypes,
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: switchFieldArgs,
} as Meta;

export const Default: StoryFn<SwitchFieldProps> = args => (
  <SwitchField
    {...args}
  />
);

export const Controlled: StoryFn<SwitchFieldProps> = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <SwitchField
      isSelected={isSelected}
      label="Controlled"
      onChange={() => setIsSelected(!isSelected)}
      value="my-switch"
    />
  );
};

export const DefaultSelected: StoryFn<SwitchFieldProps> = args => (
  <SwitchField
    {...args}
    isDefaultSelected
    label="Default selected"
    value="my-switch"
  />
);

export const Disabled: StoryFn<SwitchFieldProps> = args => (
  <SwitchField
    {...args}
    isDisabled
    label="Disabled"
    value="my-switch"
  />
);

export const NoVisibleLabel: StoryFn<SwitchFieldProps> = args => (
  <SwitchField
    {...args}
    aria-label="my-label"
    value="my-switch"
  />
);

export const Required: StoryFn<SwitchFieldProps> = args => (
  <SwitchField {...args} isRequired label="Required" value="my-switch" />
);

export const WithTooltip: StoryFn<SwitchFieldProps> = () => {
  const tooltipTrigger = useRef(null);
  return (
    <TooltipTrigger crossOffset={15} offset={20} targetRef={tooltipTrigger}>
      <Pressable ref={tooltipTrigger}>
        <SwitchField aria-label="my-label" value="my-switch" />
      </Pressable>
      <Tooltip>Tooltip Content</Tooltip>
    </TooltipTrigger>
  );
};
