import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { SharedItemArgTypes } from '../../components/ListViewItem/listViewItemAttributes';
import { Item,
  PanelHeader,
  PanelHeaderCloseButton,
  PanelHeaderMenu,
  PanelHeaderSwitchField } from '../../index';

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
