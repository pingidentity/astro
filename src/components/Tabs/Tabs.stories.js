import React, { useState } from 'react';
import LockIcon from '@pingux/mdi-react/LockIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Badge,
  Box,
  Icon,
  Tab,
  Tabs,
  Text,
} from '../../index';

import TabsReadme from './Tabs.mdx';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    isDisabled: {},
    orientation: {},
    mode: {},
    defaultSelectedKey: {},
    selectedKey: {
      control: {
        type: 'none',
      },
    },
    tabListProps: {
      control: {
        type: 'none',
      },
    },
    tabPanelProps: {
      control: {
        type: 'none',
      },
    },
    items: {
      control: {
        type: 'none',
      },
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <TabsReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
};

const tabs = [
  { name: 'Tab 1', children: 'Tab 1 body' },
  { name: 'Tab 2', children: 'Tab 2 body' },
  { name: 'Tab 3', children: 'Tab 3 body' },
];

export const Uncontrolled = args => (
  <Tabs items={tabs} {...args}>
    <Tab key="tab1" title="Tab 1">
      <Text>This is content for Tab 1</Text>
    </Tab>
    <Tab key="tab2" title="Tab 2">
      <Text>This is content for Tab 2</Text>
    </Tab>
  </Tabs>
);

export const Controlled = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].name);
  return (
    <Tabs
      selectedKey={currentTab}
      onSelectionChange={setCurrentTab}
      items={tabs}
    >
      {item => (
        <Tab key={item.name} title={item.name} textValue={item.name}>
          {item.children}
        </Tab>
      )}
    </Tabs>
  );
};

export const WithTooltips = () => {
  return (
    <Tabs mode="tooltip" items={tabs}>
      {item => (
        <Tab key={item.name} title={item.name} textValue={item.name}>
          {item.children}
        </Tab>
      )}
    </Tabs>
  );
};

export const Centered = () => (
  <Tabs tabListProps={{ justifyContent: 'center' }} items={tabs}>
    {item => (
      <Tab key={item.name} title={item.name}>
        {item.children}
      </Tab>
    )}
  </Tabs>
);

export const DisabledSingleTab = () => (
  <Tabs items={tabs} disabledKeys={['Tab 2']}>
    {item => (
      <Tab key={item.name} title={item.name}>
        {item.children}
      </Tab>
    )}
  </Tabs>
);

export const DisabledAllTabs = () => (
  <Tabs isDisabled items={tabs}>
    {item => (
      <Tab key={item.name} title={item.name}>
        {item.children}
      </Tab>
    )}
  </Tabs>
);

export const CustomTabLine = () => (
  <Tabs items={tabs}>
    {item => (
      <Tab key={item.name} title={item.name} tabLineProps={{ bg: 'red' }}>
        {item.children}
      </Tab>
    )}
  </Tabs>
);

export const TabPanelProps = () => (
  <Tabs tabPanelProps={{ color: 'green', fontWeight: 500 }} items={tabs}>
    {item => (
      <Tab key={item.name} title={item.name}>
        {item.children}
      </Tab>
    )}
  </Tabs>
);


export const ContentSlots = () => {
  const beforeTabNode = (
    <Icon icon={LockIcon} sx={{ marginTop: 10, marginRight: 5 }} title={{ name: 'Lock Icon' }} />
  );
  const nodeSx = {
    marginLeft: 6,
    marginTop: 10,
  };
  const afterTabNode = (
    <Box>
      <Badge
        variant="countNeutral"
        sx={nodeSx}
        label="14"
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

export const WithList = () => {
  const allTabs = [
    ...tabs,
    {
      name: 'Tab 4',
      list: [
        { key: 'tab1list', name: 'Tab 1 list', children: 'Tab 1 from list', role: 'listitem' },
        { key: 'tab2list', name: 'Tab 2 list', children: 'Tab 2 from list', role: 'listitem' },
      ],
    },
  ];

  return (
    <Tabs items={allTabs} mode="list">
      {item => (
        <Tab key={item.name} title={item.name} {...item}>
          {item.children}
        </Tab>
      )}
    </Tabs>
  );
};
