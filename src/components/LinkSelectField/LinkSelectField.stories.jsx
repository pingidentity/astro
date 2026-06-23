import React, { useCallback, useEffect, useState } from 'react';
import { OverlayProvider } from 'react-aria';
import EarthIcon from '@pingux/mdi-react/EarthIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { getAllUsers } from '../../api/users';
import {
  Box,
  Button,
  Item,
  LinkSelectField,
  Section,
} from '../../index';
import { LIMIT } from '../../mocks/constants';
import { ariaAttributeBaseArgTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributeBaseArgTypes } from '../../utils/docUtils/fieldAttributes';
import { statusArgTypes } from '../../utils/docUtils/statusProp';

import LinkSelectFieldReadme from './LinkSelectField.mdx';

export default {
  title: 'Form/LinkSelectField',
  component: LinkSelectField,
  parameters: {
    docs: {
      page: () => (
        <>
          <LinkSelectFieldReadme />
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
      control: false,
    },
    iconProps: {
      control: false,
      description: 'Props object spread into the Icon inside the default trigger button. Supports icon, title, size, color, sx, and other IconProps. The sx prop is merged with the rotation style.',
    },
    trigger: {
      control: false,
      description: 'A ReactNode that replaces the default Button trigger entirely. When provided, the local Button element is not rendered.',
    },
    ...statusArgTypes,
    ...ariaAttributeBaseArgTypes,
    ...inputFieldAttributeBaseArgTypes,
  },
  args: {
    label: 'What\'s your favourite color?',
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
    <Section>
      <Item key="none">None</Item>
    </Section>
    <Section>
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </Section>
  </LinkSelectField>
);

export const DisabledField = args => (
  <LinkSelectField {...args} label="What's your favorite color?" isDisabled>
    <Item key="red">Red</Item>
    <Item key="blue">Blue</Item>
    <Item key="yellow">Yellow</Item>
  </LinkSelectField>
);

export const DisabledOptions = args => (
  <LinkSelectField {...args} label="What's your favorite color?" disabledKeys={['blue']}>
    <Item key="red">Red</Item>
    <Item key="blue">Blue (disabled)</Item>
    <Item key="yellow">Yellow</Item>
  </LinkSelectField>
);

export const NoOptionsAvailable = args => (
  <LinkSelectField {...args} label="Select an option..." isDisabled defaultText="No options available" />
);

export const HelperText = args => (
  <LinkSelectField
    {...args}
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
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(LIMIT);
  const [dataSize, setDataSize] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async currentLimit => {
    try {
      const response = await getAllUsers(currentLimit);
      const json = await response.json();

      if (response.ok) {
        setData(json.body._embedded.users || []);
        setDataSize(json.body.count);
      }
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
    }
  }, []);

  const handleLoadMore = () => {
    if (limit >= dataSize) return;
    setLoading(true);
    setLimit(prevLimit => prevLimit + LIMIT);
  };

  useEffect(() => {
    fetchData(limit);
  }, [fetchData, limit]);

  return (
    <OverlayProvider>
      <LinkSelectField
        label="Pick a User"
        items={data}
        isLoading={loading}
        onLoadMore={handleLoadMore}
      >
        {item => <Item key={item.id}>{item.name.given}</Item>}
      </LinkSelectField>
    </OverlayProvider>
  );
};

export const WithPopoverWidth = args => (
  <OverlayProvider>
    <LinkSelectField {...args} width="100%" popoverWidth="20rem">
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Extra long goes here</Item>
    </LinkSelectField>
  </OverlayProvider>
);

WithPopoverWidth.parameters = {
  docs: {
    description: {
      story: 'The `popoverWidth` prop can be used to set a custom width for the dropdown/popover.',
    },
  },
};

export const WithIconProps = () => (
  <OverlayProvider>
    <LinkSelectField
      label="What's your favorite color?"
      iconProps={{ icon: EarthIcon, sx: { color: 'accent.40' } }}
    >
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </LinkSelectField>
  </OverlayProvider>
);

WithIconProps.parameters = {
  docs: {
    description: {
      story: 'Use the `iconProps` prop to customize the icon inside the default trigger button. Here a different icon and custom `sx` color are passed via `iconProps`.',
    },
  },
};

export const WithCustomTrigger = () => (
  <OverlayProvider>
    <LinkSelectField
      label="What's your favorite color?"
      trigger={<Button variant="primary">Open menu</Button>}
    >
      <Item key="red">Red</Item>
      <Item key="blue">Blue</Item>
      <Item key="yellow">Yellow</Item>
    </LinkSelectField>
  </OverlayProvider>
);

WithCustomTrigger.parameters = {
  docs: {
    description: {
      story: 'Use the `trigger` prop to supply a fully custom ReactNode trigger, replacing the default `Button` element entirely.',
    },
  },
};
