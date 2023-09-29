import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { SharedItemArgTypes } from '../../components/ListViewItem/listViewItemAttributes';
import { Item,
  PanelHeader,
  PanelHeaderCloseButton,
  PanelHeaderMenu,
  PanelHeaderSwitchField } from '../../index';
import { pingImg } from '../../utils/devUtils/constants/images';

import PanelHeaderReadMe from './PanelHeader.mdx';

export default {
  title: 'Experimental/PanelHeader',
  component: PanelHeader,
  parameters: {
    docs: {
      page: () => (
        <>
          <PanelHeaderReadMe />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: SharedItemArgTypes,
};

export const Default = ({ ...args }) => (
  <PanelHeader
    {...args}
    data={{
      icon: AccountIcon,
      text: 'Fons Vernall',
    }}
  />
);

export const WithSubtext = ({ ...args }) => (
  <PanelHeader
    {...args}
    data={{
      icon: AccountIcon,
      subtext: 'rad_developer@pingidentity.com',
      text: 'Fons Vernall',
    }}
  />
);

export const WithControls = ({ ...args }) => (
  <PanelHeader
    {...args}
    data={{
      icon: AccountIcon,
      text: 'Fons Vernall',
      subtext: 'rad_developer@pingidentity.com',
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
);

export const WithImage = () => (
  <PanelHeader
    data={{
      image: {
        src: pingImg,
        alt: 'Ping Identity Logo',
        'aria-label': 'Ping Identity Logo',
      },
      text: 'Fons Vernall',
    }}
  />
);

export const WithExtraLongText = ({ ...args }) => (
  <PanelHeader
    {...args}
    data={{
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
);
