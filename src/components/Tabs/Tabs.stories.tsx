import React, { useState } from 'react';
import LockIcon from '@pingux/mdi-react/LockIcon';
import LockOutlineIcon from '@pingux/mdi-react/LockOutlineIcon';
import { Meta, StoryFn } from '@storybook/react-vite';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { useGetTheme } from '../../hooks';
import { Badge, Box, Icon, Tab, Tabs, Text } from '../../index';
import { TabListItemProps, TabsProps } from '../../types';

import TabsReadme from './Tabs.mdx';
import { disabledSingleTabKey } from './Tabs.storyData';
import { tabsArgTypes } from './tabsAttributes';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: tabsArgTypes as unknown as Meta<typeof Tabs>['argTypes'],
  parameters: {
    actions: { argTypesRegex: null },
    test: { disable: true },
    docs: {
      page: () => (
        <>
          <TabsReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} satisfies Meta<typeof Tabs>;

const tabs: TabListItemProps[] = [
  { name: 'Overview', children: <Text>Tab 3 body</Text> },
  { name: 'Configuration', children: <Text>Tab 3 body</Text> },
  { name: 'Resources', children: <Text>Tab 3 body</Text> },
  { name: 'Policies', children: <Text>Tab 3 body</Text> },
  { name: 'Attribute Mappings', children: <Text>Tab 3 body</Text> },
  { name: 'Access', children: <Text>Tab 3 body</Text> },
  { name: 'Integration', children: <Text>Tab 3 body</Text> },
];

const customTabs = [
  { name: 'Details', children: <Text>Tab 1 body</Text>, isRequired: true },
  { name: 'First Factor', children: <Text>Tab 2 body</Text> },
  { name: 'MFA & Risk', children: <Text>Tab 3 body</Text> },
];

export const Default: StoryFn<TabsProps> = args => (
  <Tabs items={tabs} {...args}>
    <Tab key="tab1" title="Tab 1">
      <Text>This is content for Tab 1</Text>
    </Tab>
    <Tab key="tab2" title="Tab 2">
      <Text>This is content for Tab 2</Text>
    </Tab>
  </Tabs>
);

export const Controlled: StoryFn = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].name);
  const controlledTabs = tabs.map((tab, index) => (index === 1
    ? { ...tab, name: 'Configuration with a deliberately long label that wraps' }
    : tab));

  return (
    <Box sx={{ maxWidth: '500px' }}>
      <Tabs
        selectedKey={currentTab}
        onSelectionChange={setCurrentTab}
        items={controlledTabs}
      >
        {(item: TabListItemProps) => (
          <Tab key={item.name} title={item.name} textValue={item.name}>
            {item.children}
          </Tab>
        )}
      </Tabs>
    </Box>
  );
};

export const ScrollableContent: StoryFn = () => {
  const scrollableTabs = tabs.map(tab => ({
    ...tab,
    children: (
      <Box>
        <Text>
          {tab.name}
          {' content'}
        </Text>
        <Text>
          This panel contains additional content to demonstrate scrolling within the tab body.
        </Text>
        <Box sx={{ height: '300px' }} />
      </Box>
    ),
  }));

  return (
    <Box sx={{ maxWidth: '500px' }}>
      <Tabs
        items={scrollableTabs}
        tabPanelProps={{
          sx: {
            maxHeight: '200px',
            overflowY: 'auto',
          },
        }}
      >
        {(item: TabListItemProps) => (
          <Tab key={item.name} title={item.name} textValue={item.name}>
            {item.children}
          </Tab>
        )}
      </Tabs>
    </Box>
  );
};

export const Centered: StoryFn = () => (
  <Tabs tabListProps={{ justifyContent: 'center' }} items={tabs}>
    {(item: TabListItemProps) => (
      <Tab key={item.name} title={item.name}>
        {item.children}
      </Tab>
    )}
  </Tabs>
);

export const DisabledSingleTab: StoryFn = () => (
  <Tabs items={tabs} disabledKeys={[disabledSingleTabKey]}>
    {(item: TabListItemProps) => (
      <Tab key={item.name} title={item.name}>
        {item.children}
      </Tab>
    )}
  </Tabs>
);

export const DisabledAllTabs: StoryFn = () => (
  <Tabs isDisabled items={tabs}>
    {(item: TabListItemProps) => (
      <Tab key={item.name} title={item.name}>
        {item.children}
      </Tab>
    )}
  </Tabs>
);

export const ContentSlots: StoryFn = () => {
  const { themeState: { isOnyx } } = useGetTheme();
  const beforeTabNode = (
    <Icon
      icon={isOnyx ? LockOutlineIcon : LockIcon}
      size={isOnyx ? 24 : undefined}
      sx={{
        // alignSelf: 'center',
        marginTop: isOnyx ? undefined : 'sm',
        marginRight: isOnyx ? undefined : 'xs',
      }}
      title={{ name: 'Lock Icon' }}
    />
  );
  const afterTabNode = (
    <Box>
      <Badge
        variant="countNeutral"
        sx={{
          marginTop: isOnyx ? undefined : 'sm',
          marginLeft: isOnyx ? undefined : 'xs',
        }}
        label="14"
        aria-label="Count 14"
      />
    </Box>
  );

  return (
    <>
      <Tabs items={tabs} mb={50}>
        <Tab key="tab1" title="Tab 1" slots={{ beforeTab: beforeTabNode }}>
          <Text>This is content for Tab 1</Text>
        </Tab>
        <Tab key="tab2" title="Tab 2">
          <Text>This is content for Tab 2</Text>
        </Tab>
      </Tabs>

      <Tabs items={tabs}>
        <Tab key="tab1" title="Tab 1">
          <Text>Compose Filter</Text>
        </Tab>
        <Tab key="tab2" title="Tab 2" slots={{ afterTab: afterTabNode }}>
          <Text>Users Matched</Text>
        </Tab>
      </Tabs>
    </>
  );
};

ContentSlots.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'aria-required-children', enabled: false }],
    },
  },
};

export const WithList: StoryFn = () => {
  const allTabs = [
    ...tabs,
    {
      name: 'Tab 4',
      list: [
        { key: 'tab1list', name: 'Tab 1 list', children: 'Tab 1 from list', role: 'menuitemradio', parentName: 'Tab 4' },
        { key: 'tab2list', name: 'Tab 2 list', children: 'Tab 2 from list', role: 'menuitemradio', parentName: 'Tab 4' },
      ],
    },
  ];

  return (
    <Tabs items={allTabs} mode="list">
      {(item: TabListItemProps) => (
        <Tab key={item.name} title={item.name} {...item}>
          {item.children}
        </Tab>
      )}
    </Tabs>
  );
};
WithList.parameters = {
  a11y: {
    config: {
      rules: [{ id: 'aria-required-children', enabled: false }],
    },
  },
};

export const CustomTabLine: StoryFn = () => (
  <Tabs items={tabs}>
    {(item: TabListItemProps) => (
      <Tab key={item.name} title={item.name} tabLineProps={{ bg: 'red' }}>
        {item.children}
      </Tab>
    )}
  </Tabs>
);

export const CustomPanelProps: StoryFn = () => (
  <Tabs tabPanelProps={{ color: 'green', fontWeight: 500 }} items={tabs}>
    {(item: TabListItemProps) => (
      <Tab key={item.name} title={item.name} data-testid={`testing-${item.name}`}>
        {item.children}
      </Tab>
    )}
  </Tabs>
);

CustomPanelProps.parameters = { codesandbox: false };

export const VerticalOrientation: StoryFn<TabsProps> = args => (
  <Tabs
    items={customTabs}
    {...args}
    orientation="vertical"
    tabPanelProps={{ sx: { m: '24px' } }}
    tabListProps={{ sx: { width: '209px' } }}
  >
    {(item: TabListItemProps) => (
      <Tab
        key={item.name}
        title={item.name}
        data-testid={`testing-${item.name}`}
        isRequired={item?.isRequired}
      >
        {item.children}
      </Tab>
    )}
  </Tabs>
);
