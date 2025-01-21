import React, { Key, useState } from 'react';
import { OverlayProvider } from 'react-aria';
import { useAsyncList } from 'react-stately';
import CalendarRangeIcon from '@pingux/mdi-react/CalendarRangeIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Icon,
  Item,
  Section,
  SelectField,
} from '../../index';
import { modes as labelModes } from '../../utils/devUtils/constants/labelModes';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import SelectFieldReadme from './SelectField.mdx';

export type SelectItemProps = {
  name?: string
  id?: string
  key?: Key
}

export type SelectSectionProps = {
  name?: string
  key?: string,
  children?: SelectItemProps[]
}

const animals = [
  { name: 'Aardvark', id: '1' },
  { name: 'Kangaroo', id: '2' },
  { name: 'Snake', id: '3' },
  { name: 'Snail', id: '4' },
  { name: 'Slug', id: '5' },
  { name: 'Crow', id: '6' },
  { name: 'Dog', id: '7' },
  { name: 'Crab', id: '8' },
  { name: 'Fish', id: '9' },
  { name: 'Turtle', id: '10' },
  { name: 'Mouse', id: '11' },
  { name: 'Banana', id: '12' },
  { name: 'Shark', id: '13' },
  { name: 'Gorilla', id: '14' },
  { name: 'Goat', id: '15' },
];

const withSection = [
  {
    name: 'Animals',
    key: 'Animals',
    children: [
      { name: 'Aardvark' },
      { name: 'Kangaroo' },
      { name: 'Snake' },
    ],
  },
  {
    name: 'People',
    key: 'People',
    children: [
      { name: 'Michael' },
      { name: 'Dwight' },
      { name: 'Creed' },
    ],
  },
  {
    name: null,
    key: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Strawberry' },
      { name: 'Blueberry' },
    ],
  },
];

export default {
  title: 'Form/SelectField',
  component: SelectField,
  parameters: {
    docs: {
      page: () => (
        <>
          <SelectFieldReadme />
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
    defaultText: {},
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
    labelMode: {
      control: {
        type: 'select',
        options: Object.values(labelModes),
      },
    },
    defaultSelectedKey: {},
    disabledKeys: {},
    name: {},
    align: {},
    direction: {},
    hasNoEmptySelection: {},
    isDefaultOpen: {},
    isDisabled: {},
    isOpen: {},
    isRequired: {},
    selectedKey: {
      control: {
        type: 'none',
      },
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: {
    label: 'Example Label',
    labelMode: Object.values(labelModes)[0],
  },
};

export const Default = args => (
  <OverlayProvider>
    <SelectField {...args} width="100%" selectProps={{ 'data-testid': 'select-field' }}>
      <Item key="red" data-testid="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </SelectField>
  </OverlayProvider>
);

export const WithSections = args => (
  <OverlayProvider>
    <SelectField items={withSection} {...args}>
      {(section: SelectSectionProps) => (
        <Section key={section.key} items={section.children} title={section.name}>
          {(item: SelectItemProps) => <Item key={item.name}>{item.name}</Item>}
        </Section>
      )}
    </SelectField>
  </OverlayProvider>
);

export const WithCustomHeight = args => (
  <OverlayProvider>
    <SelectField label="Example label" items={animals} scrollBoxProps={{ maxHeight: '75px' }} {...args}>
      {(item: SelectItemProps) => <Item key={item.name}>{item.name}</Item>}
    </SelectField>
  </OverlayProvider>
);

export const FloatLabel = () => (
  <SelectField label="What's your favorite color?" labelMode="float">
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
  </SelectField>
);

export const Controlled = () => {
  const [selectedKey, setSelectedKey] = useState('yellow');
  const handleSelectionChange = key => setSelectedKey(key);

  return (
    <SelectField
      selectedKey={selectedKey}
      onSelectionChange={handleSelectionChange}
      label="What's your favorite color?"
    >
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </SelectField>
  );
};

export const WithNoneOption = () => (
  <SelectField label="What's your favorite color?">
    <Section>
      <Item key="none">None</Item>
    </Section>
    <Section>
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </Section>
  </SelectField>
);

export const WithSlots = () => (
  <SelectField
    slots={{
      leftOfData: (
        <Icon
          icon={CalendarRangeIcon}
          color="accent.40"
          mr="xs"
          title={{ name: 'Calendar Icon' }}
        />
      ),
    }}
  >
    <Item key="today">Today</Item>
    <Item key="fromYesterday">From Yesterday</Item>
    <Item key="last7days">Last 7 Days</Item>
    <Item key="last30days">Last 30 Days</Item>
    <Item key="thisMonth">This Month</Item>
    <Item key="lastMonth">Last Month</Item>
    <Item key="customRange">Custom Range</Item>
  </SelectField>
);

export const DisabledField = () => (
  <SelectField label="What's your favorite color?" isDisabled>
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
  </SelectField>
);

export const DisabledOptions = () => (
  <SelectField label="What's your favorite color?" disabledKeys={['blue']}>
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
  </SelectField>
);

export const NoOptionsAvailable = () => (
  <SelectField label="Select an option..." placeholder="No options available" />
);

export const HelperText = () => (
  <SelectField
    status="error"
    helperText="Here is some helpful text..."
    label="What's your favorite color?"
  >
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
  </SelectField>
);

const options = new Array(400).fill({ key: 'string', name: 'string' }).map((_, i) => ({ key: `option-${i}`, name: `Option ${i}` }));
export const DynamicItems = () => {
  // options = new Array(200).fill().map((_, i) => ({ key: `option-${i}`, name: `Option ${i}` }));
  const [items] = useState(options);

  return (
    <OverlayProvider>
      <SelectField label="Select an option..." items={items}>
        {(item: SelectItemProps) => <Item key={item.key}>{item.name}</Item>}
      </SelectField>
    </OverlayProvider>
  );
};
DynamicItems.parameters = {
  docs: {
    storyDescription: 'If using a long list or one that is dynamically updated, use the `items` prop and a function to render the children. See [the React Stately docs](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections) for more information about this.',
  },
};

export const AsyncLoading = () => {
  // This example uses `useAsyncList` from "@react-stately/data"
  const list = useAsyncList({
    async load({ signal, cursor }) {
      const res = await fetch(cursor || 'https://pokeapi.co/api/v2/pokemon', { signal });
      const json = await res.json();
      // The API is too fast sometimes, so make it take longer so we can see the spinner
      await new Promise(resolve => setTimeout(resolve, cursor ? 2000 : 3000));
      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  return (
    <OverlayProvider>
      <SelectField
        label="Pick a Pokemon"
        items={list.items as Iterable<SelectItemProps>}
        isLoading={list.isLoading}
        onLoadMore={list.loadMore}
      >
        {(item: SelectItemProps) => <Item key={item.name}>{item.name}</Item>}
      </SelectField>
    </OverlayProvider>
  );
};
export const WithoutStatusIndicator = () => (
  <SelectField label="What's your favorite color?" hasNoStatusIndicator>
    <Item key="none">None</Item>
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
  </SelectField>
);

export const WithHelpHint = () => (
  <OverlayProvider>
    <SelectField
      width="100%"
      hintText="Example Hint"
      label="What's your favorite color?"
    >
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </SelectField>
  </OverlayProvider>
);
