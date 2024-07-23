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

import {
  AstroProvider,
  Box,
  NavBar,
  NavBarItem,
  NavBarItemButton,
  NavBarSection,
  NextGenTheme,
  Separator,
} from '../../index';

export default {
  title: 'Next Gen Recipes/NavBar',
};

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

const logo = (
  <svg width="161" height="28" viewBox="0 0 2385 415" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_10475_59692)">
      <path d="M0 372.674H372.613V0.000147457H0V372.674Z" fill="#B3282D" />
      <mask id="mask0_10475_59692" maskUnits="userSpaceOnUse" x="0" y="0" width="2385" height="415">
        <path d="M0 0H2385V415H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_10475_59692)">
        <path d="M1974.57 113.426L2006.72 108.051V326.877H1974.57V113.426ZM2100.71 138.143V276.131C2100.71 299.777 2106.68 307.961 2126.13 307.961C2134.89 307.961 2132.57 308.056 2138.16 305.039L2142.53 326.545C2132.57 332.106 2128.91 333.724 2115 333.724C2104.67 333.724 2096.74 331.591 2089.17 327.727C2075.28 320.419 2070.12 306.666 2070.12 285.153V138.143H2044.3V112.787H2070.12V31.6623H2101.92V112.787H2151.58L2142.05 138.143H2100.71ZM2355.46 320.461C2343.1 320.461 2333.12 309.882 2333.12 295.254C2333.12 280.613 2343.1 270.051 2355.46 270.051C2367.81 270.051 2377.81 280.613 2377.81 295.254C2377.81 309.882 2367.81 320.461 2355.46 320.461ZM2355.46 263.967C2339.19 263.967 2325.91 278.01 2325.91 295.254C2325.91 312.485 2339.19 326.516 2355.46 326.516C2371.75 326.516 2385 312.485 2385 295.254C2385 278.01 2371.75 263.967 2355.46 263.967ZM2350.31 292.569V282.426H2355.86C2359.06 282.426 2362.66 283.107 2362.66 287.269C2362.66 292.037 2359.48 292.569 2355.79 292.569H2350.31ZM2368.88 287.813C2368.88 280.351 2364.54 277.4 2356.51 277.4H2344.09V312.862H2350.31V297.594H2354.06L2362.73 312.862H2369.12L2360.13 297.341C2365.61 296.802 2368.88 293.863 2368.88 287.813ZM2342.12 112.787L2274.19 334.583C2260.68 377.602 2244.77 405.967 2210.22 415.002L2201.08 392.218C2220.42 385.661 2230.56 376.129 2239.01 352.831C2235.84 335.936 2234.05 328.591 2234.05 328.591C2231.68 314.838 2220.94 273.113 2214.19 251.637L2171.65 117.513L2202.28 106.313L2242.81 245.167C2248.75 265.403 2254.71 298.487 2254.71 298.487H2255.51C2255.51 298.487 2263.04 270.985 2267.83 253.364L2306.76 112.787H2342.12ZM1385.26 272.263C1385.26 272.263 1381.67 281.293 1373.34 287.755C1360.6 297.623 1351.46 301.504 1335.21 301.504C1316.93 301.504 1304.59 294.2 1295.47 276.566C1289.1 264.108 1287.52 245.611 1287.52 220.674C1287.52 190.582 1290.68 175.12 1300.23 158.781C1308.57 144.169 1321.68 136.429 1337.2 136.429C1360.6 136.429 1375.34 143.754 1385.26 158.781V272.263ZM1416.66 31.6623H1385.65V102.918C1385.65 118.364 1386.04 135.997 1386.04 135.997C1374.15 118.812 1354.65 108.931 1332.42 108.931C1318.11 108.931 1306.99 112.786 1294.27 122.248C1267.25 142.426 1253.36 175.97 1253.36 221.537C1253.36 289.871 1282.76 329.852 1333.99 329.852C1357.04 329.852 1372.16 322.573 1386.45 304.952C1386.84 316.091 1390.82 326.877 1390.82 326.877H1422.61C1418.21 314.393 1416.66 294.615 1416.66 257.68V31.6623ZM1889.71 113.214H1940.82L1931.3 138.575H1888.51V276.566C1888.51 300.225 1894.47 308.405 1913.94 308.405C1922.69 308.405 1920.38 308.505 1925.96 305.467L1930.34 326.985C1920.38 332.554 1916.72 334.168 1902.8 334.168C1892.48 334.168 1884.55 332.039 1876.98 328.167C1863.09 320.859 1857.91 307.098 1857.91 285.597V138.575H1832.1V113.214H1857.91V32.1022H1889.71V113.214ZM1799.51 139.438C1802.68 147.173 1804.28 155.76 1804.28 164.375V326.893H1772.88V181.992C1772.88 159.196 1771.29 153.631 1765.72 146.31C1761.37 140.728 1753 137.28 1743.88 137.28C1727.95 137.28 1703.36 151.07 1689.05 167.384V326.893H1658.85V161.802C1658.85 131.266 1651.33 116.65 1651.33 116.65L1681.49 107.624C1681.49 107.624 1688.68 123.502 1688.68 141.164C1709.29 118.812 1729.95 108.051 1751.03 108.051C1772.49 108.051 1791.56 120.539 1799.51 139.438ZM1492.67 200.032C1494.24 155.747 1510.14 133.408 1538.35 133.408C1553.46 133.408 1567.34 140.728 1574.09 152.324C1580.07 162.636 1582.85 176.829 1583.24 200.032H1492.67ZM1539.93 107.176C1516.08 107.176 1496.63 116.65 1480.74 136.848C1464.05 158.378 1456.92 181.564 1456.92 217.678C1456.92 288.63 1489.86 331.591 1544.7 331.591C1570.14 331.591 1594 322.142 1611.44 304.952L1599.52 283.426C1585.63 297.204 1570.14 303.633 1551.05 303.633C1531.18 303.633 1512.91 295.909 1501.79 277.429C1495.03 266.278 1492.67 250.778 1492.67 230.58V225.401H1616.2V220.674C1615.44 169.538 1610.64 149.331 1593.59 130.391C1580.07 115.376 1561.39 107.176 1539.93 107.176ZM1178.26 31.9653H1210.05V326.877H1178.26V31.9653Z" fill="#263746" />
        <path d="M836.686 159.866C826.225 159.866 812.64 167.269 800.607 178.756V327.575H748.544V175.05C748.544 156.969 746.208 139.705 741.561 125.724L787.752 111.763C792.428 120.403 795.146 129.43 795.146 138.062C802.905 132.289 809.511 127.359 818.063 122.437C828.54 116.697 842.142 113.415 853.781 113.415C875.918 113.415 895.338 125.724 901.545 143.83C904.259 151.636 905.429 160.667 905.429 173.826V327.575H854.159V190.684C854.159 166.85 850.283 159.866 836.686 159.866ZM985.056 184.927C985.056 165.207 996.326 153.682 1016.12 153.682C1035.95 153.682 1047.59 165.207 1047.59 184.927C1047.59 204.25 1036.33 214.932 1015.74 214.932C997.484 214.932 985.056 206.308 985.056 184.927ZM1035.95 273.729L1007.98 273.314C1002.53 273.314 999.446 271.247 999.446 268.372C999.446 262.632 1006.82 257.702 1020.01 251.103C1023.88 251.527 1025.44 251.527 1027.78 251.527C1070.11 251.527 1101.2 225.195 1101.2 189.028C1101.2 175.05 1097.28 164.356 1089.51 154.52C1092.62 154.935 1098.07 155.736 1103.13 155.736C1117.49 155.736 1128.34 151.209 1139.62 140.112L1117.88 105.164C1105.83 116.697 1091.08 123.275 1076.71 123.275C1070.11 123.275 1063.1 121.603 1052.25 118.739C1037.87 115.054 1027.78 113.415 1016.51 113.415C965.662 113.415 932.645 141.357 932.645 184.521C932.645 215.758 946.616 235.076 975.355 242.899C942.724 251.921 938.857 264.69 938.857 278.249C938.857 292.641 944.662 302.09 953.998 305.771C963.33 309.901 978.467 311.934 1001.75 312.357L1023.88 312.772C1044.49 313.183 1060.39 318.952 1060.39 337.847C1060.39 346.487 1055.35 354.289 1047.59 359.211C1039.45 364.577 1028.18 366.191 1014.99 366.191C990.907 366.191 977.678 357.169 977.678 340.299C977.678 334.552 978.073 331.692 980.027 326.758H931.869C929.919 330.85 927.213 336.631 927.213 348.139C927.213 362.494 932.645 374.856 943.521 385.53C961.375 403.217 990.513 408.135 1018.84 408.135C1049.9 408.135 1079.82 400.757 1097.28 381.007C1108.17 368.685 1113.22 355.131 1113.22 337.452C1113.22 318.528 1107.77 304.145 1096.13 292.641C1082.14 279.058 1066.22 274.128 1035.95 273.729ZM654.178 120.781L706.199 112.145V327.575H654.178V120.781ZM648.34 59.1327C648.34 40.2294 663.1 25.0155 680.959 25.0155C698.436 25.0155 712.428 40.2294 712.428 59.1327C712.428 78.0359 698.042 93.2581 680.174 93.2581C662.718 93.2581 648.34 78.0359 648.34 59.1327ZM566.36 160.667C559.003 172.59 552.393 175.474 530.265 175.474H501.924V88.3113H536.455C559.381 88.3113 572.962 104.351 572.962 131.069C572.962 144.648 571.045 152.881 566.36 160.667ZM593.572 55.85C578.41 46.7989 564.427 41.8729 518.609 41.8729H447.559V327.575H501.924V222.344H531.812C561.7 222.344 573.364 219.049 585.792 212.878C615.298 198.087 632.365 167.663 632.365 129.861C632.365 96.9516 618.784 70.6531 593.572 55.85Z" fill="#263746" />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_10475_59692">
        <rect width="2385" height="415" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const Default = () => {
  return (
    <AstroProvider themeOverrides={[NextGenTheme]}>
      <NavBar>
        <Box padding="md" pb="0px" key="top-logo-parent">
          {logo}
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
          <Separator m={0} backgroundColor="neutral.60" />
          <NavBarItem
            data-id="nav-bar-item"
            icon={FileTreeIcon}
            id="DaVinci"
            key="DaVinci"
            text="DaVinci"
          />
          <NavBarSection items={secondData} data-id="second-nav-bar-section" />
          <Separator m={0} backgroundColor="neutral.60" />
          <NavBarSection items={thirdData} data-id="third-nav-bar-section" />
        </Box>
      </NavBar>
    </AstroProvider>
  );
};
