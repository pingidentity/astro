import React, { useState } from 'react';
import Earth from 'mdi-react/GlobeModelIcon';
import Tabs from './Tabs';
import Tab from '../Tab';
import Icon from '../Icon';
import Text from '../Text';

export default {
  title: 'Tabs',
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
    <Tabs selectedKey={currentTab} onSelectionChange={setCurrentTab} items={tabs}>
      {item => (
        <Tab
          key={item.name}
          title={item.name}
          textValue={item.name}
        >
          {item.children}
        </Tab>
      )}
    </Tabs>
  );
};

export const WithIcon = () => (
  <Tabs items={tabs}>
    {item => (
      <Tab
        key={item.name}
        title={item.name}
        icon={<Icon icon={Earth} size={20} color="active" mb={10} />}
      >
        {item.children}
      </Tab>
    )}
  </Tabs>
);

export const WithTooltips = () => {
  return (
    <Tabs mode="tooltip" items={tabs}>
      {item => (
        <Tab
          key={item.name}
          title={item.name}
          textValue={item.name}
        >
          {item.children}
        </Tab>
      )}
    </Tabs>
  );
};

export const Centered = () => (
  <Tabs tabListProps={{ justifyContent: 'center' }} items={tabs}>
    {item => (
      <Tab
        key={item.name}
        title={item.name}
      >
        {item.children}
      </Tab>
    )}
  </Tabs>
);

export const DisabledSingleTab = () => (
  <Tabs defaultSelectedKey="Tab 2" items={tabs}>
    {item => (
      <Tab key={item.name} title={item.name} isDisabled={item.name === 'Tab 1'}>
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

export const Orientation = () => (
  <Tabs orientation="vertical" items={tabs}>
    {item => (
      <Tab key={item.name} title={item.name}>
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
