import React, { useState } from 'react';
import GlobeIcon from '@pingux/mdi-react/GlobeIcon';

import {
  Box,
  Link,
  NavBar,
  NavBarItem,
  NavBarSection,
  Separator,
  Text,
} from '../../..';

import HeaderBar from './HeaderBar';
import { data, logo, secondData, thirdData } from './NavData';

export default {
  title: 'Templates/Nav',
  parameters: {
    backgrounds: {
      default: 'accent',
      values: [{ name: 'accent', value: '#F7F8FD' }],
    },
  },
};

const SideNav = ({ setSelectedKey, selectedKey }) => (
  <NavBar
    setSelectedKey={setSelectedKey}
    selectedKey={selectedKey}
  >
    <Box padding="md">
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label="home link"
      >
        {logo}
      </Link>
    </Box>
    <Separator marginTop="lg" marginBottom="sm" />
    <Box variant="navBar.sectionContainer" paddingBottom="xl">
      <NavBarItem
        id="Overview"
        key="Overview"
        text="Overview"
        icon={GlobeIcon}
      />
      <NavBarSection items={data} hasSeparator />
      <NavBarSection items={secondData} hasSeparator title="PingOne Services" />
      <NavBarSection items={thirdData} />
    </Box>
  </NavBar>
);

export const Default = () => {
  const [selectedKey, setSelectedKey] = useState('Overview');

  return (
    <Box bg="accent.99" height="100vh">
      <SideNav setSelectedKey={setSelectedKey} selectedKey={selectedKey} />
      <HeaderBar />
      <Box ml={255} mt={25}>
        <Text as="h1" variant="title" sx={{ fontWeight: 3 }}>
          {selectedKey}
        </Text>
      </Box>
    </Box>
  );
};

Default.decorators = [
  Story => (
    <Box sx={{ margin: '-50px' }}>
      <Story />
    </Box>
  ),
];

Default.parameters = {
  layout: 'fullscreen',
};
