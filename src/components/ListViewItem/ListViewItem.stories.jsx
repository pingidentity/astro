import React, { useRef } from 'react';
import { Item } from 'react-stately';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import AccountOutlineIcon from '@pingux/mdi-react/AccountOutlineIcon';
import ClockOutlineIcon from '@pingux/mdi-react/ClockOutlineIcon';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Badge,
  Box,
  IconWrapper,
  ListView,
  ListViewItem,
  ListViewItemChart,
  ListViewItemMenu,
  ListViewItemSwitchField,
  SearchField,
  Separator,
  Text,
} from '../..';
import { useGetTheme } from '../../hooks';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';
import { userImagePanelHeader } from '../../utils/devUtils/constants/images';

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

const Wrapper = ({ children }) => {
  const { themeState: { isOnyx } } = useGetTheme();
  return (
    <Box
      sx={isOnyx ? {
        bg: 'transparent',
        border: '1px solid',
        borderColor: 'border.base',
        borderRadius: '1rem',
        p: '0',
      } : { bg: 'accent.99' }}
    >
      { !isOnyx && <Separator margin={0} /> }
      {children}
      { !isOnyx && <Separator margin={0} /> }
    </Box>
  );
};

export const Default = () => (
  <Wrapper>
    <ListViewItem
      data={{
        icon: AccountIcon,
        text: 'Fons Vernall',
      }}
      iconWrapperProps={{
        size: 'sm',
        color: 'blue',
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
      iconWrapperProps={{
        size: 'sm',
        color: 'blue',
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
          src: userImagePanelHeader,
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
        icon: AccountIcon,
        text: 'Fons Vernall',
      }}
      iconWrapperProps={{
        size: 'sm',
        color: 'blue',
      }}
    >
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
  const { badgeStyles: { blueBg, greyBg, blueText, greyText } } = useGetTheme();

  const renderRightOfData = (
    <Box isRow gap="sm" ml="sm">
      <Badge label="Label" textColor={greyText} bg={greyBg} sx={{ minWidth: 'unset' }} />
      <Badge label="Label" textColor={blueText} bg={blueBg} sx={{ minWidth: 'unset' }} />
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
        iconWrapperProps={{
          size: 'sm',
          color: 'blue',
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
    <Box pr="md" pl="lg" minWidth={35}>
      <Text pr={3} variant="H3" fontSize="md" fontWeight="3">Ping</Text>
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
        iconWrapperProps={{
          size: 'sm',
          color: 'orange',
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
          icon: ClockOutlineIcon,
        }}
        iconWrapperProps={{
          size: 'sm',
          color: 'green',
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
  const { badgeStyles: { blueBg, greyBg, blueText, greyText } } = useGetTheme();

  const renderRightOfData = (
    <Box isRow gap="sm" mx="sm">
      <Badge label="Label" textColor={greyText} bg={greyBg} sx={{ minWidth: 'unset' }} />
      <Badge label="Label" textColor={blueText} bg={blueBg} sx={{ minWidth: 'unset' }} />
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
        iconWrapperProps={{
          size: 'sm',
          color: 'blue',
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

export const WithExpandableItem = () => (
  <ListView
    items={[{
      key: 'Fons Vernall',
      name: 'Fons Vernall',
      subtext: 'rad_developer@pingidentity.com',
      id: '1',
      icon: AccountOutlineIcon,
    }]}
    selectionMode="expansion"
  >
    {
      item => (
        <Item key={item.key} textValue={item.name}>
          <Box isRow sx={{ alignItems: 'center' }} gap="lg">
            <IconWrapper
              icon={item.icon}
              size="sm"
              title={{ name: item.name }}
              isCircle
              color="blue"
            />
            <Box>
              <Text variant="listViewItemText">
                {item.name}
              </Text>
              <Text variant="listViewItemSubtext">
                {item.subtext}
              </Text>
            </Box>
          </Box>
          <Box sx={{ my: '20px' }}>
            <SearchField maxWidth="400px" aria-label="Search" placeholder="Search" />
            <Text variant="listViewItemExpandedText">
              Lorem ipsum dolor sit amet consectetur.
              Viverra nulla nec velit sollicitudin sed nisi mi gravida.
              Maecenas vestibulum pretium dictum dictum tempus.
              Sit et rutrum hendrerit facilisi turpis tellus elementum.
              Egestas consectetur in ac id. Sit aliquam et ut pellentesque in at blandit sed.
              Sapien morbi cras eleifend lectus.
            </Text>
          </Box>
        </Item>
      )
    }
  </ListView>
);

WithExpandableItem.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.listViewItem.default,
  },
};
