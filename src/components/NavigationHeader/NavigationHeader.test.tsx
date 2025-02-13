import React from 'react';
import HelpCircleOutlineIcon from '@pingux/mdi-react/HelpCircleOutlineIcon';
import MoonWaningCrescentIcon from '@pingux/mdi-react/MoonWaningCrescentIcon';
import WhiteBalanceSunnyIcon from '@pingux/mdi-react/WhiteBalanceSunnyIcon';
import userEvent from '@testing-library/user-event';

import { Box, Icon, IconButton, IconButtonToggle, Image, Item, Link, Menu, OverlayProvider, PopoverMenu, Separator, Text } from '../../index';
import { pingLogoHorizontal, userImage } from '../../utils/devUtils/constants/images';
import { render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import NavigationHeader, { HeaderAccountMenu } from '.';

const breakpointDisplaysXS = ['none', 'none', 'block', 'block', 'block', 'block'];
const breakpointDisplaySmall = ['none', 'none', 'none', 'none', 'block', 'block'];

const pingLogoAlt = 'Ping Identity Logo';
const fallbackAlt = 'Fallback Image';

const userData = {
  email: 'bjensen@example.com',
  firstName: 'Barbara',
  lastName: 'Jensen',
  image: userImage,
};

const getComponent = (props = {}) => render(
  <NavigationHeader {...props} isSticky aria-labelledby="next-gen-header">
    <Link href="#" variant="navigationHeader.logoBand" data-testid="logo-band">
      <Box isRow alignItems="center" justifyContent="center" py="sm" flex="0 0 auto">
        <Image
          src={pingLogoHorizontal}
          alt={pingLogoAlt}
          mr="md"
          sx={{ height: '24px' }}
          data-testid="ping-logo"
          fallbackAlt={fallbackAlt}
        />
        <Separator orientation="vertical" style={{ height: '28px', margin: '0' }} />
        <Text as="h2" variant="navigationHeader.headerPlaceholder" id="next-gen-header">Marketplace</Text>
      </Box>
    </Link>

    <Box as="ul" isRow alignItems="center" p="0" ml="auto" flex="0 0 auto">
      <Box as="li" display={breakpointDisplaySmall} data-testid="Browse">
        <Link aria-label="Browse" href="#" variant="navigationHeader.link">Browse</Link>
      </Box>
      <Box as="li" display={breakpointDisplaySmall} data-testid="My-Content">
        <Link aria-label="My Content" href="#" variant="navigationHeader.link">My Content</Link>
      </Box>
      <Box as="li" display={breakpointDisplaySmall} data-testid="Reports">
        <Link aria-label="Reports" href="#" variant="navigationHeader.link">Reports</Link>
      </Box>
      <Box as="li" display={breakpointDisplaysXS}>
        <OverlayProvider>
          <PopoverMenu isContainFocus>
            <IconButton
              aria-label="Help & Support"
              variant="base"
              data-testid="help-support-button"
            >
              <Icon size="24px" color="gray-800" icon={HelpCircleOutlineIcon} title={{ name: 'help circle outline icon' }} />
            </IconButton>
            <Menu variant="navigationHeader.dropdownMenu">
              <Item key="Help & Support" textValue="Help & Support">
                <Link href="Help & Support" aria-label="Help & Support" variant="navigationHeader.dropdownMenuItem">
                  Help & Support
                </Link>
              </Item>
              <Item key="Doc" textValue="Doc">
                <Link href="Doc" aria-label="Doc" variant="navigationHeader.dropdownMenuItem">
                  Doc
                </Link>
              </Item>
              <Item key="Developer" textValue="Developer">
                <Link href="Developer" aria-label="Developer" variant="navigationHeader.dropdownMenuItem">
                  Developer
                </Link>
              </Item>
              <Item key="Labs" textValue="Labs">
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
            'data-testid': 'theme-toggle-icon-button',
          }}
        />
      </Box>
      <Box as="li" display={breakpointDisplaysXS} data-testid="header-account-menu">
        <HeaderAccountMenu userData={userData} buttonProps={{ 'data-testid': 'user-dropdown-button' }} avatarProps={{ defaultText: 'BJ', size: 'avatar.md', backgroundColor: 'red-100', color: 'red-800' }} />
      </Box>
    </Box>
  </NavigationHeader>,
);

const getAccountMenuComponent = (props = {}) => render(
  <NavigationHeader isSticky aria-labelledby="next-gen-header">
    <Link href="#" variant="navigationHeader.logoBand" data-testid="logo-band">
      <Box isRow alignItems="center" justifyContent="center" py="sm" flex="0 0 auto">
        <Image
          src={pingLogoHorizontal}
          alt={pingLogoAlt}
          mr="md"
          sx={{ height: '24px' }}
          data-testid="ping-logo"
          fallbackAlt={fallbackAlt}
        />
        <Separator orientation="vertical" style={{ height: '28px', margin: '0' }} />
        <Text as="h2" variant="navigationHeader.headerPlaceholder" id="next-gen-header">Marketplace</Text>
      </Box>
    </Link>

    <Box as="ul" isRow alignItems="center" p="0" ml="auto" flex="0 0 auto">
      <Box as="li" display={breakpointDisplaysXS} data-testid="header-account-menu">
        <HeaderAccountMenu {...props} buttonProps={{ 'data-testid': 'user-dropdown-button' }} avatarProps={{ defaultText: 'BJ', size: 'avatar.md', backgroundColor: 'red-100', color: 'red-800' }} />
      </Box>
    </Box>
  </NavigationHeader>,
);

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <NavigationHeader {...props} isSticky aria-labelledby="next-gen-header">
      <Link href="#" variant="navigationHeader.logoBand" data-testid="logo-band">
        <Box isRow alignItems="center" justifyContent="center" py="sm" flex="0 0 auto">
          <Image
            src={pingLogoHorizontal}
            alt={pingLogoAlt}
            mr="md"
            sx={{ height: '24px' }}
            data-testid="ping-logo"
            fallbackAlt={fallbackAlt}
          />
          <Separator orientation="vertical" style={{ height: '28px', margin: '0' }} />
          <Text as="h2" variant="navigationHeader.headerPlaceholder" id="next-gen-header">Marketplace</Text>
        </Box>
      </Link>

      <Box as="ul" isRow alignItems="center" p="0" ml="auto" flex="0 0 auto">
        <Box as="li" display={breakpointDisplaySmall} data-testid="Browse">
          <Link aria-label="Browse" href="#" variant="navigationHeader.link">Browse</Link>
        </Box>
        <Box as="li" display={breakpointDisplaySmall} data-testid="My-Content">
          <Link aria-label="My Content" href="#" variant="navigationHeader.link">My Content</Link>
        </Box>
        <Box as="li" display={breakpointDisplaySmall} data-testid="Reports">
          <Link aria-label="Reports" href="#" variant="navigationHeader.link">Reports</Link>
        </Box>
        <Box as="li" display={breakpointDisplaysXS}>
          <OverlayProvider>
            <PopoverMenu isContainFocus>
              <IconButton
                aria-label="Help & Support"
                variant="base"
                data-testid="help-support-button"
              >
                <Icon size="24px" color="gray-800" icon={HelpCircleOutlineIcon} title={{ name: 'help circle outline icon' }} />
              </IconButton>
              <Menu variant="navigationHeader.dropdownMenu">
                <Item key="Help & Support" textValue="Help & Support">
                  <Link href="Help & Support" aria-label="Help & Support" variant="navigationHeader.dropdownMenuItem">
                    Help & Support
                  </Link>
                </Item>
                <Item key="Doc" textValue="Doc">
                  <Link href="Doc" aria-label="Doc" variant="navigationHeader.dropdownMenuItem">
                    Doc
                  </Link>
                </Item>
                <Item key="Developer" textValue="Developer">
                  <Link href="Developer" aria-label="Developer" variant="navigationHeader.dropdownMenuItem">
                    Developer
                  </Link>
                </Item>
                <Item key="Labs" textValue="Labs">
                  <Link href="Labs" aria-label="Labs" variant="navigationHeader.dropdownMenuItem">
                    Labs
                  </Link>
                </Item>
              </Menu>
            </PopoverMenu>
          </OverlayProvider>
        </Box>
        <Box as="li" display={breakpointDisplaysXS} data-testid="theme-toggle-icon-button">
          <IconButtonToggle
            toggledIcon={WhiteBalanceSunnyIcon}
            defaultIcon={MoonWaningCrescentIcon}
            iconProps={{
              size: '24px',
            }}
            buttonProps={{
              'aria-label': 'theme icon',
            }}
          />
        </Box>
        <Box as="li" display={breakpointDisplaysXS} data-testid="header-account-menu">
          <HeaderAccountMenu userData={userData} avatarProps={{ defaultText: 'BJ', size: 'avatar.md', backgroundColor: 'red-100', color: 'red-800' }} />
        </Box>
      </Box>
    </NavigationHeader>
  ),
});

test('renders NavigationHeader component', () => {
  getComponent({ isSticky: false, 'data-testid': 'navigation-header' });
  const navigationHeaderElement = screen.getByTestId('navigation-header');
  expect(navigationHeaderElement).toBeInTheDocument();
});

test('renders NavigationHeader component with sticky position', () => {
  getComponent({ isSticky: true, 'data-testid': 'navigation-header' });
  const navigationHeaderElement = screen.getByTestId('navigation-header');
  expect(navigationHeaderElement).toBeInTheDocument();
  expect(navigationHeaderElement).toHaveStyle('position: sticky');
});

test('renders NavigationHeader component with placeholder', () => {
  getComponent();
  expect(screen.getByRole('heading', { name: 'Marketplace' })).toBeInTheDocument();
});

test('renders NavigationHeader component with link', () => {
  getComponent();
  expect(screen.getByLabelText('Browse')).toBeInTheDocument();
  expect(screen.getByLabelText('My Content')).toBeInTheDocument();
  expect(screen.getByLabelText('Reports')).toBeInTheDocument();
});

test('renders NavigationHeader component with theme toggle icon button', () => {
  getComponent();
  const themeIcon = screen.getByTestId('theme-toggle-icon-button');
  expect(themeIcon).toBeInTheDocument();
  expect(screen.getByText('MoonWaningCrescentIcon')).toBeInTheDocument();
  userEvent.click(themeIcon);
  expect(screen.getByText('WhiteBalanceSunnyIcon')).toBeInTheDocument();
});

test('should have is-focused class when focus', () => {
  getComponent({ isSticky: true });
  const logoBand = screen.getByTestId('logo-band');
  expect(logoBand).not.toHaveFocus();
  userEvent.tab();
  expect(logoBand).toHaveFocus();
  expect(logoBand).toHaveClass('is-focused');
  userEvent.tab();
  expect(logoBand).not.toHaveClass('is-focused');
  expect(logoBand).not.toHaveFocus();
});

test('should open dropdown menu when clicked', () => {
  getComponent();
  const helpSupport = screen.getByTestId('help-support-button');
  userEvent.click(helpSupport);
  const menuItem = screen.getByText('Help & Support');
  expect(menuItem).toBeInTheDocument();
});

test('should open dropdown menu when clicked', async () => {
  getComponent();
  const helpSupport = screen.getByTestId('help-support-button');
  userEvent.click(helpSupport);
  const menuItem = screen.getByText('Help & Support');
  expect(menuItem).toBeInTheDocument();

  const doc = screen.getByText('Doc');
  expect(doc).toBeInTheDocument();
});

test('should render HeaderAccountMenu component', () => {
  getAccountMenuComponent();
  const headerAccountMenuElement = screen.getByTestId('header-account-menu');
  expect(headerAccountMenuElement).toBeInTheDocument();
});

test('should render HeaderAccountMenu component with user data', () => {
  getAccountMenuComponent({ userData });
  const headerAccountMenuElement = screen.getByTestId('user-dropdown-button');
  userEvent.click(headerAccountMenuElement);
  expect(screen.getByText(`${userData.firstName} ${userData.lastName}`)).toBeInTheDocument();
  expect(screen.getByText(userData.email)).toBeInTheDocument();
});

test('should render empty HeaderAccountMenu component when userdata is empty', () => {
  getAccountMenuComponent();
  expect(screen.getByText('BJ')).toBeInTheDocument();
});
