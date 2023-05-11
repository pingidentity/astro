import React, { useState } from 'react';
import { OverlayProvider } from 'react-aria';
import { useAsyncList } from 'react-stately';

import {
  Item,
  Section,
  SelectField,
  Separator,
} from '../../index';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';
import { modes as labelModes } from '../Label/constants';

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
  { name: 'Animals',
    key: 'Animals',
    children: [
      { name: 'Aardvark' },
      { name: 'Kangaroo' },
      { name: 'Snake' },
    ] },
  { name: 'People',
    key: 'People',
    children: [
      { name: 'Michael' },
      { name: 'Dwight' },
      { name: 'Creed' },
    ] },
  { name: null,
    key: 'Fruit',
    children: [
      { name: 'Apple' },
      { name: 'Strawberry' },
      { name: 'Blueberry' },
    ] },
];

export default {
  title: 'Form/SelectField',
  component: SelectField,
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
      defaultValue: Object.values(labelModes)[0],
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
};

export const Default = args => (
  <OverlayProvider>
    <SelectField {...args} width="100%">
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </SelectField>
  </OverlayProvider>
);

export const WithSections = args => (
  <OverlayProvider>
    <SelectField items={withSection} {...args}>
      {section => (
        <Section key={section.key} items={section.children} title={section.name}>
          {item => <Item key={item.name}>{item.name}</Item>}
        </Section>
      )}
    </SelectField>
  </OverlayProvider>
);

export const WithCustomHeight = args => (
  <OverlayProvider>
    <SelectField label="Example label" items={animals} scrollBoxProps={{ maxHeight: '75px' }} {...args}>
      {item => <Item key={item.name}>{item.name}</Item>}
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
    <Item key="none">None</Item>
    <Item isSeparator textValue="-"><Separator /></Item>
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
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

const options = new Array(200).fill().map((_, i) => ({ key: `option-${i}`, name: `Option ${i}` }));
export const DynamicItems = () => {
  // options = new Array(200).fill().map((_, i) => ({ key: `option-${i}`, name: `Option ${i}` }));
  const [items] = useState(options);

  return (
    <OverlayProvider>
      <SelectField label="Select an option..." items={items}>
        {item => <Item key={item.key}>{item.name}</Item>}
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
        items={list.items}
        isLoading={list.isLoading}
        onLoadMore={list.loadMore}
      >
        {item => <Item key={item.name}>{item.name}</Item>}
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
