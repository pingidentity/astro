import React, { useState } from 'react';
import GlobeIcon from 'mdi-react/GlobeIcon';
import {
  Box,
  Link,
  NavBar,
  NavBarItem,
  NavBarSection,
  Separator,
  Text,
} from '../../index';
import { logo, data, secondData, thirdData } from './NavData';
import HeaderBar from './HeaderBar';

export default {
  title: 'Templates/Nav',
  parameters: {
    backgrounds: {
      default: 'accent',
      values: [{ name: 'accent', value: '#F7F8FD' }],
    },
  },
};

const SideNav = ({ setSelectedKeys, selectedKeys }) => (
  <NavBar
    setSelectedKeys={setSelectedKeys}
    selectedKeys={selectedKeys}
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
  const [selectedKeys, setSelectedKeys] = useState('Overview');

  return (
    <Box bg="accent.99" height="100vh">
      <SideNav setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys} />
      <HeaderBar />
      <Box ml={255} mt={25}>
        <Text as="h1" variant="title" sx={{ fontWeight: 3 }}>
          {selectedKeys}
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
