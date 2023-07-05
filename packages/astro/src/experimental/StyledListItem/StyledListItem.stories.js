import React from 'react';
import { Item } from 'react-stately';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import FormSelectIcon from '@pingux/mdi-react/FormSelectIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Badge,
  Box,
  ListItemEditButton,
  ListItemMenu,
  ListItemSwitchField,
  Separator,
  StyledListItem,
  Text,
} from '../../index';

import StyledListItemReadme from './StyledListItem.mdx';
import { styledListItemArgTypes } from './styledListItemAttributes';

export default {
  title: 'Experimental/StyledListItem',
  component: StyledListItem,
  parameters: {
    docs: {
      page: () => (
        <>
          <StyledListItemReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: styledListItemArgTypes,
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
    <StyledListItem
      details={{
        icon: AccountIcon,
        text: 'Fons Vernall',
      }}
    />
  </Wrapper>
);

export const WithSubtext = () => (
  <Wrapper>
    <StyledListItem
      details={{
        icon: AccountIcon,
        subtext: 'rad_developer@pingidentity.com',
        text: 'Fons Vernall',
      }}
    />
  </Wrapper>
);

export const WithControls = () => (
  <Wrapper>
    <StyledListItem
      details={{
        icon: FormSelectIcon,
        text: 'Fons Vernall',
      }}
    >
      <ListItemEditButton />
      <ListItemSwitchField />
      <ListItemMenu>
        <Item key="enable">Enable user</Item>
        <Item key="disable">Disable user</Item>
        <Item key="delete">Delete user</Item>
      </ListItemMenu>
    </StyledListItem>
  </Wrapper>
);

export const WithRightOfDetailsSlot = () => {
  const renderRightOfDetails = (
    <Box isRow gap="md">
      <Badge label="Label" />
      <Badge label="Label" bg="active" />
    </Box>
  );

  return (
    <Wrapper>
      <StyledListItem
        details={{
          icon: AccountIcon,
          text: 'Fons Vernall',
          subtext: 'verylongemailaddress@email.com',
        }}
        slots={{ rightOfDetails: renderRightOfDetails }}
      >
        <ListItemMenu>
          <Item key="enable">Enable user</Item>
          <Item key="disable">Disable user</Item>
          <Item key="delete">Delete user</Item>
        </ListItemMenu>
      </StyledListItem>
    </Wrapper>
  );
};

export const WithLeftOfDetailsSlot = () => {
  const renderLeftOfDetails = (
    <Box mx="sm">
      <Text pr={3} variant="H3">Ping</Text>
    </Box>
  );

  return (
    <Wrapper>
      <StyledListItem
        details={{
          icon: AccountIcon,
          text: 'Fons Vernall',
          subtext: 'verylongemailaddress@email.com',
        }}
        // Note that when the leftOfDetails slot is used, it overrides the provided icon and
        // removes all margins and padding on the left of details
        slots={{ leftOfDetails: renderLeftOfDetails }}
      >
        <ListItemMenu>
          <Item key="enable">Enable user</Item>
          <Item key="disable">Disable user</Item>
          <Item key="delete">Delete user</Item>
        </ListItemMenu>
      </StyledListItem>
    </Wrapper>
  );
};

export const WithLinkProps = () => (
  <Wrapper>
    <StyledListItem
      details={{
        icon: AccountIcon,
        text: 'Fons Vernall',
      }}
      // With linkProps added, meta click functionality is enabled
      linkProps={{
        href: 'https://pingidentity.com/',
      }}
    >
      <ListItemSwitchField />
      <ListItemMenu>
        <Item key="enable">Enable user</Item>
        <Item key="disable">Disable user</Item>
        <Item key="delete">Delete user</Item>
      </ListItemMenu>
    </StyledListItem>
  </Wrapper>
);
