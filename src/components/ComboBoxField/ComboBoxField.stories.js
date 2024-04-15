import React, { useState } from 'react';
import { useAsyncList } from 'react-stately';
import { useFilter } from '@react-aria/i18n';
import { action } from '@storybook/addon-actions';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { ComboBoxField,
  Item,
  OverlayProvider,
  Section } from '../../index';
import loadingStates from '../../utils/devUtils/constants/loadingStates';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';

import ComboBoxFieldReadme from './ComboBoxField.mdx';

const items = [
  { name: 'Aardvark', id: '1' },
  { name: 'Kangaroo', id: '2' },
  { name: 'Snake', id: '3' },
];

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
      { name: 'Raccoon' },
      { name: 'Kangaroo' },
      { name: 'Opossum' },
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
    key: 'fruit',
    children: [
      { name: 'Apple' },
      { name: 'Orange' },
      { name: 'Banana' },
    ],
  },
];

const actions = {
  onOpenChange: action('onOpenChange'),
  onInputChange: action('onInputChange'),
  onSelectionChange: action('onSelectionChange'),
  onBlur: action('onBlur'),
  onFocus: action('onFocus'),
  onLoadMore: action('onLoadMore'),
};

export default {
  title: 'Form/ComboBoxField',
  component: ComboBoxField,
  parameters: {
    docs: {
      page: () => (
        <>
          <ComboBoxFieldReadme />
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
    id: {},
    defaultItems: {},
    defaultSelectedKey: {},
    defaultInputValue: {},
    disabledKeys: {},
    direction: {},
    menuTrigger: {},
    isRequired: {},
    hasCustomValue: {},
    hasNoEmptySelection: {},
    isNotFlippable: {},
    hasAutoFocus: {},
    hasNoStatusIndicator: {},
    isReadOnly: {},
    isDisabled: {},
    loadingState: {
      control: {
        type: 'select',
        options: loadingStates,
      },
    },
    selectedKey: {
      control: {
        type: 'none',
      },
    },
    inputValue: {
      control: {
        type: 'none',
      },
    },
    items: {
      control: {
        type: 'none',
      },
    },
    isOpen: {
      control: {
        type: 'none',
      },
    },
    ...ariaAttributeBaseArgTypes,
  },
  args: {
    label: 'Example label',
    defaultItems: items,
    disableKeys: ['Snake'],
  },
};

export const Default = args => (
  <OverlayProvider>
    <ComboBoxField {...actions} {...args}>
      {item => <Item key={item.name} data-id={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const WithSections = args => (
  <OverlayProvider>
    <ComboBoxField label="Example label" items={withSection} {...args}>
      {section => (
        <Section key={section.key} items={section.children} title={section.name}>
          {item => <Item key={item.name}>{item.name}</Item>}
        </Section>
      )}
    </ComboBoxField>
  </OverlayProvider>
);

export const AsyncLoading = () => {
  // This example uses `useAsyncList` from "@react-stately/data"
  const list = useAsyncList({
    async load({ signal, cursor, filterText }) {
      if (cursor) {
        // eslint-disable-next-line
        cursor = cursor.replace(/^http:\/\//i, 'https://');
      }

      // If no cursor is available, then we're loading the first page,
      // filtering the results returned via a query string that
      // mirrors the ComboBox input text.
      // Otherwise, the cursor is the next URL to load,
      // as returned from the previous page.
      const res = await fetch(
        cursor || `https://swapi.dev/api/people/?search=${filterText}`,
        { signal },
      );
      const json = await res.json();
      // The API is too fast sometimes, so make it take longer so we can see the loader
      await new Promise(resolve => setTimeout(resolve, cursor ? 2000 : 3000));

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  return (
    <OverlayProvider>
      <ComboBoxField
        {...actions}
        label="Example label"
        items={list.items}
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
        loadingState={list.loadingState}
        onLoadMore={list.loadMore}
      >
        {item => <Item key={item.name}>{item.name}</Item>}
      </ComboBoxField>
    </OverlayProvider>
  );
};

export const ControlledInput = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <OverlayProvider>
      <ComboBoxField
        label="Example label"
        defaultItems={items}
        {...actions}
        inputValue={inputValue}
        onInputChange={setInputValue}
      >
        {item => <Item key={item.name}>{item.name}</Item>}
      </ComboBoxField>
    </OverlayProvider>
  );
};

export const ControlledMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Use menuTrigger="manual" if you don't want open change events to fire on input / focus
  return (
    <OverlayProvider>
      <ComboBoxField
        label="Example label"
        defaultItems={items}
        {...actions}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        {item => <Item key={item.name}>{item.name}</Item>}
      </ComboBoxField>
    </OverlayProvider>
  );
};

export const ControlledSelection = () => {
  const [selectedKey, setSelectedKey] = useState('');

  return (
    <OverlayProvider>
      <ComboBoxField
        label="Example label"
        defaultItems={items}
        {...actions}
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
      >
        {item => <Item key={item.name}>{item.name}</Item>}
      </ComboBoxField>
    </OverlayProvider>
  );
};

export const ControlledFiltering = () => {
  // import { useFilter } from '@react-aria/i18n'
  const { startsWith } = useFilter({ sensitivity: 'base' });

  const [fieldState, setFieldState] = useState({
    inputValue: '',
    selectedKey: '',
    itemsList: items,
  });

  const onSelectionChange = key => {
    const selectedItem = items.filter(({ id }) => id === key);
    setFieldState({
      inputValue: selectedItem?.name,
      selectedKey: key,
      itemsList: items.filter(item => startsWith(item.name, selectedItem?.name ?? ''),
      ),
    });
  };

  const onInputChange = value => {
    setFieldState((oldValues => ({
      inputValue: value,
      selectedKey: value === '' ? null : oldValues.selectedKey,
      itemsList: items.filter(item => startsWith(item.name, value)),
    })));
  };

  const onOpenChange = (isOpen, menuTrigger) => {
    if (menuTrigger === 'manual' && isOpen) {
      setFieldState(oldValues => ({
        inputValue: oldValues.inputValue,
        selectedKey: oldValues.selectedKey,
        itemsList: items,
      }));
    }
  };

  return (
    <OverlayProvider>
      <ComboBoxField
        label="Example label"
        {...actions}
        items={fieldState.itemsList}
        inputValue={fieldState.inputValue}
        selectedKey={fieldState.selectedKey}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
        onOpenChange={onOpenChange}
      >
        {item => <Item key={item.name}>{item.name}</Item>}
      </ComboBoxField>
    </OverlayProvider>
  );
};

export const ControlledWithCustomValue = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <OverlayProvider>
      <ComboBoxField
        label="Example label"
        defaultItems={items}
        {...actions}
        inputValue={inputValue}
        selectedKey={inputValue}
        onInputChange={setInputValue}
        onSelectionChange={setInputValue}
        hasCustomValue
      >
        {item => <Item key={item.name}>{item.name}</Item>}
      </ComboBoxField>
    </OverlayProvider>
  );
};

export const WithCustomInputValue = () => (
  <OverlayProvider>
    <ComboBoxField
      label="Example label"
      defaultItems={items}
      hasCustomValue
    >
      {item => <Item key={item.id} textValue={item.id}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const AllowCustomValue = () => (
  <OverlayProvider>
    <ComboBoxField label="Example label" defaultItems={items} hasCustomValue {...actions}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const DisabledKeys = () => (
  <OverlayProvider>
    <ComboBoxField
      label="Example label"
      defaultItems={items}
      disabledKeys={['Aardvark']}
      {...actions}
    >
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const FocusMenuTrigger = () => (
  <OverlayProvider>
    <ComboBoxField
      label="Example label"
      defaultItems={items}
      menuTrigger="focus"
      {...actions}
    >
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const Disabled = () => (
  <OverlayProvider>
    <ComboBoxField label="Example label" defaultItems={items} isDisabled {...actions}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const HelperText = () => (
  <OverlayProvider>
    <ComboBoxField
      label="Example label"
      defaultItems={items}
      helperText="focus"
      status="error"
      {...actions}
    >
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const ReadOnly = () => (
  <OverlayProvider>
    <ComboBoxField label="Example label" defaultItems={items} isReadOnly {...actions}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const Required = () => (
  <OverlayProvider>
    <ComboBoxField label="Example label" defaultItems={items} isRequired {...actions}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const WithoutStatusIndicator = () => (
  <OverlayProvider>
    <ComboBoxField label="Example label" defaultItems={items} hasNoStatusIndicator {...actions}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const WithCustomHeight = () => (
  <OverlayProvider>
    <ComboBoxField label="Example label" defaultItems={animals} scrollBoxProps={{ maxHeight: '75px' }} {...actions}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);

export const CustomDefaultFilter = () => {
  const { startsWith } = useFilter({ sensitivity: 'base' });

  return (
    <OverlayProvider>
      <ComboBoxField label="Example label" defaultItems={animals} defaultFilter={startsWith} {...actions}>
        {item => <Item key={item.name}>{item.name}</Item>}
      </ComboBoxField>
    </OverlayProvider>
  );
};

export const ControlledWithAddOption = () => {
  const [options, setOptions] = useState(items);
  const [inputValue, setInputValue] = useState('');
  const [selectedKey, setSelectedKey] = useState('');

  const onSelectionChange = key => {
    // Add new option to options array
    if (key && !options.find(({ name }) => name === key)) {
      setOptions([...options, { key, name: key }]);
    }
    setInputValue(key);
    setSelectedKey(key);
  };

  return (
    <OverlayProvider>
      <ComboBoxField
        label="Example label"
        defaultItems={options}
        {...actions}
        inputValue={inputValue}
        selectedKey={selectedKey}
        onInputChange={setInputValue}
        onSelectionChange={onSelectionChange}
        hasAddOption
      >
        {item => <Item key={item.name}>{item.name}</Item>}
      </ComboBoxField>
    </OverlayProvider>
  );
};
