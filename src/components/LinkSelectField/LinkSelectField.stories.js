import React, { useState } from 'react';
import { OverlayProvider } from 'react-aria';
import { useAsyncList } from 'react-stately';

import {
  Box,
  Item,
  LinkSelectField,
  Separator,
} from '../../index';
import statuses from '../../utils/devUtils/constants/statuses';
import { ariaAttributeBaseArgTypes } from '../../utils/devUtils/props/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/devUtils/props/fieldAttributes';

export default {
  title: 'Form/LinkSelectField',
  component: LinkSelectField,
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
      defaultValue: 'What\'s your favourite color?',
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
    status: {
      control: {
        type: 'select',
        options: statuses,
      },
      defaultValue: statuses.DEFAULT,
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
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
};

export const Default = args => (
  <OverlayProvider>
    <LinkSelectField {...args} width="100%">
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </LinkSelectField>
  </OverlayProvider>
);

export const LeftLabel = () => (
  <Box gap="xl" width="100%">
    <LinkSelectField
      helperText="Here is some helpful text..."
      label="Example Label"
      labelMode="left"
    >
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </LinkSelectField>
    <LinkSelectField
      label="Example Label that is much longer than the previous one"
      labelMode="left"
    >
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </LinkSelectField>
    <LinkSelectField
      label="Example label with set width"
      labelMode="left"
      containerProps={{ sx: { gridTemplateColumns: '120px auto' } }}
    >
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </LinkSelectField>
  </Box>
);

LeftLabel.parameters = {
  docs: {
    description: {
      story: 'Users are able to override the default 40% column width when using left label by providing a new gridTemplatesColumn value, as shown in the example below.',
    },
  },
};

export const Controlled = () => {
  const [selectedKey, setSelectedKey] = useState('yellow');
  const handleSelectionChange = key => setSelectedKey(key);

  return (
    <LinkSelectField
      selectedKey={selectedKey}
      onSelectionChange={handleSelectionChange}
      label="What's your favorite color?"
    >
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </LinkSelectField>
  );
};

export const WithNoneOption = () => (
  <LinkSelectField label="What's your favorite color?">
    <Item key="none">None</Item>
    <Item isSeparator textValue="-"><Separator /></Item>
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
  </LinkSelectField>
);

export const DisabledField = () => (
  <LinkSelectField label="What's your favorite color?" isDisabled>
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
  </LinkSelectField>
);

export const DisabledOptions = () => (
  <LinkSelectField label="What's your favorite color?" disabledKeys={['blue']}>
    <Item key="red">Red</Item>
    <Item key="blue">Blue (disabled)</Item>
    <Item key="yellow">Yellow</Item>
  </LinkSelectField>
);

export const NoOptionsAvailable = () => (
  <LinkSelectField label="Select an option..." isDisabled defaultText="No options available" />
);

export const HelperText = () => (
  <LinkSelectField
    status="error"
    helperText="Here is some helpful text..."
    label="What's your favorite color?"
  >
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
  </LinkSelectField>
);

const options = new Array(200).fill().map((_, i) => ({ key: `option-${i}`, name: `Option ${i}` }));
export const DynamicItems = () => {
  // options = new Array(200).fill().map((_, i) => ({ key: `option-${i}`, name: `Option ${i}` }));
  const [items] = useState(options);

  return (
    <OverlayProvider>
      <LinkSelectField label="Select an option..." items={items}>
        {item => <Item key={item.key}>{item.name}</Item>}
      </LinkSelectField>
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
      <LinkSelectField
        label="Pick a Pokemon"
        items={list.items}
        isLoading={list.isLoading}
        onLoadMore={list.loadMore}
      >
        {item => <Item key={item.name}>{item.name}</Item>}
      </LinkSelectField>
    </OverlayProvider>
  );
};
