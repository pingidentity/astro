import React, { useState } from 'react';
import SelectField, { Item } from '.';
import Separator from '../Separator';

export default {
  title: 'Form/SelectField',
  component: SelectField,
};

export const Default = () => (
  <SelectField label="What's your favorite color?">
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
  </SelectField>
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
    <Item key="blue">Blue (disabled)</Item>
    <Item key="yellow">Yellow</Item>
  </SelectField>
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
