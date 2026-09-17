import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  CheckboxFieldGroup,
  CheckboxFieldGroupItem,
  Text,
} from '../../index';
import { CheckboxFieldGroupProps } from '../../types';

import CheckboxFieldGroupReadme from './CheckboxFieldGroup.mdx';
import {
  checkboxFieldGroupArgTypes,
  checkboxFieldGroupItemArgTypes,
} from './checkboxFieldGroupAttributes';

const items = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: 'Push notification' },
];

const GroupItems = ({ isDisabled = false }: { isDisabled?: boolean }) => (
  <>
    {items.map(item => (
      <CheckboxFieldGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        isDisabled={isDisabled}
      />
    ))}
  </>
);

export default {
  title: 'Form/CheckboxFieldGroup',
  component: CheckboxFieldGroup,
  parameters: {
    docs: {
      page: () => (
        <>
          <CheckboxFieldGroupReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
    ...checkboxFieldGroupArgTypes,
    ...checkboxFieldGroupItemArgTypes,
  },
  args: {
    label: 'Notification channels',
    defaultValue: ['email'],
  },
} satisfies Meta<typeof CheckboxFieldGroup>;

export const Default: StoryFn<CheckboxFieldGroupProps> = (args: CheckboxFieldGroupProps) => (
  <CheckboxFieldGroup {...args}>
    <GroupItems />
  </CheckboxFieldGroup>
);

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState(['email']);

  return (
    <Box>
      <CheckboxFieldGroup
        label="Notification channels"
        value={value}
        onChange={setValue}
      >
        <GroupItems />
      </CheckboxFieldGroup>
      <Text mt="sm">
        Selected values:
        {' '}
        {value.join(', ') || 'none'}
      </Text>
    </Box>
  );
};

export const Disabled: StoryFn<CheckboxFieldGroupProps> = (args: CheckboxFieldGroupProps) => (
  <CheckboxFieldGroup {...args} label="Notification channels" isDisabled>
    <GroupItems isDisabled />
  </CheckboxFieldGroup>
);

export const Required: StoryFn<CheckboxFieldGroupProps> = (args: CheckboxFieldGroupProps) => (
  <CheckboxFieldGroup {...args} label="Notification channels" isRequired defaultValue={[]}>
    <GroupItems />
  </CheckboxFieldGroup>
);

export const ErrorInvalid: StoryFn<CheckboxFieldGroupProps> = (args: CheckboxFieldGroupProps) => (
  <CheckboxFieldGroup
    {...args}
    label="Notification channels"
    isInvalid
    status="error"
    errorMessage="Choose at least one notification channel."
    helperText="Select every channel where you want to receive updates."
  >
    <GroupItems />
  </CheckboxFieldGroup>
);

export const Horizontal: StoryFn<CheckboxFieldGroupProps> = (args: CheckboxFieldGroupProps) => (
  <CheckboxFieldGroup {...args} label="Notification channels" orientation="horizontal">
    <GroupItems />
  </CheckboxFieldGroup>
);

export const ReadOnly: StoryFn<CheckboxFieldGroupProps> = (args: CheckboxFieldGroupProps) => (
  <CheckboxFieldGroup
    {...args}
    label="Notification channels"
    isReadOnly
    defaultValue={['email', 'push']}
  >
    <GroupItems />
  </CheckboxFieldGroup>
);
