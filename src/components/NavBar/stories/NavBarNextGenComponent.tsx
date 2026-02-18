import React from 'react';

import {
  Box,
  NavBar,
  NavBarItem,
  NavBarItemButton,
  NavBarSection,
  Separator,
} from '../../..';
import { useGetTheme } from '../../../hooks';

export const NavBarNextGenComponent = () => {
  const { icons } = useGetTheme();

  const firstSectionData = [
    {
      'data-id': 'dashboard-data-id',
      heading: 'Monitoring',
      icon: icons.monitoringIcon,
      key: 'Monitoring',
      children: [
        {
          hasSeparator: false,
          subTitle: 'Dashboards',
        },
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
      icon: icons.mdiAccountMultiple,
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
      icon: icons.applicationsIcon,
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

  const secondSectionData = [
    {
      'data-id': 'Authentication-data-id',
      heading: 'Authentication',
      icon: icons.authenticationIcon,
      title: 'Policies',
      key: 'Authentication',
      children: [
        <NavBarItemButton
          key="Authentication-Policies"
          id="Authentication-Policies"
        >
          Authentication Policies
        </NavBarItemButton>,
        {
          hasSeparator: false,
          subTitle: 'Applications',
        },
        <Separator key="separator" variant="separator.navBarSubtitleSeparator" />,
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
      icon: icons.shieldStar,
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
      icon: icons.p1verify,
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
      heading: 'Digital Credentials Title That Is So Long It Wraps',
      icon: icons.mdiShoCard,
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
      icon: icons.PingAuthorize,
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

  const thirdSectionData = [
    {
      'data-id': 'Integrations-data-id',
      heading: 'Integrations',
      icon: icons.integrationsIcon,
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
      icon: icons.userExperienceIcon,
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
      icon: icons.mdiEarth,
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

  return (
    <NavBar>
      <Box padding="md" key="top-logo-parent">
        {icons.pingLogoHorizontalSmall}
      </Box>
      <Box
        variant="navBar.sectionContainer"
        paddingBottom="xl"
        key="first-section-container"
      >
        <NavBarItem
          data-id="nav-bar-item"
          icon={icons.mdiPlayCircleIcon}
          id="GettingStarted"
          key="GettingStarted"
          text="Getting Started"
        />
        <NavBarItem
          data-id="nav-bar-item"
          icon={icons.overviewIcon}
          id="Overview"
          key="Overview"
          text="Overview"
        />
        <NavBarSection items={firstSectionData} data-id="nav-bar-section" />
        <Separator variant="separator.navBarSeparator" />
        <NavBarItem
          data-id="nav-bar-item"
          icon={icons.daVinci}
          id="DaVinci"
          key="DaVinci"
          text="DaVinci"
        />
        <NavBarSection
          items={secondSectionData}
          data-id="second-nav-bar-section"
        />
        <NavBarSection items={thirdSectionData} hasSeparator data-id="third-nav-bar-section" />
      </Box>
    </NavBar>
  );
};
