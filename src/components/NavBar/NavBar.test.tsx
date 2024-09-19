import React, { useState } from 'react';
import AccountMultiple from '@pingux/mdi-react/AccountMultipleIcon';
import EmoticonHappy from '@pingux/mdi-react/EmoticonHappyOutlineIcon';
import Fingerprint from '@pingux/mdi-react/FingerprintIcon';
import GlobeIcon from '@pingux/mdi-react/GlobeIcon';
import OpenInNew from '@pingux/mdi-react/OpenInNewIcon';
import ScaleBalance from '@pingux/mdi-react/ScaleBalanceIcon';
import TransitConnection from '@pingux/mdi-react/TransitConnectionVariantIcon';
import Verify from '@pingux/mdi-react/VerifiedIcon';
import ViewDashboard from '@pingux/mdi-react/ViewDashboardIcon';
import ViewGridPlusOutline from '@pingux/mdi-react/ViewGridPlusOutlineIcon';
import userEvent from '@testing-library/user-event';

import { Box, Button, Link, NavBarItem, NavBarItemButton, NavBarItemLink, NavBarSection } from '../../index';
import { NavBarProps } from '../../types';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import NavBar from './NavBar';

const DATA_ID = 'data-id';
const SECTION_BUTTON_DATA_ID = 'section-data-id';

const data = [
  {
    'data-id': SECTION_BUTTON_DATA_ID,
    'data-testid': SECTION_BUTTON_DATA_ID,
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
      'Dashboard Unique',
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
      'Identities Unique',
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
    'data-id': 'da-vinci-data-id',
    icon: ViewGridPlusOutline,
    key: 'DaVinci',
    heading: 'DaVinci',
    customIcon: OpenInNew,
    href: 'https://pingidentity.com/',
  },
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


const getComponent = (props: NavBarProps = {}) => render((
  <NavBar {...props}>
    <Box
      sx={{
        height: '100%',
        maxHeight: '100%',
        overflowY: 'overlay !important' as 'auto',
      }}
      key="top-logo-parent"
    >
      <NavBarSection items={data} hasSeparator data-testid={DATA_ID} data-id={DATA_ID} key="first-section" />
      <NavBarSection items={secondData} title="test_title" key="second-section" />
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

const ControlledComponent = () => {
  const [selectedKey, setSelectedKey] = useState('');
  const customData = [
    {
      icon: GlobeIcon,
      key: 'Environment',
      heading: 'Environment title that is so long, it wraps',
      children: [
        <NavBarItemButton
          key="Click me for MFA Users"
          id="Click me for MFA Users"
          onPress={() => { setSelectedKey('MFA Button Users'); }}
        >
          Click me for MFA Users
        </NavBarItemButton>,
        <NavBarItemButton
          key="Earth Button Group"
          id="Earth Button Group"
          data-testid="group-item"
        >
          Group
        </NavBarItemButton>,
      ],
    },
  ];
  const [thisData, setData] = useState([...customData]);

  const testFunction = () => {
    const newArray = [...customData];
    newArray.pop();
    setData([...newArray]);
  };

  const setKeys = e => {
    setSelectedKey(e);
  };

  return (
    <NavBar setSelectedKey={setKeys} selectedKey={selectedKey}>
      <Box
        variant="navBar.sectionContainer"
        paddingBottom="xl"
        key="top-logo-parent"
      >
        <button key="test-button" data-testid="test-button" onClick={testFunction}>click me!</button>
        <NavBarItem
          id="Overview"
          key="Overview"
          text="Overview"
          icon={ViewDashboard}
          data-testid="navItem"
        />
        <NavBarSection items={data} hasSeparator data-id="nav-bar-section" />
        <NavBarSection items={secondData} hasSeparator title="PingOne Services" data-id="second-nav-bar-section" />
        <NavBarSection items={thisData} data-id="third-nav-bar-section" />
      </Box>
    </NavBar>
  );
};

const getComponentWithMultipleChildren = (props: NavBarProps = {}) => render((
  <NavBar {...props}>
    <Box key="top-logo-parent">
      <Link
        href="https://pingidentity.com"
        target="_blank"
        aria-label="home link"
        data-testid="navLink"
      >
        home
      </Link>
    </Box>
    <Button data-testid="navButton" key="nav-button">
      test button
    </Button>
  </NavBar>
));


const clickHeaderButtons = () => {
  const headerButtons = screen.getAllByRole('button');
  headerButtons.map(button => userEvent.click(button));
};

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <NavBar {...props}>
      <NavBarSection items={data} />
    </NavBar>
  ),
});

test('should render basic nav with children', () => {
  getComponent();

  expect(screen.queryByRole('navigation')).toBeInTheDocument();
});

test('controlled: should render basic nav with children', () => {
  render(<ControlledComponent />);

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

test('controlled: should select NavItemLink', () => {
  render(<ControlledComponent />);
  let link;

  clickHeaderButtons();

  link = screen.queryByTestId('navItemLink');

  expect(link).toBeInTheDocument();
  userEvent.click(link);

  link = screen.queryByTestId('navItemLink');
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

test('controlled: should select NavItemLink on space key press', () => {
  render(<ControlledComponent />);
  let link;

  clickHeaderButtons();

  link = screen.queryByTestId('navItemLink');
  expect(link).toBeInTheDocument();

  fireEvent.keyDown(link, { key: 'Space', keyCode: 32 });
  fireEvent.keyUp(link, { key: 'Space', keyCode: 32 });
  link = screen.queryByTestId('navItemLink');

  expect(link).toHaveClass('is-selected');
});

test('should select NavItem', () => {
  render(<ControlledComponent />);
  let item;

  item = screen.queryByTestId('navItem');

  expect(item).toBeInTheDocument();
  userEvent.click(item);
  item = screen.queryByTestId('navItem');
  expect(item).toHaveClass('is-selected');
});

test('should select NavItem', () => {
  getComponent();

  const item = screen.getByTestId('navItem');

  expect(item).toBeInTheDocument();
  userEvent.click(item);
  expect(item).toHaveClass('is-selected');
});

test('controlled: should select NavItem', () => {
  render(<ControlledComponent />);
  let item;

  item = screen.queryByTestId('navItem');

  expect(item).toBeInTheDocument();
  userEvent.click(item);

  item = screen.queryByTestId('navItem');
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

test('controlled: should select NavItemButton', () => {
  render(<ControlledComponent />);
  let button;

  clickHeaderButtons();

  button = screen.queryByTestId('navItemButton');
  expect(button).toBeInTheDocument();
  userEvent.click(button);

  button = screen.queryByTestId('navItemButton');
  expect(button).toHaveClass('is-selected');
});

test('should collapse NavItemBody', () => {
  getComponent();

  expect(screen.queryByText('Users')).not.toBeInTheDocument();

  clickHeaderButtons();
  expect(screen.getByTestId('navItemButton')).toBeInTheDocument();

  clickHeaderButtons();
  setTimeout(() => {
    expect(screen.queryByText('Users')).not.toBeInTheDocument();
  }, 501);
});

test('should collapse NavItemBody on Escape key press', () => {
  getComponent();

  clickHeaderButtons();

  expect(screen.getByTestId('navItemButton')).toBeInTheDocument();
  const headerButtons = screen.getAllByRole('button');
  headerButtons.map(headerButton => fireEvent.keyDown(headerButton, { key: 'Escape', keyCode: 27 }));

  setTimeout(() => {
    expect(screen.queryByText('Users')).not.toBeInTheDocument();
  }, 501);
});

test('should change focus between NavBarItemHeader on arrow key press', () => {
  getComponent();

  const headerButtons = screen.getAllByRole('button');

  expect(headerButtons[0]).toBeInTheDocument();

  act(() => {
    headerButtons[0].focus();
  });

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

  act(() => {
    headerButtons[0].click();
  });

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
  act(() => {
    link.focus();
  });
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

test('should render NavBarSection button with data-id', () => {
  getComponent();

  expect(screen.getByTestId(SECTION_BUTTON_DATA_ID)).toHaveAttribute(DATA_ID);
});

test('passing in a string into defaultSelectedKeys makes the key selected by default, and the parent expanded by default ', () => {
  getComponent({ defaultSelectedKey: 'Credentials Button Users' });

  const child = screen.getByTestId('navItemButton');
  expect(child).toBeInTheDocument();
  expect(child).toHaveClass('is-selected');
});

test('when a child is selected, and the parent is collapsed, the parent has the is-selected class', () => {
  getComponent({ defaultSelectedKey: 'Credentials Button Users' });

  const child = screen.getByTestId('navItemButton');
  expect(child).toBeInTheDocument();
  expect(child).toHaveClass('is-selected');

  const parent = screen.queryByTestId(SECTION_BUTTON_DATA_ID);
  expect(parent).not.toHaveClass('is-selected');
  userEvent.click(parent!);
  const parentDiv = screen.queryByTestId('Overview');
  expect(parentDiv).toHaveClass('is-selected');
});

test('controlled version: items can be updated.', () => {
  render(<ControlledComponent />);

  const button = screen.getByTestId('test-button');
  const thisitem = screen.getByTestId('Environment title that is so long, it wraps');
  expect(thisitem).toBeInTheDocument();

  userEvent.click(button);
  expect(screen.queryByTestId('Environment title that is so long, it wraps')).not.toBeInTheDocument();
});

test('expand only one item', () => {
  getComponent({ isAutoСollapsible: true });

  expect(screen.queryByText('Dashboard Unique')).not.toBeInTheDocument();
  expect(screen.queryByText('Identities Unique')).not.toBeInTheDocument();

  const headerButtons = screen.getAllByRole('button');
  userEvent.click(headerButtons[1]);

  expect(screen.queryByText('Dashboard Unique')).toBeInTheDocument();
  expect(screen.queryByText('Identities Unique')).not.toBeInTheDocument();

  userEvent.click(headerButtons[2]);

  setTimeout(() => {
    expect(screen.queryByText('Dashboard Unique')).not.toBeInTheDocument();
    expect(screen.queryByText('Identities Unique')).toBeInTheDocument();
  }, 501);
});
