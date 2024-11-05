import React from 'react';
import AccountCheckIcon from '@pingux/mdi-react/AccountCheckOutlineIcon';
import AccountMultipleOutlineIcon from '@pingux/mdi-react/AccountMultipleOutlineIcon';
import AppsIcon from '@pingux/mdi-react/AppsIcon';
import CheckCircleOutlineIcon from '@pingux/mdi-react/CheckCircleOutlineIcon';
import CodeTagsIcon from '@pingux/mdi-react/CodeTagsIcon';
import CogOutlineIcon from '@pingux/mdi-react/CogOutlineIcon';
import FileTreeIcon from '@pingux/mdi-react/FileTreeIcon';
import LayersOutlineIcon from '@pingux/mdi-react/LayersOutlineIcon';
import PaletteOutlineIcon from '@pingux/mdi-react/PaletteOutlineIcon';
import ShieldCheckOutlineIcon from '@pingux/mdi-react/ShieldCheckOutlineIcon';
import ShowChartIcon from '@pingux/mdi-react/ShowChartIcon';
import DashboardIcon from '@pingux/mdi-react/ViewDashboardOutlineIcon';
import WidgetsOutlineIcon from '@pingux/mdi-react/WidgetsOutlineIcon';

import useGetTheme from '../../../../hooks/useGetTheme';
import {
  Box,
  NavBar,
  NavBarItem,
  NavBarItemButton,
  NavBarSection,
  Separator,
} from '../../../../index';

const data = [
  {
    'data-id': 'dashboard-data-id',
    heading: 'Monitoring',
    icon: ShowChartIcon,
    key: 'Monitoring',
    children: [
      <NavBarItemButton
        key="Dashboards"
        id="Dashboards"
      >
        Dashboards
      </NavBarItemButton>,
      <NavBarItemButton
        key="Audit"
        id="Audit"
      >
        Audits
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'Directory-data-id',
    heading: 'Directory',
    icon: AccountMultipleOutlineIcon,
    key: 'Directory',
    children: [
      <NavBarItemButton
        key="Users"
        id="Users"
      >
        Users
      </NavBarItemButton>,
      <NavBarItemButton
        key="Group"
        id="Group"
      >
        Groups
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'Applications-data-id',
    heading: 'Applications',
    icon: AppsIcon,
    key: 'Applications',
    children: [
      <NavBarItemButton
        key="Applications-sub"
        id="Applications-sub"
      >
        Applications
      </NavBarItemButton>,
      <NavBarItemButton
        key="Resources"
        id="Resources"
      >
        Resourcess
      </NavBarItemButton>,
    ],
  },
];

const secondData = [
  {
    'data-id': 'Authentication-data-id',
    heading: 'Authentication',
    icon: CheckCircleOutlineIcon,
    key: 'Authentication',
    children: [
      <NavBarItemButton
        key="Authentication-Policies"
        id="Authentication-Policies"
      >
        Authentication Policies
      </NavBarItemButton>,
      <NavBarItemButton
        key="Password-Policies"
        id="Password-Policies"
      >
        Password Policies
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'Threat Protection-data-id',
    heading: 'Threat Protection',
    icon: ShieldCheckOutlineIcon,
    key: 'Threat Protection',
    children: [
      <NavBarItemButton
        key="Risk Policies"
        id="Risk Policies"
      >
        Risk Policies
      </NavBarItemButton>,
      <NavBarItemButton
        key="Predictors"
        id="Predictors"
      >
        Predictors
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'Threat Protection-data-id',
    heading: 'Identity Verification',
    icon: LayersOutlineIcon,
    key: 'Identity Verification',
    children: [
      <NavBarItemButton
        key="Verify Policies"
        id="Verify Policies"
      >
        Verify Policies
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'Digital Credentials-data-id',
    heading: 'Digital Credentials',
    icon: CodeTagsIcon,
    key: 'Digital Credentials',
    children: [
      <NavBarItemButton
        key="Management"
        id="Management"
      >
        Management
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'Authorization-data-id',
    heading: 'Authorization',
    icon: AccountCheckIcon,
    key: 'Authorization',
    children: [
      <NavBarItemButton
        key="Trust Framework"
        id="Trust Framework"
      >
        Trust Framework
      </NavBarItemButton>,
      <NavBarItemButton
        key="Policies"
        id="Policies"
      >
        Policies
      </NavBarItemButton>,
    ],
  },
];

const thirdData = [
  {
    'data-id': 'Integrations-data-id',
    heading: 'Integrations',
    icon: WidgetsOutlineIcon,
    key: 'Integrations',
    children: [
      <NavBarItemButton
        key="External IDPs"
        id="External IDPs"
      >
        External IDPs
      </NavBarItemButton>,
      <NavBarItemButton
        key="Provisioning"
        id="Provisioning"
      >
        Provisioning
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'User Experience-data-id',
    heading: 'User Experience',
    icon: PaletteOutlineIcon,
    key: 'User Experience',
    children: [
      <NavBarItemButton
        key="Notification Templates"
        id="Notification Templates"
      >
        Notification Templates
      </NavBarItemButton>,
      <NavBarItemButton
        key="Notification Policies"
        id="Notification Policies"
      >
        Notification Policies
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'Settings-data-id',
    heading: 'Settings',
    icon: CogOutlineIcon,
    key: 'Settings',
    children: [
      <NavBarItemButton
        key="Certificates & Key Pairs"
        id="Certificates & Key Pairs"
      >
        Certificates & Key Pairs
      </NavBarItemButton>,
      <NavBarItemButton
        key="Domains"
        id="Domains"
      >
        Domains
      </NavBarItemButton>,
    ],
  },
];

export const NavBarNextGenComponent = () => {
  const { icons } = useGetTheme();
  return (
    <NavBar>
      <Box padding="md" key="top-logo-parent">
        {icons.pingLogoHorizontalSmall}
      </Box>
      <Box
        paddingBottom="xl"
        key="first-section-container"
      >
        <NavBarItem
          data-id="nav-bar-item"
          icon={DashboardIcon}
          id="Overview"
          key="Overview"
          text="Overview"
        />
        <NavBarSection items={data} data-id="nav-bar-section" />
        <Separator variant="separator.navBarSeparator" />
        <NavBarItem
          data-id="nav-bar-item"
          icon={FileTreeIcon}
          id="DaVinci"
          key="DaVinci"
          text="DaVinci"
        />
        <NavBarSection items={secondData} data-id="second-nav-bar-section" />
        <Separator variant="separator.navBarSeparator" />
        <NavBarSection items={thirdData} data-id="third-nav-bar-section" />
      </Box>
    </NavBar>
  );
};
