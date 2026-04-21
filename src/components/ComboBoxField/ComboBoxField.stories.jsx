import React, { useCallback, useEffect, useState } from 'react';
import { useFilter } from '@react-aria/i18n';
import { action } from 'storybook/actions';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { getAllUsers } from '../../api/users';
import { ComboBoxField,
  Item,
  OverlayProvider,
  Section } from '../../index';
import { LIMIT } from '../../mocks/constants';
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
      { name: 'Raccoon', key: 'raccoon' },
      { name: 'Kangaroo', key: 'kangaroo' },
      { name: 'Opossum', key: 'opossum' },
    ],
  },
  {
    name: 'People',
    key: 'People',
    children: [
      { name: 'Michael', key: 'michael' },
      { name: 'Dwight', key: 'dwight' },
      { name: 'Creed', key: 'creed' },
    ],
  },
  {
    name: 'Fruits',
    key: 'fruit',
    children: [
      { name: 'Apple', key: 'apple' },
      { name: 'Orange', key: 'orange' },
      { name: 'Banana', key: 'banana' },
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
      control: false,
    },
    inputValue: {
      control: false,
    },
    items: {
      control: false,
    },
    isOpen: {
      control: false,
    },
    ...ariaAttributeBaseArgTypes,
  },
  args: {
    label: 'Example label',
    defaultItems: items,
    disableKeys: ['Snake'],
    'aria-label': 'ComboBox Field',
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
    <ComboBoxField
      {...args}
      label="Example label"
      defaultItems={withSection}
    >
      {section => (
        <Section
          key={section.key}
          items={section.children}
          title={section.name}
        >
          {item => <Item key={item.key}>{item.name}</Item>}
        </Section>
      )}
    </ComboBoxField>
  </OverlayProvider>
);

export const AsyncLoading = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(LIMIT);
  const [dataSize, setDataSize] = useState(0);
  const [loading, setLoading] = useState(loadingStates.LOADING);
  const [filterText, setFilterText] = useState('');

  const fetchData = useCallback(async (currentLimit, searchText) => {
    try {
      const response = await getAllUsers(currentLimit, searchText);
      const json = await response.json();
      if (response.ok) {
        setData(json.body._embedded.users || []);
        setDataSize(json.body.count);
      } else {
        setData([]);
      }
      setLoading(loadingStates.IDLE);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(loadingStates.ERROR);
    }
  }, []);

  const handleLoadMore = () => {
    if (loading !== loadingStates.IDLE || limit >= dataSize) return;
    setLoading(loadingStates.LOADING_MORE);
    setLimit(prev => prev + LIMIT);
  };

  const handleSearch = searchText => {
    setLoading(loadingStates.FILTERING);
    setFilterText(searchText);
  };

  useEffect(() => {
    fetchData(limit, filterText);
  }, [fetchData, limit, filterText]);

  return (
    <OverlayProvider>
      <ComboBoxField
        {...actions}
        label="Example label"
        items={data}
        inputValue={filterText}
        onInputChange={handleSearch}
        loadingState={loading}
        onLoadMore={handleLoadMore}
      >
        {item => <Item key={item.name.given}>{item.name.given}</Item>}
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
      {item => <Item key={item.id}>{item.name}</Item>}
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
