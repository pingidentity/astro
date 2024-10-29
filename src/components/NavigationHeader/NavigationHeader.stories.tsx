import React, { useState } from 'react';
import HelpCircleOutlineIcon from '@pingux/mdi-react/HelpCircleOutlineIcon';
import MoonWaningCrescentIcon from '@pingux/mdi-react/MoonWaningCrescentIcon';
import WhiteBalanceSunnyIcon from '@pingux/mdi-react/WhiteBalanceSunnyIcon';
import { Meta } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import useGetTheme from '../../hooks/useGetTheme';
import { Box, Icon, IconButton, IconButtonToggle, Item, Link, Menu, NavigationHeader, OverlayProvider, PopoverMenu, Separator, Text } from '../../index';
import { userImage } from '../../utils/devUtils/constants/images';

import HeaderAccountMenu from './HeaderAccountMenu';
import NavigationHeaderReadme from './NavigationHeader.mdx';

export default {
  title: 'Components/NavigationHeader',
  component: NavigationHeader,
  parameters: {
    docs: {
      page: () => (
        <>
          <NavigationHeaderReadme />
          <DocsLayout />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    src: {
      control: {
        type: 'none',
      },
    },
  },
} as Meta;

const iconButtonSX = {
  minWidth: '56px',
  borderRadius: '3px',
  py: 'xs',
  px: 'sm',
};

const placeholderSeparator = {
  bg: 'border.base',
  flexShrink: 0,
  mr: '0px',
  ml: '10px',
  height: '28px',
};

// Breakpoints for display property
const breakpointDisplaysXS = ['none', 'none', 'block', 'block', 'block', 'block'];
const breakpointDisplaySmall = ['none', 'none', 'none', 'none', 'block', 'block'];

export interface userDataProps {
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
}

const userData:userDataProps = {
  email: 'bjensen@example.com',
  firstName: 'Barbara',
  lastName: 'Jensen',
  image: userImage,
};

export const Default = ({ ...args }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { icons } = useGetTheme();

  return (
    <Box p="0">
      <NavigationHeader {...args} isSticky aria-labelledby="next-gen-header">

        <Box isRow alignItems="center" justifyContent="center" py="sm" flex="0 0 auto">
          {icons.pingLogoHorizontalSmall}
          <Separator orientation="vertical" sx={placeholderSeparator} style={{ height: '28px', marginLeft: '10px' }} />
          <Link href="#" variant="navigationHeader.logoBand">
            <Text as="h2" variant="navigationHeader.headerPlaceholder" id="next-gen-header">Marketplace</Text>
          </Link>
        </Box>

        <Box as="ul" isRow alignItems="center" p="0" ml="auto" flex="0 0 auto">
          <Box as="li" display={breakpointDisplaySmall}>
            <Link aria-label="Browse" href="#" variant="navigationHeader.link">Browse</Link>
          </Box>
          <Box as="li" display={breakpointDisplaySmall}>
            <Link aria-label="My Content" href="#" variant="navigationHeader.link">My Content</Link>
          </Box>
          <Box as="li" display={breakpointDisplaySmall}>
            <Link aria-label="Reports" href="#" variant="navigationHeader.link">Reports</Link>
          </Box>
          <Box as="li" display={breakpointDisplaysXS}>
            <OverlayProvider>
              <PopoverMenu isContainFocus>
                <IconButton
                  aria-label="Help & Support"
                  variant="headerNav"
                >
                  <Icon size="24px" color="gray-800" icon={HelpCircleOutlineIcon} title={{ name: 'help circle outline icon' }} />
                </IconButton>
                <Menu variant="navigationHeader.dropdownMenu">
                  <Item key="Help & Support">
                    <Link href="Help & Support" aria-label="Help & Support" variant="navigationHeader.dropdownMenuItem">
                      Help & Support
                    </Link>
                  </Item>
                  <Item key="Doc">
                    <Link href="Doc" aria-label="Doc" variant="navigationHeader.dropdownMenuItem">
                      Doc
                    </Link>
                  </Item>
                  <Item key="Developer">
                    <Link href="Developer" aria-label="Developer" variant="navigationHeader.dropdownMenuItem">
                      Developer
                    </Link>
                  </Item>
                  <Item key="Labs">
                    <Link href="Labs" aria-label="Labs" variant="navigationHeader.dropdownMenuItem">
                      Labs
                    </Link>
                  </Item>
                </Menu>
              </PopoverMenu>
            </OverlayProvider>
          </Box>
          <Box as="li" display={breakpointDisplaysXS}>
            <IconButtonToggle
              toggledIcon={WhiteBalanceSunnyIcon}
              defaultIcon={MoonWaningCrescentIcon}
              iconProps={{
                size: '24px',
              }}
              buttonProps={{
                'aria-label': 'theme icon',
                sx: iconButtonSX,
                variant: 'headerNav',
              }}
            />
          </Box>
          <Box as="li" display={breakpointDisplaysXS}>
            {
              isLoggedIn ? (
                <HeaderAccountMenu userData={userData} avatarProps={{ defaultText: 'KL', size: 'avatar.md', backgroundColor: 'red-100', color: 'red-800' }} />
              ) : (
                <Link
                  href="#"
                  variant="navigationHeader.link"
                  aria-label="Sign In"
                  onPress={() => setIsLoggedIn(!isLoggedIn)}
                >
                  Sign In
                </Link>
              )
            }
          </Box>
        </Box>

      </NavigationHeader>
    </Box>
  );
};
