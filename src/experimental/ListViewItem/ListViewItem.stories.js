import React from 'react';
import { Item } from 'react-stately';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import FormSelectIcon from '@pingux/mdi-react/FormSelectIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Badge,
  Box,
  ListViewItem,
  ListViewItemEditButton,
  ListViewItemMenu,
  ListViewItemSwitchField,
  Separator,
  Text,
} from '../../index';

import ListViewItemReadMe from './ListViewItem.mdx';
import { listViewItemArgTypes } from './listViewItemAttributes';

export default {
  title: 'Experimental/ListViewItem',
  component: ListViewItem,
  parameters: {
    docs: {
      page: () => (
        <>
          <ListViewItemReadMe />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: listViewItemArgTypes,
};

const Wrapper = ({ children }) => (
  <Box sx={{ bg: 'accent.99' }}>
    <Separator margin={0} />
    {children}
    <Separator margin={0} />
  </Box>
);

export const Default = () => (
  <Wrapper>
    <ListViewItem
      data={{
        icon: AccountIcon,
        text: 'Fons Vernall',
      }}
      aria-label="Fons Vernall"
    />
  </Wrapper>
);

export const WithSubtext = () => (
  <Wrapper>
    <ListViewItem
      data={{
        icon: AccountIcon,
        subtext: 'rad_developer@pingidentity.com',
        text: 'Fons Vernall',
      }}
      aria-label="Fons Vernall"
    />
  </Wrapper>
);

export const WithControls = () => (
  <Wrapper>
    <ListViewItem
      data={{
        icon: FormSelectIcon,
        text: 'Fons Vernall',
      }}
      aria-label="Fons Vernall"
    >
      <ListViewItemEditButton />
      <ListViewItemSwitchField />
      <ListViewItemMenu>
        <Item key="enable">Enable user</Item>
        <Item key="disable">Disable user</Item>
        <Item key="delete">Delete user</Item>
      </ListViewItemMenu>
    </ListViewItem>
  </Wrapper>
);

export const WithRightOfDataSlot = () => {
  const renderRightOfData = (
    <Box isRow gap="sm" ml="sm">
      <Badge label="Label" />
      <Badge label="Label" bg="active" />
    </Box>
  );

  return (
    <Wrapper>
      <ListViewItem
        data={{
          icon: AccountIcon,
          text: 'Fons Vernall',
          subtext: 'verylongemailaddress@email.com',
        }}
        slots={{ rightOfData: renderRightOfData }}
        aria-label="Fons Vernall"
      >
        <ListViewItemMenu>
          <Item key="enable">Enable user</Item>
          <Item key="disable">Disable user</Item>
          <Item key="delete">Delete user</Item>
        </ListViewItemMenu>
      </ListViewItem>
    </Wrapper>
  );
};

export const WithLeftOfDataSlot = () => {
  const renderLeftOfData = (
    <Box mx="sm">
      <Text pr={3} variant="H3">Ping</Text>
    </Box>
  );

  return (
    <Wrapper>
      <ListViewItem
        data={{
          icon: AccountIcon,
          text: 'Fons Vernall',
          subtext: 'verylongemailaddress@email.com',
        }}
        // Note that when the leftOfData slot is used, it overrides the provided icon and
        // removes all margins and padding on the left of data
        slots={{ leftOfData: renderLeftOfData }}
        aria-label="Fons Vernall"
      >
        <ListViewItemMenu>
          <Item key="enable">Enable user</Item>
          <Item key="disable">Disable user</Item>
          <Item key="delete">Delete user</Item>
        </ListViewItemMenu>
      </ListViewItem>
    </Wrapper>
  );
};
