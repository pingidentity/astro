import React, { useRef } from 'react';
import { Item } from 'react-stately';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import FormSelectIcon from '@pingux/mdi-react/FormSelectIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Badge,
  Box,
  ListViewItem,
  ListViewItemChart,
  ListViewItemEditButton,
  ListViewItemMenu,
  ListViewItemSwitchField,
  Separator,
  Text,
} from '../..';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { pingImg } from '../../utils/devUtils/constants/images';

import { chartData } from './controls/chart/chartData';
import ListViewItemReadMe from './ListViewItem.mdx';
import { listViewItemArgTypes } from './listViewItemAttributes';

export default {
  title: 'Components/ListViewItem',
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
    />
  </Wrapper>
);

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listViewItem.default,
  },
};

export const WithSubtext = () => (
  <Wrapper>
    <ListViewItem
      data={{
        icon: AccountIcon,
        subtext: 'rad_developer@pingidentity.com',
        text: 'Fons Vernall',
      }}
    />
  </Wrapper>
);

WithSubtext.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listViewItem.withSubText,
  },
};

export const WithImage = () => (
  <Wrapper>
    <ListViewItem
      data={{
        image: {
          src: pingImg,
          alt: 'avatar',
          'aria-label': 'avatar',
        },
        subtext: 'rad_developer@pingidentity.com',
        text: 'Fons Vernall',
      }}
    />
  </Wrapper>
);

WithImage.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listViewItem.withImage,
  },
};

export const WithControls = () => (
  <Wrapper>
    <ListViewItem
      data={{
        icon: FormSelectIcon,
        text: 'Fons Vernall',
      }}
    >
      <ListViewItemEditButton aria-label="edit-icon" />
      <ListViewItemSwitchField aria-label="active user" />
      <ListViewItemMenu>
        <Item key="enable">Enable user</Item>
        <Item key="disable">Disable user</Item>
        <Item key="delete">Delete user</Item>
      </ListViewItemMenu>
    </ListViewItem>
  </Wrapper>
);

WithControls.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listViewItem.withControls,
  },
};

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

WithRightOfDataSlot.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listViewItem.withRightOfDataSlot,
  },
};

export const WithLeftOfDataSlot = () => {
  const renderLeftOfData = (
    <Box mx="sm" minWidth={35}>
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

WithLeftOfDataSlot.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listViewItem.withLeftOfDataSlot,
  },
};

export const WithCharts = () => {
  const containerRef = useRef();
  return (
    <Wrapper>
      <ListViewItem
        ref={containerRef}
        data={{
          text: 'Kangaroo',
          subtext: 'kangaroo@example.com',
          icon: FormSelectIcon,
        }}
      >
        <ListViewItemChart
          containerRef={containerRef}
          chartData={chartData}
          title="Avg daily sign-ons:"
          chartDataKey="fullData"
          contentCount="31"
          contentCountLabel="Past 7 days"
          chartLabel="12 wk trend"
          trend="+115.0%"
          tooltipText="See Contributing Data"
          ariaLabel="Kangaroo"
        />
        <ListViewItemSwitchField />
        <ListViewItemMenu>
          <Item key="enable">Enable user</Item>
          <Item key="disable">Disable user</Item>
          <Item key="delete">Delete user</Item>
        </ListViewItemMenu>
      </ListViewItem>
    </Wrapper>
  );
};

WithCharts.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listViewItem.withCharts,
  },
};

export const WithExtraLongText = () => {
  const renderRightOfData = (
    <Box isRow gap="sm" mx="sm">
      <Badge label="Label" />
      <Badge label="Label" bg="active" />
    </Box>
  );
  const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

  return (
    <Wrapper>
      <ListViewItem
        data={{
          icon: AccountIcon,
          text: longText,
          subtext: longText,
        }}
        slots={{ rightOfData: renderRightOfData }}
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

WithExtraLongText.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listViewItem.withExtraLongText,
  },
};
