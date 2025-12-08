import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import { v4 as uuid } from 'uuid';

import DocsLayout from '../../../.storybook/storybookDocsLayout';
import { Box, NavSideBar, Separator } from '../../index';
import { NavSideBarProps } from '../../types';
import { FIGMA_LINKS } from '../../utils/designUtils/figmaLinks';

import {
  AccountMultiple,
  Credentials,
  Earth,
  EmoticonHappy,
  Fingerprint,
  GlobeIcon,
  Logo,
  OpenInNew,
  ScaleBalance,
  TransitConnection,
  Verify,
  ViewDashboard,
  ViewGridPlusOutline,
} from './icons';
import NavSideBarReadme from './NavSideBar.mdx';
import NavSideBarHeader from './NavSideBarHeader';
import NavSideBarItem from './NavSideBarItem';
import NavSideBarSection from './NavSideBarSection';
import NavSideBarSectionItem from './NavSideBarSectionItem';
import NavSideBarSubTitle from './NavSideBarSubTitle';

export default {
  title: 'Experimental/NavSideBar',
  component: NavSideBar,
  decorators: [withDesign],
  parameters: {
    docs: {
      page: () => (
        <>
          <NavSideBarReadme />
          <DocsLayout />
        </>
      ),
    },
  },
  argTypes: {
  },
  args: {
    title: 'Continue',
    hasCloseButton: true,
  },
} as Meta;

export const Default: StoryFn<NavSideBarProps> = (args: NavSideBarProps) => {
  return (
    <NavSideBar {...args}>
      <NavSideBarHeader key="nav-side-bar-header" linkProps={{ href: 'https://pingidentity.com/', target: '_blank', 'aria-label': 'home Link' }} logo={Logo} />
      <Separator m="0" backgroundColor="neutral.60" key="top-separator" />
      <Box variant="navBar.sectionContainer" pb="xl">
        <NavSideBarItem key="Overview" icon={GlobeIcon} id="Overview">
          Overview
        </NavSideBarItem>

        <Separator variant="separator.navBarSeparator" />

        <NavSideBarSubTitle>Dashboard Links</NavSideBarSubTitle>

        <NavSideBarSection title="Dashboard" key="Dashboard" id="Dashboard" icon={ViewDashboard}>
          <NavSideBarSectionItem key="Dashboard Link Group" linkProps={{ href: 'https://pingidentity.com/' }}>
            Group
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Dashboard Link Populations">
            Populations
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Identities" key="Identities" id="Identities" icon={AccountMultiple}>
          <NavSideBarSectionItem key="Identities Link Users" linkProps={{ href: 'https://pingidentity.com/' }}>
            Users
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Groups" linkProps={{ href: 'https://pingidentity.com/' }}>
            Groups
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Populations" linkProps={{ href: 'https://pingidentity.com/' }}>
            Populations
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Attributes" linkProps={{ href: 'https://pingidentity.com/' }}>
            Attributes
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Roles">
            Roles
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Connections" key="Connections" id="Connections" icon={TransitConnection}>
          <NavSideBarSubTitle sx={{ ml: '45px' }} key="Connections Applications SubTitle">Applications</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Connections Applications">
            Applications
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Application Catalog" linkProps={{ href: 'https://pingidentity.com/' }}>
            Application Catalog
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Application Portal" linkProps={{ href: 'https://pingidentity.com/' }}>
            Application Portal
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSubTitle key="Identity Providers" sx={{ ml: '45px' }}>Identity Providers</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Connections External IDPs" linkProps={{ href: 'https://pingidentity.com/' }}>
            External IDPs
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSubTitle key="Ping Products" sx={{ ml: '45px' }}>Ping Products</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Connections PingFederate" linkProps={{ href: 'https://pingidentity.com/' }}>
            PingFederate
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections PingIntelligence" linkProps={{ href: 'https://pingidentity.com/' }}>
            PingIntelligence
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSectionItem key="Connections Provisioning" linkProps={{ href: 'https://pingidentity.com/' }}>
            Provisioning
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections WebHooks" linkProps={{ href: 'https://pingidentity.com/' }}>
            WebHooks
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Gateways" linkProps={{ href: 'https://pingidentity.com/' }}>
            Gateways
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Certificates & Key Pairs" linkProps={{ href: 'https://pingidentity.com/' }}>
            Certificates & Key Pairs
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Resources">
            Resources
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Experiences" key="Experiences" id="Experiences" icon={EmoticonHappy}>
          <NavSideBarSubTitle key="Experience Policies" sx={{ ml: '45px' }}>Policies</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Experiences Authentication" linkProps={{ href: 'https://pingidentity.com/' }}>
            Authentication
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences MFA" linkProps={{ href: 'https://pingidentity.com/' }}>
            MFA
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Password" linkProps={{ href: 'https://pingidentity.com/' }}>
            Password
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSectionItem key="Experiences Risk" linkProps={{ href: 'https://pingidentity.com/' }}>
            Risk
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Flows" linkProps={{ href: 'https://pingidentity.com/' }}>
            Flows
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Forms" linkProps={{ href: 'https://pingidentity.com/' }}>
            Forms
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Language" linkProps={{ href: 'https://pingidentity.com/' }}>
            Languages
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Agreements" linkProps={{ href: 'https://pingidentity.com/' }}>
            Agreements
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Branding & Themes" linkProps={{ href: 'https://pingidentity.com/' }}>
            Branding & Themes
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Notifications" linkProps={{ href: 'https://pingidentity.com/' }}>
            Notifications
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Vanity Domains" linkProps={{ href: 'https://pingidentity.com/' }} onClick={e => e.preventDefault()}>
            Vanity Domains
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Sender">
            Sender
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <Separator variant="separator.navBarSeparator" />
        <NavSideBarSubTitle>PingOne Services</NavSideBarSubTitle>

        <NavSideBarItem key="DaVinci" id="DaVinci" icon={ViewGridPlusOutline} customIcon={OpenInNew} linkProps={{ href: 'https://pingidentity.com/', 'aria-label': 'DaVinci Link' }}>
          DaVinci
        </NavSideBarItem>

        <NavSideBarSection title="MFA" key="MFA" id="MFA" icon={Fingerprint}>
          <NavSideBarSectionItem key="MFA Button Users">
            Users
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="MFA Button Group">
            Group Test
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Risk" key="Risk" id="Risk" icon={ScaleBalance}>
          <NavSideBarSectionItem key="Risk Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Risk Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Verify" key="Verify" id="Verify" icon={Verify}>
          <NavSideBarSectionItem key="Verify Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Verify Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Credentials" key="Credentials" id="Credentials" icon={Credentials}>
          <NavSideBarSectionItem key="Credentials Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Credentials Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <Separator variant="separator.navBarSeparator" />

        <NavSideBarSection title="Environment title that is so long, it wraps" key="Environment" id="Environment" icon={Earth}>
          <NavSideBarSectionItem key="Earth Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Earth Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>
      </Box>
    </NavSideBar>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.navBar.default,
  },
};

export const Controlled: StoryFn<NavSideBarProps> = (args: NavSideBarProps) => {
  const [selectedKey, setSelectedKey] = useState('Dashboard Link Group');
  return (
    <NavSideBar
      {...args}
      setSelectedKey={setSelectedKey}
      selectedKey={selectedKey}
    >
      <NavSideBarHeader key="nav-side-bar-header" linkProps={{ href: 'https://pingidentity.com/', target: '_blank', 'aria-label': 'home Link' }} logo={Logo} />
      <Separator m="0" backgroundColor="neutral.60" key="top-separator" />
      <Box
        variant="navBar.sectionContainer"
        paddingBottom="xl"
        key="first-section-container"
      >
        <NavSideBarItem key="Overview" icon={GlobeIcon} id="Overview">
          Overview
        </NavSideBarItem>

        <Separator variant="separator.navBarSeparator" />
        <NavSideBarSubTitle>Dashboard Links</NavSideBarSubTitle>

        <NavSideBarSection title="Dashboard" key="Dashboard" id="Dashboard" icon={ViewDashboard}>
          <NavSideBarSectionItem key="Dashboard Link Group" linkProps={{ href: 'https://pingidentity.com/' }}>
            Group
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Dashboard Link Populations" onPress={() => { setSelectedKey('MFA Button Users'); }}>
            Populations
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Identities" key="Identities" id="Identities" icon={AccountMultiple}>
          <NavSideBarSectionItem key="Identities Link Users" linkProps={{ href: 'https://pingidentity.com/' }} onClick={e => e.preventDefault()}>
            Users
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Groups" linkProps={{ href: 'https://pingidentity.com/' }}>
            Groups
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Populations" linkProps={{ href: 'https://pingidentity.com/' }}>
            Populations
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Attributes" linkProps={{ href: 'https://pingidentity.com/' }}>
            Attributes
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Roles">
            Roles
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Connections" key="Connections" id="Connections" icon={TransitConnection}>
          <NavSideBarSubTitle key="Connections Applications SubTitle" sx={{ ml: '45px' }}>Applications</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Connections Applications">
            Applications
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Application Catalog" linkProps={{ href: 'https://pingidentity.com/' }}>
            Application Catalog
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Application Portal" linkProps={{ href: 'https://pingidentity.com/' }}>
            Application Portal
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSubTitle key="Identity Providers" sx={{ ml: '45px' }}>Identity Providers</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Connections External IDPs" linkProps={{ href: 'https://pingidentity.com/' }}>
            External IDPs
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSubTitle key="Ping Products" sx={{ ml: '45px' }}>Ping Products</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Connections PingFederate" linkProps={{ href: 'https://pingidentity.com/' }}>
            PingFederate
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections PingIntelligence" linkProps={{ href: 'https://pingidentity.com/' }}>
            PingIntelligence
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSectionItem key="Connections Provisioning" linkProps={{ href: 'https://pingidentity.com/' }}>
            Provisioning
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections WebHooks" linkProps={{ href: 'https://pingidentity.com/' }}>
            WebHooks
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Gateways" linkProps={{ href: 'https://pingidentity.com/' }}>
            Gateways
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Certificates & Key Pairs" linkProps={{ href: 'https://pingidentity.com/' }}>
            Certificates & Key Pairs
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Resources">
            Resources
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Experiences" key="Experiences" id="Experiences" icon={EmoticonHappy}>
          <NavSideBarSubTitle key="Experience Policies" sx={{ ml: '45px' }}>Policies</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Experiences Authentication" linkProps={{ href: 'https://pingidentity.com/' }}>
            Authentication
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences MFA" linkProps={{ href: 'https://pingidentity.com/' }}>
            MFA
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Password" linkProps={{ href: 'https://pingidentity.com/' }}>
            Password
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSectionItem key="Experiences Risk" linkProps={{ href: 'https://pingidentity.com/' }}>
            Risk
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Flows" linkProps={{ href: 'https://pingidentity.com/' }}>
            Flows
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Forms" linkProps={{ href: 'https://pingidentity.com/' }}>
            Forms
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Language" linkProps={{ href: 'https://pingidentity.com/' }}>
            Languages
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Agreements" linkProps={{ href: 'https://pingidentity.com/' }}>
            Agreements
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Branding & Themes" linkProps={{ href: 'https://pingidentity.com/' }}>
            Branding & Themes
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Notifications" linkProps={{ href: 'https://pingidentity.com/' }}>
            Notifications
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Vanity Domains" linkProps={{ href: 'https://pingidentity.com/' }} onClick={e => e.preventDefault()}>
            Vanity Domains
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Sender">
            Sender
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <Separator variant="separator.navBarSeparator" />
        <NavSideBarSubTitle>PingOne Services</NavSideBarSubTitle>

        <NavSideBarItem key="DaVinci" id="DaVinci" icon={ViewGridPlusOutline} customIcon={OpenInNew} linkProps={{ href: 'https://pingidentity.com/', 'aria-label': 'DaVinci Link' }}>
          DaVinci
        </NavSideBarItem>

        <NavSideBarSection title="MFA" key="MFA" id="MFA" icon={Fingerprint}>
          <NavSideBarSectionItem key="MFA Button Users">
            Users
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="MFA Button Group">
            Group Test
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Risk" key="Risk" id="Risk" icon={ScaleBalance}>
          <NavSideBarSectionItem key="Risk Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Risk Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Verify" key="Verify" id="Verify" icon={Verify}>
          <NavSideBarSectionItem key="Verify Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Verify Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Credentials" key="Credentials" id="Credentials" icon={Credentials}>
          <NavSideBarSectionItem key="Credentials Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Credentials Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <Separator variant="separator.navBarSeparator" />

        <NavSideBarSection title="Environment title that is so long, it wraps" key="Environment" id="Environment" icon={Earth}>
          <NavSideBarSectionItem key="Earth Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Earth Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>
      </Box>
    </NavSideBar>
  );
};

export const AutoCollapse: StoryFn<NavSideBarProps> = (args: NavSideBarProps) => {
  return (
    <NavSideBar
      {...args}
      isAutoСollapsible
    >
      <NavSideBarHeader key="nav-side-bar-header" linkProps={{ href: 'https://pingidentity.com/', target: '_blank', 'aria-label': 'home Link' }} logo={Logo} />
      <Separator m="0" backgroundColor="neutral.60" key="top-separator" />
      <Box
        variant="navBar.sectionContainer"
        paddingBottom="xl"
        key="first-section-container"
      >
        <NavSideBarItem key="Overview" icon={GlobeIcon} id="Overview">
          Overview
        </NavSideBarItem>

        <Separator variant="separator.navBarSeparator" />
        <NavSideBarSubTitle>Dashboard Links</NavSideBarSubTitle>

        <NavSideBarSection title="Dashboard" key="Dashboard" id="Dashboard" icon={ViewDashboard}>
          <NavSideBarSectionItem key="Dashboard Link Group" linkProps={{ href: 'https://pingidentity.com/' }}>
            Group
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Dashboard Link Populations">
            Populations
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Identities" key="Identities" id="Identities" icon={AccountMultiple}>
          <NavSideBarSectionItem key="Identities Link Users" linkProps={{ href: 'https://pingidentity.com/' }}>
            Users
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Groups" linkProps={{ href: 'https://pingidentity.com/' }}>
            Groups
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Populations" linkProps={{ href: 'https://pingidentity.com/' }}>
            Populations
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Attributes" linkProps={{ href: 'https://pingidentity.com/' }}>
            Attributes
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Identities Link Roles">
            Roles
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Connections" key="Connections" id="Connections" icon={TransitConnection}>
          <NavSideBarSubTitle key="Connections Applications SubTitle" sx={{ ml: '45px' }}>Applications</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Connections Applications">
            Applications
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Application Catalog" linkProps={{ href: 'https://pingidentity.com/' }}>
            Application Catalog
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Application Portal" linkProps={{ href: 'https://pingidentity.com/' }}>
            Application Portal
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSubTitle key="Identity Providers" sx={{ ml: '45px' }}>Identity Providers</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Connections External IDPs" linkProps={{ href: 'https://pingidentity.com/' }}>
            External IDPs
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSubTitle key="Ping Products" sx={{ ml: '45px' }}>Ping Products</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Connections PingFederate" linkProps={{ href: 'https://pingidentity.com/' }}>
            PingFederate
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections PingIntelligence" linkProps={{ href: 'https://pingidentity.com/' }}>
            PingIntelligence
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSectionItem key="Connections Provisioning" linkProps={{ href: 'https://pingidentity.com/' }}>
            Provisioning
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections WebHooks" linkProps={{ href: 'https://pingidentity.com/' }}>
            WebHooks
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Gateways" linkProps={{ href: 'https://pingidentity.com/' }}>
            Gateways
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Certificates & Key Pairs" linkProps={{ href: 'https://pingidentity.com/' }}>
            Certificates & Key Pairs
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Connections Resources">
            Resources
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Experiences" key="Experiences" id="Experiences" icon={EmoticonHappy}>
          <NavSideBarSubTitle key="Experience Policies" sx={{ ml: '45px' }}>Policies</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Experiences Authentication" linkProps={{ href: 'https://pingidentity.com/' }}>
            Authentication
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences MFA" linkProps={{ href: 'https://pingidentity.com/' }}>
            MFA
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Password" linkProps={{ href: 'https://pingidentity.com/' }}>
            Password
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSectionItem key="Experiences Risk" linkProps={{ href: 'https://pingidentity.com/' }}>
            Risk
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Flows" linkProps={{ href: 'https://pingidentity.com/' }}>
            Flows
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Forms" linkProps={{ href: 'https://pingidentity.com/' }}>
            Forms
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Language" linkProps={{ href: 'https://pingidentity.com/' }}>
            Languages
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Agreements" linkProps={{ href: 'https://pingidentity.com/' }}>
            Agreements
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Branding & Themes" linkProps={{ href: 'https://pingidentity.com/' }}>
            Branding & Themes
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Notifications" linkProps={{ href: 'https://pingidentity.com/' }}>
            Notifications
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Vanity Domains" linkProps={{ href: 'https://pingidentity.com/' }} onClick={e => e.preventDefault()}>
            Vanity Domains
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Experiences Sender">
            Sender
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <Separator variant="separator.navBarSeparator" />
        <NavSideBarSubTitle>PingOne Services</NavSideBarSubTitle>

        <NavSideBarItem key="DaVinci" id="DaVinci" icon={ViewGridPlusOutline} customIcon={OpenInNew} linkProps={{ href: 'https://pingidentity.com/', 'aria-label': 'DaVinci Link' }}>
          DaVinci
        </NavSideBarItem>

        <NavSideBarSection title="MFA" key="MFA" id="MFA" icon={Fingerprint}>
          <NavSideBarSectionItem key="MFA Button Users">
            Users
          </NavSideBarSectionItem>
          <Separator variant="separator.navBarSubtitleSeparator" />
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="MFA Button Group">
            Group Test
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Risk" key="Risk" id="Risk" icon={ScaleBalance}>
          <NavSideBarSectionItem key="Risk Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Risk Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Verify" key="Verify" id="Verify" icon={Verify}>
          <NavSideBarSectionItem key="Verify Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Verify Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <NavSideBarSection title="Credentials" key="Credentials" id="Credentials" icon={Credentials}>
          <NavSideBarSectionItem key="Credentials Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSubTitle key="PingOne Services" sx={{ ml: '45px' }}>PingOne Services</NavSideBarSubTitle>
          <NavSideBarSectionItem key="Credentials Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>

        <Separator variant="separator.navBarSeparator" />

        <NavSideBarSection title="Environment title that is so long, it wraps" key="Environment" id="Environment" icon={Earth}>
          <NavSideBarSectionItem key="Earth Button Users">
            Users
          </NavSideBarSectionItem>
          <NavSideBarSectionItem key="Earth Button Group">
            Group
          </NavSideBarSectionItem>
        </NavSideBarSection>
      </Box>
    </NavSideBar>
  );
};

export const Dynamic: StoryFn<NavSideBarProps> = (args: NavSideBarProps) => {
  const navSideBarSectionItems = [
    {
      'data-id': 'overview',
      icon: GlobeIcon,
      key: 'Overview',
      heading: 'Overview',
    },
    {
      type: 'separator',
    },
    {
      type: 'subTitle',
      key: 'Dashboard Links SubHeading',
      text: 'Dashboard Links',
    },
    {
      'data-id': 'dashboard-data-id',
      heading: 'Dashboard',
      icon: ViewDashboard,
      key: 'Dashboard',
      children: [
        {
          key: 'Dashboard Link Group',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Group',
        },
        {
          key: 'Dashboard Button Populations',
          text: 'Populations',
        },
      ],
    },
    {
      'data-id': 'identities-data-id',
      icon: AccountMultiple,
      key: 'Identities',
      heading: 'Identities',
      children: [
        {
          key: 'Identity Link Users',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Users',
        },
        {
          key: 'Identity Link Groups',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Groups',
        },
        {
          key: 'Identity Link Populations',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Populations',
        },
        {
          key: 'Identities Link Attributes',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Attributes',
        },
        {
          key: 'Identities Button Roles',
          text: 'Roles',
        },
      ],
    },
    {
      'data-id': 'connections-data-id',
      icon: TransitConnection,
      key: 'Connections',
      heading: 'Connections',
      children: [
        {
          type: 'subTitle',
          key: 'Connections Applications SubHeading',
          text: 'Applications',
        },
        {
          key: 'Connections Link Applications',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Applications',
        },
        {
          key: 'Connections Link Application Catalog',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Application Catalog',
        },
        {
          key: 'Connections Link Application Portal',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Application Portal',
        },
        {
          type: 'separator',
        },
        {
          type: 'subTitle',
          key: 'Identity Providers SubHeading',
          text: 'Identity Providers',
        },
        {
          key: 'Connections Link External IDPs',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'External IDPs',
        },
        {
          type: 'separator',
        },
        {
          type: 'subTitle',
          key: 'Ping Products SubHeading',
          text: 'Ping Products',
        },
        {
          key: 'Connections Link PingFederate',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'PingFederate',
        },
        {
          key: 'Connections Link PingIntelligence',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'PingIntelligence',
        },
        {
          type: 'separator',
        },
        {
          key: 'Connections Link Provisioning',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Provisioning',
        },
        {
          key: 'Connections Link WebHooks',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'WebHooks',
        },
        {
          key: 'Connections Link Gateways',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Gateways',
        },
        {
          key: 'Connections Link Certificates & Key Pairs',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Certificates & Key Pairs',
        },
        {
          key: 'Connections Button Resources',
          text: 'Resources',
        },
      ],
    },
    {
      'data-id': 'experiences-data-id',
      icon: EmoticonHappy,
      key: 'Experiences',
      heading: 'Experiences',
      children: [
        {
          type: 'subTitle',
          key: 'Experience Policies SubHeading',
          text: 'Policies',
        },
        {
          key: 'Experiences Authentication',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Authentication',
        },
        {
          key: 'Experiences MFA',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'MFA',
        },
        {
          key: 'Experiences Password',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Password',
        },
        {
          type: 'separator',
        },
        {
          key: 'Experiences Risk',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Risk',
        },
        {
          key: 'Experiences Flows',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Flows',
        },
        {
          key: 'Experiences Forms',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Forms',
        },
        {
          key: 'Experiences Languages',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Languages',
        },
        {
          key: 'Experiences Agreements',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Agreements',
        },
        {
          key: 'Experiences Branding & Themes',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Branding & Themes',
        },
        {
          key: 'Experiences Notifications',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Notifications',
        },
        {
          key: 'Experiences Vanity Domains',
          linkProps: { href: 'https://pingidentity.com/' },
          text: 'Vanity Domains',
          onClick: e => e.preventDefault(),
        },
        {
          key: 'Experiences Sender',
          text: 'Sender',
        },
      ],
    },
    {
      type: 'separator',
    },
    {
      type: 'subTitle',
      key: 'DaVinci SubHeading',
      text: 'PingOne Services',
    },
    {
      'data-id': 'da-vinci-data-id',
      icon: ViewGridPlusOutline,
      key: 'DaVinci',
      heading: 'DaVinci',
      customIcon: OpenInNew,
      linkProps: { href: 'https://pingidentity.com/', 'aria-label': 'DaVinci Link' },
    },
    {
      'data-id': 'mfa-data-id',
      icon: Fingerprint,
      key: 'MFA',
      heading: 'MFA',
      children: [
        {
          key: 'MFA Button Users',
          text: 'Users',
        },
        {
          type: 'separator',
        },
        {
          type: 'subTitle',
          key: 'MFA SubHeading',
          text: 'PingOne Services',
        },
        {
          key: 'MFA Button Group',
          text: 'Group Test',
        },
      ],
    },
    {
      'data-id': 'risk-data-id',
      icon: ScaleBalance,
      key: 'Risk',
      heading: 'Risk',
      children: [
        {
          key: 'Risk Button Users',
          text: 'Users',
        },
        {
          type: 'subTitle',
          key: 'Risk SubHeading',
          text: 'PingOne Services',
        },
        {
          key: 'Risk Button Group',
          text: 'Group',
        },
      ],
    },
    {
      'data-id': 'verify-data-id',
      icon: Verify,
      key: 'Verify',
      heading: 'Verify',
      children: [
        {
          key: 'Verify Button Users',
          text: 'Users',
        },
        {
          type: 'subTitle',
          key: 'Verify SubHeading',
          text: 'PingOne Services',
        },
        {
          key: 'Verify Button Group',
          text: 'Group',
        },
      ],
    },
    {
      'data-id': 'credentials-data-id',
      icon: Credentials,
      key: 'Credentials',
      heading: 'Credentials',
      children: [
        {
          key: 'Credentials Button Users',
          text: 'Users',
        },
        {
          type: 'subTitle',
          key: 'Credential SubHeading',
          text: 'PingOne Services',
        },
        {
          key: 'Credentials Button Group',
          text: 'Group',
        },
      ],
    },
    {
      type: 'separator',
    },
    {
      'data-id': 'environment-data-id',
      icon: Earth,
      key: 'Environment',
      heading: 'Environment title that is so long, it wraps',
      children: [
        {
          key: 'Environment Button Users',
          text: 'Users',
        },
        {
          key: 'Environment Button Group',
          text: 'Group',
        },
      ],
    },
  ];

  const renderNavSideBarSection = item => {
    return (
      <NavSideBarSection
        key={item.key}
        title={item.heading}
        id={item.key}
        icon={item.icon}
      >
        {
          item.children.map(child => {
            switch (child.type) {
              case 'separator':
                return <Separator key={uuid()} variant="separator.navBarSubtitleSeparator" />;
              case 'subTitle':
                return <NavSideBarSubTitle key={child.key} sx={{ ml: '45px' }}>{child.text}</NavSideBarSubTitle>;
              default:
                return (
                  <NavSideBarSectionItem
                    key={child.key}
                    linkProps={child.linkProps}
                    onClick={child.onClick}
                  >
                    {child.text}
                  </NavSideBarSectionItem>
                );
            }
          })
        }
      </NavSideBarSection>
    );
  };

  const renderNavSideBarItem = item => (
    <NavSideBarItem
      key={item.key}
      icon={item.icon}
      id={item.key}
      customIcon={item.customIcon}
      linkProps={item.linkProps}
    >
      {item.heading}
    </NavSideBarItem>
  );

  return (
    <NavSideBar
      {...args}
    >
      <NavSideBarHeader key="nav-side-bar-header" linkProps={{ href: 'https://pingidentity.com/', target: '_blank', 'aria-label': 'home Link' }} logo={Logo} />
      <Separator m="0" backgroundColor="neutral.60" key="top-separator" />
      <Box
        variant="navBar.sectionContainer"
        paddingBottom="xl"
        key="first-section-container"
      >
        {
          navSideBarSectionItems.map(item => {
            switch (item.type) {
              case 'separator':
                return <Separator key={uuid()} variant="separator.navBarSeparator" />;
              case 'subTitle':
                return <NavSideBarSubTitle key={item.key}>{item.text}</NavSideBarSubTitle>;
              default:
                return item.children ? renderNavSideBarSection(item) : renderNavSideBarItem(item);
            }
          })
        }
      </Box>
    </NavSideBar>
  );
};
