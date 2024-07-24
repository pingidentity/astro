import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Breadcrumbs,
  Item,
  PanelHeader,
  PanelHeaderCloseButton,
  PanelHeaderMenu,
  PanelHeaderSwitchField,
} from '../../index';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks.ts';
import { pingImg } from '../../utils/devUtils/constants/images';
import { SharedItemArgTypes } from '../ListViewItem/listViewItemAttributes';

import PanelHeaderReadMe from './PanelHeader.mdx';

export default {
  title: 'Components/PanelHeader',
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

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.panelHeader.default,
  },
};

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

WithSubtext.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.panelHeader.withSubtext,
  },
};

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

WithControls.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.panelHeader.withControls,
  },
};

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

WithImage.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.panelHeader.withImage,
  },
};

export const WithBreadcrumbs = () => {
  const breadcrumbs = (
    <Breadcrumbs icon={ChevronRightIcon}>
      <Item
        aria-label="Fons Vernall"
        href="https://www.pingidentity.com"
        key="fonsVernallKey"
      >
        Fons Vernall
      </Item>
      <Item
        aria-label="Edit"
        key="editKey"
      >
        Edit
      </Item>
    </Breadcrumbs>
  );

  return (
    <PanelHeader
      data={{ icon: AccountIcon }}
      slots={{ rightOfData: breadcrumbs }}
    />
  );
};

export const BreadcrumbsWithExtraLongText = () => {
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
    <PanelHeader
      data={{ icon: AccountIcon }}
      slots={{ rightOfData: breadcrumbs }}
    />
  );
};

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

WithExtraLongText.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.panelHeader.withExtraLongText,
  },
};
