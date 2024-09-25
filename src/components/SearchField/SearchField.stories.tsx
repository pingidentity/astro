import React, { useState } from 'react';
import Users from '@pingux/mdi-react/AccountGroupIcon';
import FilterIcon from '@pingux/mdi-react/FilterIcon';
import SearchIcon from '@pingux/mdi-react/SearchIcon';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useDebounce } from '../../hooks';
import {
  Box,
  Button,
  Icon,
  SearchField,
  Text,
} from '../../index';
import { SearchFieldProps } from '../../types';
import { ariaAttributeBaseArgTypes, ariaAttributeBaseDocSettings } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';

import SearchFieldReadme from './SearchField.mdx';

export default {
  title: 'Form/SearchField',
  component: SearchField,
  parameters: {
    docs: {
      page: () => (
        <>
          <SearchFieldReadme />
          <DocsLayout />
        </>
      ),
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
    },
    placeholder: {},
    defaultValue: {},
    icon: {
      control: {
        type: 'none',
      },
    },
    isDisabled: {},
    hasAutoFocus: {},
    hasNoClearButton: {},
    autoComplete: {},
    iconProps: {},
    name: {},
    id: {},
    'aria-autocomplete': {
      table: ariaAttributeBaseDocSettings.table,
    },
    value: {
      control: {
        type: 'none',
      },
    },
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: {
    placeholder: 'Search Groups',
  },
} as Meta;

export const Default:StoryFn<SearchFieldProps> = (args:SearchFieldProps) => (
  <SearchField
    {...args}
    icon={SearchIcon}
    onSubmit={text => alert(text)} // eslint-disable-line no-alert
  />
);

export const Controlled:StoryFn<SearchFieldProps> = () => {
  const [value, setValue] = useState<string>('');
  return (
    <SearchField
      value={value}
      onChange={val => setValue(val)}
      aria-label="Search Groups"
      placeholder="Search Groups"
      onSubmit={text => alert(text)} // eslint-disable-line no-alert
    />
  );
};

export const CustomIcon:StoryFn<SearchFieldProps> = () => (
  <SearchField
    icon={Users}
    aria-label="Search Users"
    placeholder="Search Users"
    onSubmit={text => alert(text)} // eslint-disable-line no-alert
  />
);

export const NoClearButton:StoryFn<SearchFieldProps> = () => (
  <SearchField
    hasNoClearButton
    aria-label="Search Users"
    placeholder="Search Users"
    onSubmit={text => alert(text)} // eslint-disable-line no-alert
  />
);

export const ControlledWithDebouncedInput:StoryFn<SearchFieldProps> = () => {
  const [value, setValue] = useState('');
  const debouncedSearchText = useDebounce({ value, delay: 500 });
  return (
    <Box>
      <SearchField
        value={value}
        onChange={val => setValue(val)}
        aria-label="Search Groups"
        placeholder="Search Groups"
        onSubmit={text => alert(text)} // eslint-disable-line no-alert
      />
      <Text mt="xs">{`Debounced value: ${debouncedSearchText}`}</Text>
    </Box>
  );
};

export const WithFilter:StoryFn<SearchFieldProps> = () => {
  return (
    <Box p="xx" isRow gap="md">
      <SearchField
        aria-label="search items"
        placeholder="Search"
        size="container.xs"
      />
      <Button variant="filter" aria-label="filter button">
        <Icon icon={FilterIcon} />
      </Button>
    </Box>
  );
};
