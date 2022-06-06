import React, { useState } from 'react';
import { Box, Item, MultivaluesField, OverlayProvider } from '../..';

export default {
  title: 'Form/MultivaluesField',
  component: MultivaluesField,
  argTypes: {
    direction: {},
    hasAutoFocus: {},
    hasNoStatusIndicator: {},
    isDisabled: {},
    isNotFlippable: {},
    isReadOnly: {},
    isRequired: {},
    label: {
      defaultValue: 'Field Label',
    },
    mode: {},
    placeholder: {},
    defaultSelectedKeys: {
      control: {
        type: 'none',
      },
    },
    disabledKeys: {
      control: {
        type: 'none',
      },
    },
    items: {
      control: {
        type: 'none',
      },
    },
    selectedKeys: {
      control: {
        type: 'none',
      },
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
    a11y: {
      config: {
        /** The "color-contrast" test ends with an "incomplete" status
         * since pseudo-element applies to the same container as selected values.
         * A  workaround to disable "color-contrast" incomplete tests.
         */
        rules: [{
          id: 'color-contrast',
          enabled: false,
        }],
      },
    },
  },
};

const items = [
  { id: 1, name: 'Aardvark', key: 'Aardvark' },
  { id: 2, name: 'Kangaroo', key: 'Kangaroo' },
  { id: 3, name: 'Snake', key: 'Snake' },
  { id: 4, name: 'Frog', key: 'Frog' },
  { id: 5, name: 'Seal', key: 'Seal' },
  { id: 6, name: 'Orangutan', key: 'Orangutan' },
  { id: 7, name: 'Shark', key: 'Shark' },
];

export const Default = args => (
  // const items = [
  // { id: 1, name: 'Aardvark', key: 'Aardvark' },
  // { id: 2, name: 'Kangaroo', key: 'Kangaroo' },
  // { id: 3, name: 'Snake', key: 'Snake' },
  // { id: 4, name: 'Frog', key: 'Frog' },
  // { id: 5, name: 'Seal', key: 'Seal' },
  // { id: 6, name: 'Orangutan', key: 'Orangutan' },
  // { id: 7, name: 'Shark', key: 'Shark' },
  // ];
  <OverlayProvider>
    <MultivaluesField items={items} {...args}>
      {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
    </MultivaluesField>
  </OverlayProvider>
);

export const WithCustomValues = args => (
  <OverlayProvider>
    <MultivaluesField items={items} mode="non-restrictive" {...args}>
      {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
    </MultivaluesField>
  </OverlayProvider>
);

WithCustomValues.argTypes = {
  mode: {
    defaultValue: 'non-restrictive',
  },
};

export const WithDisabledKeys = args => (
  <OverlayProvider>
    <MultivaluesField
      disabledKeys={['Aardvark']}
      items={items}
      {...args}
    >
      {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
    </MultivaluesField>
  </OverlayProvider>
);

export const Uncontrolled = args => (
  <OverlayProvider>
    <MultivaluesField
      defaultSelectedKeys={['Aardvark', 'Snake']}
      items={items}
      {...args}
    >
      {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
    </MultivaluesField>
  </OverlayProvider>
);

export const Controlled = (args) => {
  const [selectedKeys, setSelectedKeys] = useState(['Aardvark', 'Snake']);

  return (
    <OverlayProvider>
      <MultivaluesField
        label="Field Label"
        {...args}
        items={items}
        onSelectionChange={setSelectedKeys}
        selectedKeys={selectedKeys}
      >
        {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
      </MultivaluesField>
    </OverlayProvider>
  );
};

export const WithCustomSize = args => (
  <Box sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
    <Box width={300}>
      <OverlayProvider>
        <MultivaluesField items={items} {...args}>
          {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
        </MultivaluesField>
      </OverlayProvider>
    </Box>
  </Box>
);

export const WithReadOnlyValues = args => (
  <OverlayProvider>
    <MultivaluesField
      readOnlyKeys={['Aardvark', 'Snake']}
      items={items}
      {...args}
    >
      {item => <Item key={item.key} data-id={item.name}>{item.name}</Item>}
    </MultivaluesField>
  </OverlayProvider>
);
