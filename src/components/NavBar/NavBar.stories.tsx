import React, { useState } from 'react';
import AccountCheckIcon from '@pingux/mdi-react/AccountCheckOutlineIcon';
import AccountMultiple from '@pingux/mdi-react/AccountMultipleIcon';
import AccountMultipleOutlineIcon from '@pingux/mdi-react/AccountMultipleOutlineIcon';
import AppsIcon from '@pingux/mdi-react/AppsIcon';
import CheckCircleOutlineIcon from '@pingux/mdi-react/CheckCircleOutlineIcon';
import CodeTagsIcon from '@pingux/mdi-react/CodeTagsIcon';
import CogOutlineIcon from '@pingux/mdi-react/CogOutlineIcon';
import Earth from '@pingux/mdi-react/EarthIcon';
import EmoticonHappy from '@pingux/mdi-react/EmoticonHappyOutlineIcon';
import FileTreeIcon from '@pingux/mdi-react/FileTreeIcon';
import Fingerprint from '@pingux/mdi-react/FingerprintIcon';
import GlobeIcon from '@pingux/mdi-react/GlobeIcon';
import LayersOutlineIcon from '@pingux/mdi-react/LayersOutlineIcon';
import OpenInNew from '@pingux/mdi-react/OpenInNewIcon';
import PaletteOutlineIcon from '@pingux/mdi-react/PaletteOutlineIcon';
import ScaleBalance from '@pingux/mdi-react/ScaleBalanceIcon';
import ShieldCheckOutlineIcon from '@pingux/mdi-react/ShieldCheckOutlineIcon';
import ShowChartIcon from '@pingux/mdi-react/ShowChartIcon';
import TransitConnection from '@pingux/mdi-react/TransitConnectionVariantIcon';
import ViewDashboard from '@pingux/mdi-react/ViewDashboardIcon';
import DashboardIcon from '@pingux/mdi-react/ViewDashboardOutlineIcon';
import ViewGridPlusOutline from '@pingux/mdi-react/ViewGridPlusOutlineIcon';
import WidgetsOutlineIcon from '@pingux/mdi-react/WidgetsOutlineIcon';
import { Meta, StoryFn } from '@storybook/react';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import {
  Box,
  Link,
  NavBar,
  NavBarItem,
  NavBarItemButton,
  NavBarItemLink,
  NavBarSection,
  Separator,
} from '../..';
import { useGetTheme } from '../../hooks';
import { NavBarProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import NavBarReadme from './NavBar.mdx';

export default {
  component: NavBar,
  decorators: [
    OnyxDefault => (
      <div style={{ padding: '0', height: '90vh' }}>
        <OnyxDefault />
      </div>
    ),
  ],
  subcomponents: { NavBarSection, NavBarItemLink, NavBarItemButton },
  title: 'Components/NavBar',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <NavBarReadme />
          <DocsLayout />
        </>
      ),
    },
  },
} as Meta;

const Credentials = props => (
  <svg
    width="18px"
    height="18px"
    version="1.1"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    aria-labelledby="credentials-icon-title"
    {...props}
  >
    <title id="credentials-icon-title">Credentials Icon</title>
    <g id="Layer_2" />
    <g id="mdi-certificate-outline">
      <g>
        <path d="M11,8H5V6h6C11,6,11,8,11,8z" />
        <path d="M9,11H5V9h4C9,9,9,11,9,11z" />
        <rect x="5" y="12" width="6" height="2" />
        <path
          d="M11.4,15H4V5h16v4.8c1,0.7,1.7,2,2,2.8V5c0-1.1-0.9-2-2-2H4C2.9,3,2,3.9,2,5v10c0,1.1,0.9,2,2,2h8.1
          C11.7,16.4,11.5,15.7,11.4,15z"
        />
        <path
          d="M15.1,14.3c0-0.9,0.7-1.6,1.6-1.6c0.9,0,1.6,0.7,1.6,1.6c0,0.9-0.7,1.6-1.6,1.6C15.9,15.9,15.1,15.2,15.1,14.3 M16.8,11
          c-0.9,0-1.7,0.3-2.3,0.9c-0.6,0.6-1,1.4-1,2.3c0,0.9,0.3,1.7,1,2.3c0.6,0.6,1.4,1,2.3,1c0.9,0,1.7-0.3,2.3-1c0.6-0.6,1-1.4,1-2.3
          c0-0.9-0.3-1.7-1-2.3C18.5,11.3,17.6,11,16.8,11 M21.1,14.3c0,0.5-0.1,1-0.3,1.5c-0.2,0.5-0.4,1-0.8,1.3v4.2l-3.3-1.1l-3.3,1.1
          v-4.2c-0.7-0.8-1.1-1.8-1.1-2.9c0-1.2,0.4-2.3,1.3-3.1c0.8-0.8,1.9-1.3,3.1-1.3c1.2,0,2.3,0.4,3.1,1.3
          C20.7,12,21.1,13.1,21.1,14.3z"
        />
      </g>
    </g>
  </svg>
);

const Verify = props => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="verify-icon-title"
    {...props}
  >
    <title id="verify-icon-title">Icons / Custom Material / verify </title>
    <g id="Hero-Chart" stroke="none" strokeWidth="1" fillRule="evenodd">
      <g id="Dashboard-–-Verify" transform="translate(-251.000000, -579.000000)">
        <g id="Group" transform="translate(251.000000, 577.000000)">
          <g id="card-account-details-star-outline" transform="translate(0.000000, 2.000000)">
            <path d="M12.9066667,16.2 L1.83333333,16.2 C0.834166667,16.164 0.0366666667,15.381 0,14.4 L0,1.8 C0.0366666667,0.819 0.834166667,0.036 1.83333333,0 L20.1666667,0 C21.1658333,0.036 21.9633333,0.819 22,1.8 L22,11.277 C21.4683333,10.8 20.8541667,10.449 20.1666667,10.206 L20.1666667,1.8 L1.83333333,1.8 L1.83333333,14.4 L12.9066667,14.4 C12.8608333,14.697 12.8333333,14.994 12.8333333,15.3 C12.8333333,15.606 12.8608333,15.912 12.9066667,16.2 M12.8333333,12.6 L3.66666667,12.6 L3.66666667,11.475 C3.66666667,9.981 6.72833333,9.225 8.25,9.225 C9.77166667,9.225 12.8333333,9.981 12.8333333,11.475 L12.8333333,12.6 M12.8333333,7.2 L16.5,7.2 L16.5,8.1 L12.8333333,8.1 L12.8333333,7.2 M8.25,3.6 C6.99416667,3.6 5.95833333,4.617 5.95833333,5.85 C5.95833333,7.083 6.99416667,8.1 8.25,8.1 C9.50583333,8.1 10.5416667,7.083 10.5416667,5.85 C10.5416667,4.617 9.50583333,3.6 8.25,3.6 M12.8333333,5.4 L18.3333333,5.4 L18.3333333,6.3 L12.8333333,6.3 L12.8333333,5.4 M20.4783333,12.456 L21.5416667,13.725 L17.1875,18 L14.6666667,15.3 L15.73,14.256 L17.1875,15.687 L20.4783333,12.456 Z M18.3333333,3.6 L18.3333333,4.5 L12.8333333,4.5 L12.8333333,3.6 L18.3333333,3.6 Z" id="Shape" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const data = [
  {
    'data-id': 'dashboard-data-id',
    heading: 'Dashboard',
    icon: ViewDashboard,
    key: 'Dashboard',
    children: [
      <NavBarItemLink
        key="Dashboard Link Group"
        id="Dashboard Link Group"
        variant="variants.navBar.itemButton"
        href="https://pingidentity.com/"
      >
        Group
      </NavBarItemLink>,
      <NavBarItemButton
        key="Dashboard Link Populations"
        id="Dashboard Link Populations"
      >
        Populations
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'identities-data-id',
    icon: AccountMultiple,
    key: 'Identities',
    heading: 'Identities',
    children: [
      <NavBarItemLink
        key="Identities Link Users"
        id="Identities Link Users"
        href="https://pingidentity.com/"
      >
        Users
      </NavBarItemLink>,
      <NavBarItemLink
        key="Identities Link Groups"
        id="Identities Link Groups"
        href="https://pingidentity.com/"
      >
        Groups
      </NavBarItemLink>,
      <NavBarItemLink
        key="Identities Link Populations"
        id="Identities Link Populations"
        href="https://pingidentity.com/"
      >
        Populations
      </NavBarItemLink>,
      <NavBarItemLink
        key="Identities Link Attributes"
        id="Identities Link Attributes"
        href="https://pingidentity.com/"
      >
        Attributes
      </NavBarItemLink>,
      <NavBarItemButton
        key="Identities Link Roles"
        id="Identities Link Roles"
      >
        Roles
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'connections-data-id',
    icon: TransitConnection,
    key: 'Connections',
    heading: 'Connections',
    children: [
      {
        hasSeparator: false,
        key: 'Applications',
        subTitle: 'Applications',
      },
      <NavBarItemLink
        key="Connections Applications"
        id="Connections Applications"
        href="https://pingidentity.com/"
      >
        Applications
      </NavBarItemLink>,
      <NavBarItemLink
        key="Connections Application Catalog"
        id="Connections Application Catalog"
        href="https://pingidentity.com/"
      >
        Application Catalog
      </NavBarItemLink>,
      <NavBarItemLink
        key="Connections Application Portal"
        id="Connections Application Portal"
        href="https://pingidentity.com/"
      >
        Application Portal
      </NavBarItemLink>,
      {
        key: 'Identity Providers',
        subTitle: 'Identity Providers',
      },
      <NavBarItemLink
        key="Connections External IDPs"
        id="Connections External IDPs"
        href="https://pingidentity.com/"
      >
        External IDPs
      </NavBarItemLink>,
      {
        key: 'Ping Products',
        subTitle: 'Ping Products',
      },
      <NavBarItemLink
        key="Connections PingFederate"
        id="Connections PingFederate"
        href="https://pingidentity.com/"
      >
        PingFederate
      </NavBarItemLink>,
      <NavBarItemLink
        key="Connections PingIntelligence"
        id="Connections PingIntelligence"
        href="https://pingidentity.com/"
      >
        PingIntelligence
      </NavBarItemLink>,
      <Separator variant="separator.navBarSubtitleSeparator" />,
      <NavBarItemLink
        key="Connections Provisioning"
        id="Connections Provisioning"
        href="https://pingidentity.com/"
      >
        Provisioning
      </NavBarItemLink>,
      <NavBarItemLink
        key="Connections WebHooks"
        id="Connections WebHooks"
        href="https://pingidentity.com/"
      >
        WebHooks
      </NavBarItemLink>,
      <NavBarItemLink
        key="Connections Gateways"
        id="Connections Gateways"
        href="https://pingidentity.com/"
      >
        Gateways
      </NavBarItemLink>,
      <NavBarItemLink
        key="Connections Certificates & Key Pairs"
        id="Connections Certificates & Key Pairs"
        href="https://pingidentity.com/"
      >
        Certificates & Key Pairs
      </NavBarItemLink>,
      <NavBarItemButton
        key="Connections Resources"
        id="Connections Resources"
      >
        Resources
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'experiences-data-id',
    icon: EmoticonHappy,
    key: 'Experiences',
    heading: 'Experiences',
    children: [
      {
        hasSeparator: false,
        key: 'Policies',
        subTitle: 'Policies',
      },
      <NavBarItemLink
        key="Experiences Authentication"
        id="Experiences Authentication"
        href="https://pingidentity.com/"
      >
        Authentication
      </NavBarItemLink>,
      <NavBarItemLink
        key="Experiences MFA"
        id="Experiences MFA"
        href="https://pingidentity.com/"
      >
        MFA
      </NavBarItemLink>,
      <NavBarItemLink
        key="Experiences Password"
        id="Experiences Password"
        href="https://pingidentity.com/"
      >
        Password
      </NavBarItemLink>,
      <Separator variant="separator.navBarSubtitleSeparator" />,
      <NavBarItemLink
        key="Experiences Risk"
        id="Experiences Risk"
        href="https://pingidentity.com/"
      >
        Risk
      </NavBarItemLink>,
      <NavBarItemLink
        key="Experiences Flows"
        id="Experiences Flows"
        href="https://pingidentity.com/"
      >
        Flows
      </NavBarItemLink>,
      <NavBarItemLink
        key="Experiences Forms"
        id="Experiences Forms"
        href="https://pingidentity.com/"
      >
        Forms
      </NavBarItemLink>,
      <NavBarItemLink
        key="Experiences Languages"
        id="Experiences Languages"
        href="https://pingidentity.com/"
      >
        Languages
      </NavBarItemLink>,
      <NavBarItemLink
        key="Experiences Agreements"
        id="Experiences Agreements"
        href="https://pingidentity.com/"
      >
        Agreements
      </NavBarItemLink>,
      <NavBarItemLink
        key="Experiences Branding & Themes"
        id="Experiences Branding & Themes"
        href="https://pingidentity.com/"
      >
        Branding & Themes
      </NavBarItemLink>,
      <NavBarItemLink
        key="Experiences Notifications"
        id="Experiences Notifications"
        href="https://pingidentity.com/"
      >
        Notifications
      </NavBarItemLink>,
      <NavBarItemLink
        key="Experiences Vanity Domains"
        id="Experiences Vanity Domains"
        href="https://pingidentity.com/"
        onClick={e => e.preventDefault()}
      >
        Vanity Domains
      </NavBarItemLink>,
      <NavBarItemButton
        key="Experiences Sender"
        id="Experiences Sender"
      >
        Sender
      </NavBarItemButton>,
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
    'data-id': 'mfa-data-id',
    icon: Fingerprint,
    key: 'MFA',
    heading: 'MFA',
    children: [
      <NavBarItemButton
        id="MFA Button Users"
        key="MFA Button Users"
      >
        Users
      </NavBarItemButton>,
      {
        key: 'PingOne Services',
        subTitle: 'PingOne Services',
      },
      <NavBarItemButton
        key="MFA Button Group"
        id="MFA Button Group"
      >
        Group Test
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'risk-data-id',
    icon: ScaleBalance,
    key: 'Risk',
    heading: 'Risk',
    children: [
      <NavBarItemButton
        key="Risk Button Users"
        id="Risk Button Users"
      >
        Users
      </NavBarItemButton>,
      {
        hasSeparator: false,
        key: 'PingOne Services',
        subTitle: 'PingOne Services',
      },
      <NavBarItemButton
        key="Risk Button Group"
        id="Risk Button Group"
      >
        Group
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'verify-data-id',
    icon: Verify,
    key: 'Verify',
    heading: 'Verify',
    children: [
      <NavBarItemButton
        key="Verify Button Users"
        id="Verify Button Users"
      >
        Users
      </NavBarItemButton>,
      {
        hasSeparator: false,
        key: 'PingOne Services',
        subTitle: 'PingOne Services',
      },
      <NavBarItemButton
        key="Verify Button Group"
        id="Verify Button Group"
      >
        Group
      </NavBarItemButton>,
    ],
  },
  {
    'data-id': 'credentials-data-id',
    icon: Credentials,
    key: 'Credentials',
    heading: 'Credentials',
    children: [
      <NavBarItemButton
        key="Credentials Button Users"
        id="Credentials Button Users"
      >
        Users
      </NavBarItemButton>,
      {
        hasSeparator: false,
        key: 'PingOne Services',
        subTitle: 'PingOne Services',
      },
      <NavBarItemButton
        key="Credentials Button Group"
        id="Credentials Button Group"
      >
        Group
      </NavBarItemButton>,
    ],
  },
];

const thirdData = [
  {
    'data-id': 'environment-data-id',
    icon: Earth,
    key: 'Environment',
    heading: 'Environment title that is so long, it wraps',
    children: [
      <NavBarItemButton
        key="Earth Button Users"
        id="Earth Button Users"
      >
        Users
      </NavBarItemButton>,
      <NavBarItemButton
        key="Earth Button Group"
        id="Earth Button Group"
      >
        Group
      </NavBarItemButton>,
    ],
  },
];

export const Default: StoryFn<NavBarProps> = () => {
  const { icons } = useGetTheme();
  return (
    <NavBar>
      <Box padding="md" key="top-logo-parent">
        <Link
          aria-label="home link"
          href="https://pingidentity.com"
          target="_blank"
        >
          {icons.pingLogoHorizontalSmall}
        </Link>
      </Box>
      <Separator m={0} backgroundColor="neutral.60" />
      <Box
        variant="navBar.sectionContainer"
        paddingBottom="xl"
        key="first-section-container"
      >
        <NavBarItem
          data-id="nav-bar-item"
          icon={GlobeIcon}
          id="Overview"
          key="Overview"
          text="Overview"
        />
        <NavBarSection items={data} data-id="nav-bar-section" />
        <NavBarSection items={secondData} hasSeparator title="PingOne Services" data-id="second-nav-bar-section" />
        <NavBarSection items={thirdData} hasSeparator data-id="third-nav-bar-section" />
      </Box>
    </NavBar>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.navBar.default,
  },
};

export const OnyxDefault: StoryFn<NavBarProps> = () => {
  const { icons } = useGetTheme();

  const firstSectionData = [
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

  const secondSectionData = [
    {
      'data-id': 'DaVinci',
      heading: 'DaVinci',
      icon: FileTreeIcon,
      key: 'DaVinci-new',
      href: 'https://pingidentity.com/',
    },
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

  const thirdSectionData = [
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

  return (
    <NavBar>
      <Box py="xs" key="top-logo-parent">
        <Link
          aria-label="home link"
          variant="navBarLogoLink"
          href="https://pingidentity.com"
          target="_blank"
        >
          {icons.pingLogoHorizontalSmall}
        </Link>
      </Box>
      <Box
        variant="navBar.sectionContainer"
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
        <NavBarSection items={firstSectionData} data-id="nav-bar-section" />
        <NavBarSection
          hasSeparator
          items={secondSectionData}
          data-id="second-nav-bar-section"
        />
        <NavBarSection items={thirdSectionData} hasSeparator data-id="third-nav-bar-section" />
      </Box>
    </NavBar>
  );
};

export const Controlled: StoryFn<NavBarProps> = () => {
  const [selectedKey, setSelectedKey] = useState('Dashboard Link Group');
  const { icons } = useGetTheme();
  const customData = [
    {
      icon: Earth,
      key: 'Environment',
      heading: 'Nested redirect is in here',
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
        >
          Group
        </NavBarItemButton>,
      ],
    },
  ];

  return (
    <NavBar setSelectedKey={setSelectedKey} selectedKey={selectedKey}>
      <Box padding="md" key="top-logo-parent">
        <Link
          aria-label="home link"
          href="https://pingidentity.com"
          target="_blank"
        >
          {icons.pingLogoHorizontalSmall}
        </Link>
      </Box>
      <Separator m="0" backgroundColor="neutral.60" key="top-separator" />
      <Box
        variant="navBar.sectionContainer"
        paddingBottom="xl"
        key="first-section-container"
      >
        <NavBarItem
          data-id="nav-bar-item"
          icon={GlobeIcon}
          id="Overview"
          key="Overview"
          text="Overview"
        />
        <NavBarSection items={data} data-id="first-nav-bar-section" />
        <NavBarSection items={secondData} hasSeparator title="PingOne Services" data-id="second-nav-bar-section" />
        <NavBarSection items={customData} data-id="third-nav-bar-section" />
      </Box>
    </NavBar>
  );
};

export const AutoCollapse: StoryFn<NavBarProps> = () => {
  const { icons } = useGetTheme();
  return (
    <NavBar isAutoСollapsible>
      <Box padding="md" key="top-logo-parent">
        <Link
          aria-label="home link"
          href="https://pingidentity.com"
          target="_blank"
        >
          {icons.pingLogoHorizontalSmall}
        </Link>
      </Box>
      <Separator m={0} backgroundColor="neutral.60" />
      <Box
        variant="navBar.sectionContainer"
        paddingBottom="xl"
        key="first-section-container"
      >
        <NavBarItem
          data-id="nav-bar-item"
          icon={GlobeIcon}
          id="Overview"
          key="Overview"
          text="Overview"
        />
        <NavBarSection items={data} data-id="nav-bar-section" />
        <NavBarSection items={secondData} hasSeparator title="PingOne Services" data-id="second-nav-bar-section" />
        <NavBarSection items={thirdData} hasSeparator data-id="third-nav-bar-section" />
      </Box>
    </NavBar>
  );
};
