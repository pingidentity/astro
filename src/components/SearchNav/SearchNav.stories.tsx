import React, { useState } from 'react';

import { Box, Text } from '../../index';

import SearchNav from './SearchNav';

export default {
  title: 'Components/SearchNav',
};

const items = [
  { text: 'Overview', key: 'Overview', children: <Text>Overview</Text> },
  { text: 'Configuration', key: 'Configuration', children: <Text>Configuration</Text> },
  { text: 'Resources', key: 'Resources', children: <Text>Resources</Text> },
  { text: 'Policies', key: 'Policies', children: <Text>Policies</Text> },
  { text: 'Attribute Mappings', key: 'Attribute Mappings', children: <Text>Attribute body</Text> },
  { text: 'Access', key: 'Access', children: <Text>Access</Text> },
  { text: 'Integration', key: 'Integration', children: <Text>Integration</Text> },
];

export const Default = () => {
  const [selectedKey, setSelectedKey] = useState('Policies');

  const setSelectedKeyCallback = e => {
    setSelectedKey(e);
  };

  return (
    <Box maxWidth="600px">
      <SearchNav
        items={items}
        selectedKey={selectedKey}
        setSelectedKey={e => setSelectedKeyCallback(e)}
      />
      <Box p="sm">
        {items.find(item => item.key === selectedKey)?.children}
      </Box>
    </Box>
  );
};
