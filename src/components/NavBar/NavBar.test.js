import React from 'react';
import userEvent from '@testing-library/user-event';
import GlobeIcon from 'mdi-react/GlobeIcon';
import ViewDashboard from 'mdi-react/ViewDashboardIcon';
import AccountMultiple from 'mdi-react/AccountMultipleIcon';
import TransitConnection from 'mdi-react/TransitConnectionVariantIcon';
import EmoticonHappy from 'mdi-react/EmoticonHappyOutlineIcon';
import Fingerprint from 'mdi-react/FingerprintIcon';
import ScaleBalance from 'mdi-react/ScaleBalanceIcon';
import Verify from 'mdi-react/VerifiedIcon';
import NavBar from './NavBar';
import axeTest from '../../utils/testUtils/testAxe';
import { render, screen, fireEvent } from '../../utils/testUtils/testWrapper';
import { Box, NavBarSection, NavBarItem, NavBarItemButton, NavBarItemLink, Link, Button } from '../../index';

const DATA_ID = 'data-id';

const data = [
  {
    icon: GlobeIcon,
    key: 'Overview',
    heading: 'Overview',
    children: [
      <NavBarItemButton
        key="Credentials Button Users"
        id="Credentials Button Users"
        data-testid="navItemButton"
      >
        Users
      </NavBarItemButton>,
      <NavBarItemLink
        key="Experiences Link Roles"
        id="Experiences Link Roles"
        href="https://pingidentity.com/"
        data-testid="navItemLink"
      >
        Roles
      </NavBarItemLink>,
    ],
  },
  {
    icon: ViewDashboard,
    key: 'Dashboard',
    heading: 'Dashboard',
    children: [
      'Users',
      'Group',
      'Populations',
      'Attributes',
      'Roles',
    ],
  },
  {
    icon: AccountMultiple,
    key: 'Identities',
    heading: 'Identities',
    children: [
      'Users',
      'Group',
      'Populations',
      'Attributes',
      'Roles',
    ],
  },
  {
    icon: TransitConnection,
    key: 'Connections',
    heading: 'Connections',
    children: [
      'Users',
      'Group',
      'Populations',
      'Attributes',
      'Roles',
    ],
  },
  {
    icon: EmoticonHappy,
    key: 'Experiences',
    heading: 'Experiences',
    children: [
      'Users',
      'Group',
      'Populations',
      'Attributes',
      'Roles',
    ],
  },
];

const secondData = [
  {
    icon: Fingerprint,
    key: 'MFA',
    heading: 'MFA',
    children: [
      'Users',
      {
        subTitle: 'PingOne Services',
      },
      'Group',
      'Populations',
      'Attributes',
      'Roles',
    ],
  },
  {
    icon: ScaleBalance,
    key: 'Risk',
    heading: 'Risk',
    children: [
      'Users',
      'Group',
      'Populations',
      'Attributes',
      'Roles',
    ],
  },
  {
    icon: Verify,
    key: 'Verify',
    heading: 'Verify',
    children: [
      'Users',
      'Group',
      'Populations',
      'Attributes',
      'Roles',
    ],
  },
];

const getComponent = (props = {}) => render((
  <NavBar {...props}>
    <Box
      sx={{
        height: '100%',
        maxHeight: '100%',
        overflowY: 'overlay !important',
      }}
    >
      <NavBarSection items={data} hasSeparator data-testid={DATA_ID} data-id={DATA_ID} />
      <NavBarSection items={secondData} title="test_title" />
      <NavBarItem
        id="Overview"
        key="Overview"
        text="Overview"
        icon={ViewDashboard}
        data-testid="navItem"
      />
    </Box>
  </NavBar>
));

const getComponentWithMultipleChildren = (props = {}) => render((
  <NavBar {...props}>
    <Box>
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label="home link"
        data-testid="navLink"
      >
        home
      </Link>
    </Box>
    <Button data-testid="navButton">
      test button
    </Button>
  </NavBar>
));


const clickHeaderButtons = () => {
  const headerButtons = screen.getAllByRole('button');
  headerButtons.map(button => userEvent.click(button));
};

axeTest(getComponent);

test('should render basic nav with children', () => {
  getComponent();

  expect(screen.queryByRole('navigation')).toBeInTheDocument();
});

test('should render title for sections that have titles', () => {
  getComponent();

  expect(screen.getByText('test_title')).toBeInTheDocument();
});

test('should render title for itemBodies that have subTitles', () => {
  getComponent();
  clickHeaderButtons();

  expect(screen.getByText('PingOne Services')).toBeInTheDocument();
});

test('should select NavItemLink', () => {
  getComponent();
  clickHeaderButtons();

  const link = screen.getByTestId('navItemLink');
  expect(link).toBeInTheDocument();
  userEvent.click(link);
  expect(link).toHaveClass('is-selected');
});

test('should select NavItemLink on space key press', () => {
  getComponent();
  clickHeaderButtons();

  const link = screen.getByTestId('navItemLink');
  expect(link).toBeInTheDocument();
  fireEvent.keyDown(link, { key: 'Space', keyCode: 32 });
  expect(link).toHaveClass('is-selected');
});

test('should select NavItem', () => {
  getComponent();

  const item = screen.getByTestId('navItem');
  expect(item).toBeInTheDocument();
  userEvent.click(item);
  expect(item).toHaveClass('is-selected');
});

test('should select NavItemButton', () => {
  getComponent();
  clickHeaderButtons();

  const button = screen.getByTestId('navItemButton');
  expect(button).toBeInTheDocument();
  userEvent.click(button);
  expect(button).toHaveClass('is-selected');
});

test('should collapse NavItemBody', () => {
  getComponent();

  expect(screen.queryByText('Users')).not.toBeInTheDocument();
  clickHeaderButtons();
  expect(screen.getByTestId('navItemButton')).toBeInTheDocument();
  clickHeaderButtons();
  expect(screen.queryByText('Users')).not.toBeInTheDocument();
});

test('should collapse NavItemBody on Escape key press', () => {
  getComponent();
  clickHeaderButtons();

  expect(screen.getByTestId('navItemButton')).toBeInTheDocument();
  const headerButtons = screen.getAllByRole('button');
  headerButtons.map(headerButton => fireEvent.keyDown(headerButton, { key: 'Escape', keyCode: 27 }));
  expect(screen.queryByText('Users')).not.toBeInTheDocument();
});

test('should change focus between NavBarItemHeader on arrow key press', () => {
  getComponent();

  const headerButtons = screen.getAllByRole('button');

  expect(headerButtons[0]).toBeInTheDocument();
  headerButtons[0].focus();
  expect(headerButtons[0]).toHaveClass('is-focused');
  fireEvent.keyDown(headerButtons[0], { key: 'ArrowDown', keyCode: 40 });
  expect(headerButtons[1]).toHaveClass('is-focused');
  fireEvent.keyDown(headerButtons[0], { key: 'ArrowRight', keyCode: 39 });
  expect(headerButtons[2]).toHaveClass('is-focused');
  fireEvent.keyDown(headerButtons[0], { key: 'ArrowLeft', keyCode: 37 });
  expect(headerButtons[1]).toHaveClass('is-focused');
  fireEvent.keyDown(headerButtons[0], { key: 'ArrowUp', keyCode: 38 });
  expect(headerButtons[0]).toHaveClass('is-focused');
  fireEvent.keyDown(headerButtons[0], { key: 'Shift', keyCode: 16 });
  expect(headerButtons[0]).toHaveClass('is-focused');
});

test('should not change focus from NavItemBody to NavBarItemHeader on arrow key press', () => {
  getComponent();

  const headerButtons = screen.getAllByRole('button');

  expect(headerButtons[0]).toBeInTheDocument();
  headerButtons[0].click();
  fireEvent.keyDown(headerButtons[0], { key: 'ArrowDown', keyCode: 40 });
  expect(screen.getByTestId('navItemButton')).toHaveClass('is-focused');
  fireEvent.keyDown(screen.getByTestId('navItemButton'), { key: 'ArrowUp', keyCode: 38 });
  expect(screen.getByTestId('navItemButton')).toHaveClass('is-focused');
  fireEvent.keyDown(screen.getByTestId('navItemButton'), { key: 'ArrowDown', keyCode: 40 });
  expect(screen.getByTestId('navItemLink')).toHaveClass('is-focused');
  fireEvent.keyDown(screen.getByTestId('navItemLink'), { key: 'ArrowDown', keyCode: 40 });
  expect(screen.getByTestId('navItemLink')).toHaveClass('is-focused');
});

test('should render nav with multiple children', () => {
  getComponentWithMultipleChildren();

  expect(screen.queryByRole('navigation')).toBeInTheDocument();
});
test('should change focus between nav children on arrow key press', () => {
  getComponentWithMultipleChildren();

  const link = screen.getByTestId('navLink');
  const button = screen.getByTestId('navButton');

  expect(link).toBeInTheDocument();
  link.focus();
  expect(link).toHaveClass('is-focused');
  fireEvent.keyDown(link, { key: 'ArrowDown', keyCode: 40 });
  expect(button).toHaveClass('is-focused');
  fireEvent.keyDown(button, { key: 'ArrowUp', keyCode: 38 });
  expect(link).toHaveClass('is-focused');
  fireEvent.keyDown(link, { key: 'ArrowRight', keyCode: 39 });
  expect(button).toHaveClass('is-focused');
  fireEvent.keyDown(button, { key: 'ArrowLeft', keyCode: 37 });
  expect(link).toHaveClass('is-focused');
  fireEvent.keyDown(link, { key: 'Shift', keyCode: 16 });
  expect(link).toHaveClass('is-focused');
  fireEvent.keyDown(link, { key: 'Space', keyCode: 32 });
  expect(link).toHaveClass('is-focused');
});

test('should render NavBarSection with data-id', () => {
  getComponent();

  expect(screen.getByTestId(DATA_ID)).toHaveAttribute(DATA_ID);
});
