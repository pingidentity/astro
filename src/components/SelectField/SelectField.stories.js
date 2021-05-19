import { OverlayProvider } from '@react-aria/overlays';
import React, { useState } from 'react';
import { SelectField, Item, Separator } from '../../index';

export default {
  title: 'Form/SelectField',
  component: SelectField,
};

export const Default = () => (
  <OverlayProvider>
    <SelectField label="What's your favorite color?">
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
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
    <Item key="blue">Blue (disabled)</Item>
    <Item key="yellow">Yellow</Item>
  </SelectField>
);

export const NoOptionsAvailable = () => (
  <SelectField label="Select an option..." isDisabled defaultText="No options available" />
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
