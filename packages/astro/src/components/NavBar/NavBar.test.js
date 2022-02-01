import React from 'react';
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
import { render, screen } from '../../utils/testUtils/testWrapper';
import { Box, NavBarSection } from '../../index';

const data = [
  {
    icon: GlobeIcon,
    key: 'Overview',
    heading: 'Overview',
    children: [
      'Users',
      'Group',
      'Populations',
      'Attributes',
      'A roles title that is really really really really long',
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
      <NavBarSection items={data} hasSeparator />
      <NavBarSection items={secondData} title="test_title" />
    </Box>
  </NavBar>
));

axeTest(getComponent);

test('should render basic nav with children', () => {
  getComponent();
  const nav = screen.queryByRole('navigation');
  expect(nav).toBeInTheDocument();
});

test('should render title for sections that have titles', () => {
  getComponent();
  const title = screen.getByText('test_title');
  expect(title).toBeInTheDocument();
});

test('should render title for itemBodies that have subTitles', () => {
  getComponent();
  const subTitle = screen.getByText('PingOne Services');
  expect(subTitle).toBeInTheDocument();
});
