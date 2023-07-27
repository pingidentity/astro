import React from 'react';
import AccountMultiple from '@pingux/mdi-react/AccountMultipleIcon';
import Earth from '@pingux/mdi-react/EarthIcon';
import EmoticonHappy from '@pingux/mdi-react/EmoticonHappyOutlineIcon';
import Fingerprint from '@pingux/mdi-react/FingerprintIcon';
import GlobeIcon from '@pingux/mdi-react/GlobeIcon';
import ScaleBalance from '@pingux/mdi-react/ScaleBalanceIcon';
import TransitConnection from '@pingux/mdi-react/TransitConnectionVariantIcon';
import ViewDashboard from '@pingux/mdi-react/ViewDashboardIcon';

import { Box, Link, NavBar, NavBarItem, NavBarItemButton, NavBarItemLink, NavBarSection, Separator } from '../../../index';
import WithUiLibraryCss from '../withUiLibraryCss';

export default {
  title: 'Chromatic Only NavBar',
  component: NavBar,
  decorators: [WithUiLibraryCss],
};

const Credentials = props => (
  <svg
    width="18px"
    height="18px"
    version="1.1"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    xml="preserve"
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
    <g id="Hero-Chart" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Dashboard-–-Verify" transform="translate(-251.000000, -579.000000)" fill="#ffffff" fillRule="nonzero">
        <g id="Group" transform="translate(251.000000, 577.000000)">
          <g id="card-account-details-star-outline" transform="translate(0.000000, 2.000000)">
            <path d="M12.9066667,16.2 L1.83333333,16.2 C0.834166667,16.164 0.0366666667,15.381 0,14.4 L0,1.8 C0.0366666667,0.819 0.834166667,0.036 1.83333333,0 L20.1666667,0 C21.1658333,0.036 21.9633333,0.819 22,1.8 L22,11.277 C21.4683333,10.8 20.8541667,10.449 20.1666667,10.206 L20.1666667,1.8 L1.83333333,1.8 L1.83333333,14.4 L12.9066667,14.4 C12.8608333,14.697 12.8333333,14.994 12.8333333,15.3 C12.8333333,15.606 12.8608333,15.912 12.9066667,16.2 M12.8333333,12.6 L3.66666667,12.6 L3.66666667,11.475 C3.66666667,9.981 6.72833333,9.225 8.25,9.225 C9.77166667,9.225 12.8333333,9.981 12.8333333,11.475 L12.8333333,12.6 M12.8333333,7.2 L16.5,7.2 L16.5,8.1 L12.8333333,8.1 L12.8333333,7.2 M8.25,3.6 C6.99416667,3.6 5.95833333,4.617 5.95833333,5.85 C5.95833333,7.083 6.99416667,8.1 8.25,8.1 C9.50583333,8.1 10.5416667,7.083 10.5416667,5.85 C10.5416667,4.617 9.50583333,3.6 8.25,3.6 M12.8333333,5.4 L18.3333333,5.4 L18.3333333,6.3 L12.8333333,6.3 L12.8333333,5.4 M20.4783333,12.456 L21.5416667,13.725 L17.1875,18 L14.6666667,15.3 L15.73,14.256 L17.1875,15.687 L20.4783333,12.456 Z M18.3333333,3.6 L18.3333333,4.5 L12.8333333,4.5 L12.8333333,3.6 L18.3333333,3.6 Z" id="Shape" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const logo = (
  <svg width="130" height="23" viewBox="0 0 130 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="logo-icon-title">
    <title id="logo-icon-title">Logo Icon</title>
    <path fillRule="evenodd" clipRule="evenodd" d="M0 20.9064H20.9064V0H0V20.9064Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M106.675 6.25124L108.426 5.95832V17.8924H106.675V6.25124ZM113.543 7.59921V15.1248C113.543 16.4146 113.868 16.8606 114.928 16.8606C115.404 16.8606 115.278 16.866 115.582 16.7014L115.821 17.8742C115.278 18.1776 115.079 18.2655 114.322 18.2655C113.759 18.2655 113.327 18.1497 112.915 17.9385C112.159 17.5402 111.878 16.7901 111.878 15.6169V7.59921H110.472V6.21637H111.878V1.79199H113.609V6.21637H116.314L115.794 7.59921H113.543ZM127.414 17.5425C126.741 17.5425 126.198 16.9656 126.198 16.1678C126.198 15.3693 126.741 14.7931 127.414 14.7931C128.087 14.7931 128.631 15.3693 128.631 16.1678C128.631 16.9656 128.087 17.5425 127.414 17.5425ZM127.414 14.4615C126.528 14.4615 125.805 15.2275 125.805 16.1678C125.805 17.1074 126.528 17.8726 127.414 17.8726C128.301 17.8726 129.023 17.1074 129.023 16.1678C129.023 15.2275 128.301 14.4615 127.414 14.4615ZM127.134 16.0214V15.4681H127.436C127.61 15.4681 127.807 15.5053 127.807 15.7323C127.807 15.9923 127.633 16.0214 127.432 16.0214H127.134ZM128.145 15.7618C128.145 15.3549 127.909 15.1941 127.472 15.1941H126.795V17.1279H127.134V16.2953H127.338L127.81 17.1279H128.158L127.669 16.2817C127.967 16.2519 128.145 16.0919 128.145 15.7618ZM126.688 6.21637L122.989 18.3128C122.254 20.6588 121.388 22.2056 119.506 22.6984L119.009 21.4558C120.062 21.0982 120.614 20.5783 121.074 19.3078C120.901 18.3864 120.803 17.9858 120.803 17.9858C120.674 17.2357 120.09 14.9601 119.722 13.7888L117.406 6.47442L119.074 5.8634L121.28 13.4363C121.604 14.5397 121.928 16.3437 121.928 16.3437H121.972C121.972 16.3437 122.382 14.8439 122.643 13.883L124.762 6.21637H126.688ZM74.5881 14.914C74.5881 14.914 74.3928 15.4065 73.9387 15.7587C73.2456 16.2969 72.7478 16.5084 71.8629 16.5084C70.8673 16.5084 70.1959 16.1101 69.6988 15.1484C69.3519 14.4692 69.266 13.4603 69.266 12.1003C69.266 10.4594 69.4382 9.61592 69.958 8.72477C70.4124 7.92777 71.126 7.50583 71.9712 7.50583C73.2456 7.50583 74.0478 7.9053 74.5881 8.72477V14.914ZM76.2972 1.79199H74.6094V5.67819C74.6094 6.52091 74.6306 7.48258 74.6306 7.48258C73.9828 6.54493 72.9211 6.00598 71.7112 6.00598C70.9315 6.00598 70.3262 6.21637 69.6335 6.73246C68.1622 7.83323 67.406 9.66242 67.406 12.1472C67.406 15.8741 69.0069 18.0547 71.7959 18.0547C73.0514 18.0547 73.8745 17.6576 74.6523 16.6967C74.6736 17.3042 74.8905 17.8924 74.8905 17.8924H76.6218C76.3823 17.2113 76.2972 16.133 76.2972 14.1186V1.79199ZM102.055 6.24H104.837L104.319 7.62284H101.99V15.1484C101.99 16.4387 102.314 16.885 103.374 16.885C103.85 16.885 103.725 16.8904 104.028 16.725L104.267 17.8982C103.725 18.202 103.525 18.2899 102.767 18.2899C102.205 18.2899 101.773 18.1737 101.362 17.9629C100.605 17.5642 100.323 16.8137 100.323 15.6409V7.62284H98.9179V6.24H100.323V1.8164H102.055V6.24ZM97.1433 7.66972C97.3162 8.09205 97.4032 8.5601 97.4032 9.03009V17.8932H95.6933V9.99098C95.6933 8.74763 95.6067 8.44425 95.3038 8.04478C95.0667 7.74063 94.6111 7.55232 94.1141 7.55232C93.2473 7.55232 91.9079 8.30438 91.129 9.19398V17.8932H89.4848V8.88983C89.4848 7.22453 89.0748 6.42753 89.0748 6.42753L90.7174 5.93469C90.7174 5.93469 91.1085 6.80066 91.1085 7.76388C92.2313 6.54493 93.3556 5.95832 94.5036 5.95832C95.672 5.95832 96.7109 6.63909 97.1433 7.66972ZM80.4365 10.9747C80.5216 8.55933 81.3876 7.34116 82.9231 7.34116C83.7462 7.34116 84.5023 7.74063 84.8698 8.37257C85.1946 8.93516 85.3463 9.7093 85.3675 10.9747H80.4365ZM83.0097 5.91067C81.711 5.91067 80.6516 6.42753 79.7864 7.52869C78.8782 8.70307 78.4895 9.96735 78.4895 11.9372C78.4895 15.8063 80.2834 18.1497 83.2697 18.1497C84.6547 18.1497 85.9531 17.6344 86.9034 16.6967L86.254 15.5227C85.4979 16.274 84.6547 16.6246 83.6151 16.6246C82.5329 16.6246 81.5381 16.2035 80.9328 15.1953C80.5646 14.5874 80.4365 13.742 80.4365 12.6408V12.3583H87.1626V12.1003C87.1208 9.31177 86.8593 8.20945 85.9315 7.17649C85.1946 6.3574 84.1778 5.91067 83.0097 5.91067ZM63.3167 17.8924H65.0479V1.80865H63.3167V17.8924Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M36.9874 1.1947C35.9856 1.1947 35.1575 2.04867 35.1575 3.10948C35.1575 4.17059 35.964 5.02519 36.9435 5.02519C37.9457 5.02519 38.7528 4.17059 38.7528 3.10948C38.7528 2.04867 37.9678 1.1947 36.9874 1.1947ZM56.9033 15.1542L55.3339 15.1312C55.0284 15.1312 54.855 15.0152 54.855 14.8537C54.855 14.5314 55.2689 14.2548 56.009 13.8847C56.2262 13.9084 56.3134 13.9084 56.4446 13.9084C58.8193 13.9084 60.5636 12.4303 60.5636 10.4005C60.5636 9.61595 60.3439 9.0155 59.9081 8.46364L59.9605 8.47065L59.9606 8.47066C60.1397 8.49475 60.4151 8.5318 60.672 8.5318C61.4778 8.5318 62.0866 8.27764 62.7193 7.65479L61.4996 5.69332C60.8237 6.34046 59.9958 6.70963 59.1899 6.70963C58.8193 6.70963 58.4264 6.61608 57.8177 6.45516C57.0109 6.24833 56.4446 6.15619 55.8128 6.15619C52.9597 6.15619 51.1075 7.72483 51.1075 10.1476C51.1075 11.9005 51.8913 12.985 53.5037 13.424C51.673 13.9305 51.4561 14.6472 51.4561 15.4081C51.4561 16.216 51.7818 16.7461 52.3055 16.953C52.8291 17.1848 53.6782 17.2985 54.9848 17.3225L56.2262 17.3459C57.3822 17.3689 58.2745 17.6928 58.2745 18.7533C58.2745 19.2382 57.9916 19.676 57.5562 19.9526C57.0994 20.2536 56.467 20.3442 55.7268 20.3442C54.3761 20.3442 53.6337 19.8377 53.6337 18.8909C53.6337 18.5682 53.6561 18.4079 53.7657 18.1307H51.064C50.9545 18.3606 50.8029 18.6848 50.8029 19.331C50.8029 20.1367 51.1075 20.8304 51.7178 21.4296C52.7194 22.4222 54.3541 22.6985 55.9431 22.6985C57.6855 22.6985 59.3645 22.2842 60.3439 21.1757C60.9548 20.4841 61.2385 19.7232 61.2385 18.7312C61.2385 17.6691 60.9324 16.8615 60.2795 16.216C59.4945 15.4535 58.6016 15.1769 56.9033 15.1542ZM54.0479 10.1703C54.0479 9.06345 54.6801 8.41632 55.7907 8.41632C56.9033 8.41632 57.5562 9.06345 57.5562 10.1703C57.5562 11.2548 56.9244 11.8541 55.7692 11.8541C54.7452 11.8541 54.0479 11.3704 54.0479 10.1703ZM43.6997 9.82372C44.375 9.17909 45.1373 8.76354 45.7242 8.76354C46.4871 8.76354 46.7042 9.15543 46.7042 10.4931V18.1768H49.5808V9.54716C49.5808 8.80867 49.5151 8.30146 49.3627 7.86351C49.0144 6.8472 47.9252 6.15619 46.683 6.15619C46.0303 6.15619 45.2671 6.34046 44.6792 6.66278C44.2068 6.93488 43.8401 7.20758 43.4131 7.52507L43.3936 7.53962C43.3936 7.05529 43.2412 6.54855 42.9789 6.06359L40.3874 6.8472C40.6481 7.63176 40.779 8.60074 40.779 9.61595V18.1768H43.6997V9.82372ZM35.485 6.5697L38.4035 6.08505V18.1768H35.485V6.5697ZM32.0851 2.92521C31.2343 2.41721 30.4496 2.14096 27.8792 2.14096H23.8931V18.1768H26.9433V12.2702H28.6201C30.2969 12.2702 30.9512 12.0853 31.6485 11.7391C33.3037 10.9088 34.2612 9.20118 34.2612 7.07926C34.2612 5.23234 33.4995 3.75614 32.0851 2.92521ZM28.5333 9.63945C29.7748 9.63945 30.1457 9.47775 30.5583 8.80867C30.8212 8.3715 30.9288 7.90926 30.9288 7.14711C30.9288 5.64757 30.1668 4.74738 28.8805 4.74738H26.9433V9.63945H28.5333Z" fill="white" />
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

export const Default = () => (
  <NavBar>
    <Box padding="md">
      <Link
        aria-label="home link"
        href="https://pingidentity.com"
        target="_blank"
      >
        {logo}
      </Link>
    </Box>
    <Separator m={0} backgroundColor="neutral.60" />
    <Box
      variant="navBar.sectionContainer"
      paddingBottom="xl"
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
