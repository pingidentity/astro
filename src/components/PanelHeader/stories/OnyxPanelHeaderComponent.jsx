import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';

import {
  Box,
  Breadcrumbs,
  Item,
  PanelHeader,
  PanelHeaderCloseButton,
  PanelHeaderMenu,
  PanelHeaderSwitchField,
} from '../../..';
import { pingImg } from '../../../utils/devUtils/constants/images';

const PanelHeaderComponent = () => {
  const breadcrumbs = (
    <Box width="100%">
      <Breadcrumbs icon={ChevronRightIcon}>
        <Item
          aria-label="Lorem Text"
          href="https://www.pingidentity.com"
          key="Item1Key"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Item>
        <Item
          aria-label="Lorem Ut"
          key="Item2Key"
        >
          Ut enim ad minim veniam, quis nostrud exercitation ullamco,
          laboris nisi ut aliquip ex ea commodo consequat incididunt et dolore.
        </Item>
      </Breadcrumbs>
    </Box>
  );

  return (
    <Box gap="md">
      {/* Default Panel Header */}
      <PanelHeader
        data={{
          icon: AccountIcon,
          text: 'Fons Vernall',
          avatarDefaultText: 'FV',
        }}
      />

      {/* Panel Header with Subtext */}
      <PanelHeader
        data={{
          icon: AccountIcon,
          subtext: 'rad_developer@pingidentity.com',
          text: 'Fons Vernall',
          avatarDefaultText: 'FV',
        }}
      />

      {/* Panel Header with controls */}
      <PanelHeader
        data={{
          icon: AccountIcon,
          text: 'Fons Vernall',
          subtext: 'rad_developer@pingidentity.com',
          avatarDefaultText: 'FV',
        }}
      >
        <PanelHeaderSwitchField />
        <PanelHeaderMenu>
          <Item key="enable">Enable user</Item>
          <Item key="disable">Disable user</Item>
          <Item key="delete">Delete user</Item>
        </PanelHeaderMenu>
        <PanelHeaderCloseButton />
      </PanelHeader>

      {/* Panel Header with Logo Image */}
      <PanelHeader
        data={{
          image: {
            src: pingImg,
            alt: 'Ping Identity Logo',
            'aria-label': 'Ping Identity Logo',
            avatarDefaultText: 'FV',
          },
          text: 'Fons Vernall',
        }}
      />

      {/* Panel Header with long Breadcrumb text */}
      <PanelHeader
        data={{ icon: AccountIcon }}
        slots={{ rightOfData: breadcrumbs }}
      >
        <PanelHeaderCloseButton />
      </PanelHeader>

      {/* Panel Header with Copyable Subtext */}
      <PanelHeader
        isCopyable
        data={{
          icon: AccountIcon,
          subtext: 'rad_developer@pingidentity.com',
          text: 'Fons Vernall',
          avatarDefaultText: 'FV',
        }}
      />

      {/* Panel Header with long text and subtext */}
      <PanelHeader
        data={{
          avatarDefaultText: 'FV',
          icon: AccountIcon,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
          subtext: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        }}
      >
        <PanelHeaderSwitchField />
        <PanelHeaderMenu>
          <Item key="enable">Enable user</Item>
          <Item key="disable">Disable user</Item>
          <Item key="delete">Delete user</Item>
        </PanelHeaderMenu>
        <PanelHeaderCloseButton />
      </PanelHeader>
    </Box>
  );
};

export default PanelHeaderComponent;
