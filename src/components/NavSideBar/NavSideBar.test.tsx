import React from 'react';
import userEvent from '@testing-library/user-event';

import { Box, NavSideBarHeader, NavSideBarItem, NavSideBarSection, NavSideBarSectionItem, Separator } from '../../index';
import { NavSideBarProps } from '../../types';
import { act, fireEvent, render, screen } from '../../utils/testUtils/testWrapper';
import { universalComponentTests } from '../../utils/testUtils/universalComponentTest';

import {
  Earth,
  EmoticonHappy,
  Fingerprint,
  GlobeIcon,
  Logo,
  OpenInNew,
  ViewDashboard,
  ViewGridPlusOutline,
} from './icons';
import NavSideBar from './NavSideBar';

const onKeyDownProp = jest.fn();

const getComponent = (props: NavSideBarProps = {}) => render((
  <NavSideBar {...props}>
    <NavSideBarHeader linkProps={{ href: 'https://pingidentity.com/', target: '_blank' }} logo={Logo} />
    <Separator m="0" backgroundColor="neutral.60" key="top-separator" />
    <Box
      variant="navBar.sectionContainer"
      paddingBottom="xl"
      key="first-section-container"
    >
      <NavSideBarItem key="Overview" icon={GlobeIcon} id="Overview" data-testid="navItem">
        Overview
      </NavSideBarItem>

      <NavSideBarSection title="Dashboard" key="Dashboard" id="Dashboard" icon={ViewDashboard}>
        <NavSideBarSectionItem key="Dashboard Link Group" linkProps={{ href: 'https://pingidentity.com/' }} data-testid="navItemLink">
          Group
        </NavSideBarSectionItem>
        <NavSideBarSectionItem key="Dashboard Link Populations" data-testid="navItemButton">
          Populations
        </NavSideBarSectionItem>
      </NavSideBarSection>

      <NavSideBarSection title="MFA" key="MFA" id="MFA" icon={Fingerprint}>
        <NavSideBarSectionItem key="MFA Button Users">
          Users
        </NavSideBarSectionItem>
        <NavSideBarSectionItem key="PingOne Services" />
        <NavSideBarSectionItem key="MFA Button Group">
          Group Test
        </NavSideBarSectionItem>
      </NavSideBarSection>

      <NavSideBarItem key="DaVinci" id="DaVinci" data-testid="navBarItemLink" icon={ViewGridPlusOutline} customIcon={OpenInNew} linkProps={{ href: 'https://pingidentity.com/' }}>
        DaVinci
      </NavSideBarItem>

      <NavSideBarSection title="Environment title that is so long, it wraps" key="Environment" id="Environment" icon={Earth}>
        <NavSideBarSectionItem key="Earth Button Users">
          Users
        </NavSideBarSectionItem>
        <NavSideBarSectionItem key="Earth Button Group">
          Group
        </NavSideBarSectionItem>
      </NavSideBarSection>

      <NavSideBarSection title="Credentials" key="Credentials" id="Credentials" data-testid="Credentials" icon={EmoticonHappy} onKeyDown={onKeyDownProp}>
        <NavSideBarSectionItem key="Credentials Button Users">
          Users
        </NavSideBarSectionItem>
        <NavSideBarSectionItem key="Credentials Button Group">
          Group
        </NavSideBarSectionItem>
      </NavSideBarSection>
    </Box>
  </NavSideBar>
));

// Needs to be added to each components test file
universalComponentTests({
  renderComponent: props => (
    <NavSideBar {...props}>
      <NavSideBarItem key="Overview" icon={GlobeIcon} id="Overview">
        Overview
      </NavSideBarItem>
    </NavSideBar>
  ),
});

const clickHeaderButtons = () => {
  const headerButtons = screen.getAllByRole('button');
  headerButtons.forEach(button => userEvent.click(button));
};

test('should render basic nav with children', () => {
  getComponent();
  expect(screen.queryByRole('navigation')).toBeInTheDocument();
});

test('should render title for sections that have titles', () => {
  getComponent();
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
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
  headerButtons.forEach(headerButton => fireEvent.keyDown(headerButton, { key: 'Escape', keyCode: 27 }));
  expect(screen.queryByText('Users')).not.toBeInTheDocument();
});

test('should change focus between NavBarItemHeader on arrow key press', () => {
  getComponent();
  const headerButtons = screen.getAllByRole('button');
  expect(headerButtons[0]).toBeInTheDocument();

  act(() => { headerButtons[0].focus(); });
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

test('should not change focus from NavItemBody to NavBarItemHeader on up/down arrow key press', () => {
  getComponent();

  const headerButtons = screen.getAllByRole('button');

  expect(headerButtons[1]).toBeInTheDocument();

  act(() => { headerButtons[1].click(); });

  fireEvent.keyDown(headerButtons[0], { key: 'ArrowDown', keyCode: 40 });
  expect(screen.getByTestId('navItemLink')).toHaveClass('is-focused');
  expect(document.activeElement).toHaveTextContent('Group');

  fireEvent.keyDown(screen.getByTestId('navItemLink'), { key: 'ArrowUp', keyCode: 38 });
  expect(screen.getByTestId('navItemLink')).toHaveClass('is-focused');
  expect(document.activeElement).toHaveTextContent('Group');

  fireEvent.keyDown(screen.getByTestId('navItemLink'), { key: 'ArrowDown', keyCode: 40 });
  expect(screen.getByTestId('navItemButton')).toHaveClass('is-focused');
  expect(document.activeElement).toHaveTextContent('Populations');

  fireEvent.keyDown(screen.getByTestId('navItemButton'), { key: 'ArrowDown', keyCode: 40 });
  expect(screen.getByTestId('navItemButton')).toHaveClass('is-focused');
  expect(document.activeElement).toHaveTextContent('Populations');
});

test('should not change focus from NavItemBody to NavBarItemHeader on left/right arrow key press', () => {
  getComponent();

  const headerButtons = screen.getAllByRole('button');

  expect(headerButtons[1]).toBeInTheDocument();
  act(() => {
    headerButtons[1].click();
  });

  fireEvent.keyDown(headerButtons[0], { key: 'ArrowRight', keyCode: 39 });
  expect(screen.getByTestId('navItemLink')).toHaveClass('is-focused');

  fireEvent.keyDown(screen.getByTestId('navItemLink'), { key: 'ArrowLeft', keyCode: 37 });
  expect(screen.getByTestId('navItemLink')).toHaveClass('is-focused');

  fireEvent.keyDown(screen.getByTestId('navItemLink'), { key: 'ArrowRight', keyCode: 39 });
  expect(screen.getByTestId('navItemButton')).toHaveClass('is-focused');

  fireEvent.keyDown(screen.getByTestId('navItemButton'), { key: 'ArrowRight', keyCode: 39 });
  expect(screen.getByTestId('navItemButton')).toHaveClass('is-focused');
});

test('passing in a string into defaultSelectedKeys makes the key selected by default, and the parent expanded by default ', () => {
  getComponent({ defaultSelectedKey: 'Dashboard Link Populations' });
  const child = screen.getByTestId('navItemButton');
  expect(child).toBeInTheDocument();
  expect(child).toHaveClass('is-selected');
});

test('expand only one item', () => {
  getComponent({ isAutoСollapsible: true });
  expect(screen.queryByText('Group')).not.toBeInTheDocument();
  expect(screen.queryByText('Users')).not.toBeInTheDocument();

  const headerButtons = screen.getAllByRole('button');

  act(() => { userEvent.click(headerButtons[1]); });
  expect(screen.queryByText('Group')).toBeInTheDocument();
  expect(screen.queryByText('Users')).not.toBeInTheDocument();

  act(() => { userEvent.click(headerButtons[2]); });
  expect(screen.queryByText('Group')).not.toBeInTheDocument();
  expect(screen.queryByText('Users')).toBeInTheDocument();
});

test('default expended keys', () => {
  getComponent({ isAutoСollapsible: true, defaultExpandedKeys: ['Dashboard'] });
  expect(screen.getByTestId('navItemLink')).toBeInTheDocument();
  expect(screen.getByTestId('navItemButton')).toBeInTheDocument();
});

test('when a child is selected, and the parent is collapsed, the parent has the is-selected class', () => {
  getComponent({ defaultSelectedKey: 'Dashboard Link Populations' });

  const child = screen.getByTestId('navItemButton');
  expect(child).toBeInTheDocument();
  expect(child).toHaveClass('is-selected');

  const parent = screen.getByTestId('Dashboard');
  expect(parent).not.toHaveClass('is-selected');
  userEvent.click(parent);

  const parentDiv = screen.getByTestId('Dashboard').firstElementChild;
  expect(parentDiv).toHaveClass('is-selected');
});

test('calls onKeyDownProp when a key is pressed', () => {
  getComponent();
  const header = screen.getByText('Credentials');
  fireEvent.keyDown(header, { key: 'Enter' });
  expect(onKeyDownProp).toHaveBeenCalled();
});
