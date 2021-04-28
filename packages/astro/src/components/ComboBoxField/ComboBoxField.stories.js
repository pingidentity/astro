import React, { useState, useMemo } from 'react';
import { action } from '@storybook/addon-actions';
import { useFilter } from '@react-aria/i18n';
import { Item, OverlayProvider } from '../../index';
import ComboBoxField from './ComboBoxField';

export default {
  title: 'Form/ComboBoxField',
  component: ComboBoxField,
};

const items = [
  { name: 'Aardvark', id: '1' },
  { name: 'Kangaroo', id: '2' },
  { name: 'Snake', id: '3' },
];

const actions = {
  onOpenChange: action('onOpenChange'),
  onInputChange: action('onInputChange'),
  onSelectionChange: action('onSelectionChange'),
  onBlur: action('onBlur'),
  onFocus: action('onFocus'),
};

export const Default = () => (
  <OverlayProvider>
    <ComboBoxField label="Example label" defaultItems={items} {...actions}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>

);

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
  const [filterValue, setFilterValue] = useState('');
  const filteredItems = useMemo(
    () => items.filter(item => startsWith(item.name, filterValue)),
    [items, filterValue],
  );

  return (
    <OverlayProvider>
      <ComboBoxField
        label="Example label"
        {...actions}
        items={filteredItems}
        value={filterValue}
        onInputChange={setFilterValue}
      >
        {item => <Item key={item.name}>{item.name}</Item>}
      </ComboBoxField>
    </OverlayProvider>
  );
};

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

export const Required = () => (
  <OverlayProvider>
    <ComboBoxField label="Example label" defaultItems={items} isRequired {...actions}>
      {item => <Item key={item.name}>{item.name}</Item>}
    </ComboBoxField>
  </OverlayProvider>
);
