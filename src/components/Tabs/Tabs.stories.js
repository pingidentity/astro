import React, { useState } from 'react';
import { Earth } from '@pingux/icons';
import Tabs from './Tabs';
import Tab from '../Tab';
import Icon from '../Icon';

export default {
  title: 'Tabs',
  component: Tabs,
};

const tabs = [
  { name: 'Tab 1', children: 'Tab 1 body' },
  { name: 'Tab 2', children: 'Tab 2 body' },
  { name: 'Tab 3', children: 'Tab 3 body' },
];

export const Uncontrolled = () => (
  <Tabs>
    {tabs.map(tab => (
      <Tab key={tab.name} title={tab.name}>
        {tab.children}
      </Tab>
    ))}
  </Tabs>
);

export const Controlled = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].name);
  return (
    <Tabs selectedKey={currentTab} onSelectionChange={setCurrentTab}>
      {tabs.map(tab => (
        <Tab key={tab.name} title={tab.name}>
          {tab.children}
        </Tab>
      ))}
    </Tabs>
  );
};

export const WithIcon = () => (
  <Tabs>
    {tabs.map(tab => (
      <Tab
        key={tab.name}
        title={tab.name}
        icon={<Icon icon={Earth} size={20} color="active" mb={10} />}
      >
        {tab.children}
      </Tab>
    ))}
  </Tabs>
);

export const Centered = () => (
  <Tabs tabListProps={{ justifyContent: 'center' }}>
    {tabs.map(tab => (
      <Tab
        key={tab.name}
        title={tab.name}
      >
        {tab.children}
      </Tab>
    ))}
  </Tabs>
);

export const DisabledSingleTab = () => (
  <Tabs defaultSelectedKey="Tab 2">
    {tabs.map(tab => (
      <Tab key={tab.name} title={tab.name} isDisabled={tab.name === 'Tab 1'}>
        {tab.children}
      </Tab>
    ))}
  </Tabs>
);

export const DisabledAllTabs = () => (
  <Tabs isDisabled>
    {tabs.map(tab => (
      <Tab key={tab.name} title={tab.name}>
        {tab.children}
      </Tab>
    ))}
  </Tabs>
);

export const CustomTabLine = () => (
  <Tabs>
    {tabs.map(tab => (
      <Tab key={tab.name} title={tab.name} tabLineProps={{ bg: 'red' }}>
        {tab.children}
      </Tab>
    ))}
  </Tabs>
);

export const Orientation = () => (
  <Tabs orientation="vertical">
    {tabs.map(tab => (
      <Tab key={tab.name} title={tab.name}>
        {tab.children}
      </Tab>
    ))}
  </Tabs>
);

export const TabPanelProps = () => (
  <Tabs tabPanelProps={{ color: 'green', fontWeight: 500 }}>
    {tabs.map(tab => (
      <Tab key={tab.name} title={tab.name}>
        {tab.children}
      </Tab>
    ))}
  </Tabs>
);
