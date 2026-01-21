import React from 'react';
import mdiAccountCog from '@pingux/mdi-react/AccountCogIcon';
import AccountMultiple from '@pingux/mdi-react/AccountMultipleIcon';
import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import AlertCircleOutlineIcon from '@pingux/mdi-react/AlertCircleOutlineIcon';
import AlertIcon from '@pingux/mdi-react/AlertIcon';
import WarningIcon from '@pingux/mdi-react/AlertOutlineIcon';
import ApplicationOutlineIcon from '@pingux/mdi-react/ApplicationOutlineIcon';
import ArrowDownIcon from '@pingux/mdi-react/ArrowDownIcon';
import ArrowUpIcon from '@pingux/mdi-react/ArrowUpIcon';
import ChatIcon from '@pingux/mdi-react/ChatIcon';
import DefaultCircle from '@pingux/mdi-react/CheckboxBlankCircleOutlineIcon';
import CheckCircleIcon from '@pingux/mdi-react/CheckCircleIcon';
import CheckCircleOutlineIcon from '@pingux/mdi-react/CheckCircleOutlineIcon';
import Clipboard from '@pingux/mdi-react/ClipboardIcon';
import CloseOctagonOutlineIcon from '@pingux/mdi-react/CloseOctagonOutlineIcon';
import ConnectionIcon from '@pingux/mdi-react/ConnectionIcon';
import CreateIcon from '@pingux/mdi-react/CreateIcon';
import Earth from '@pingux/mdi-react/EarthIcon';
import EmoticonHappy from '@pingux/mdi-react/EmoticonHappyOutlineIcon';
import Fingerprint from '@pingux/mdi-react/FingerprintIcon';
import GlobeIcon from '@pingux/mdi-react/GlobeIcon';
import InformationIcon from '@pingux/mdi-react/InformationIcon';
import InformationOutlineIcon from '@pingux/mdi-react/InformationOutlineIcon';
import KeyChainVariant from '@pingux/mdi-react/KeyChainVariantIcon';
import MenuDown from '@pingux/mdi-react/MenuDownIcon';
import MenuUp from '@pingux/mdi-react/MenuUpIcon';
import MonitorScreenshotIcon from '@pingux/mdi-react/MonitorScreenshotIcon';
import MoreVertIcon from '@pingux/mdi-react/MoreVertIcon';
import OpenInNew from '@pingux/mdi-react/OpenInNewIcon';
import PlayCircle from '@pingux/mdi-react/PlayCircleIcon';
import PulseIcon from '@pingux/mdi-react/PulseIcon';
import RocketLaunchIcon from '@pingux/mdi-react/RocketLaunchIcon';
import ScaleBalance from '@pingux/mdi-react/ScaleBalanceIcon';
import ShieldStarOutlineIcon from '@pingux/mdi-react/ShieldStarOutlineIcon';
import TransitConnection from '@pingux/mdi-react/TransitConnectionVariantIcon';
import ViewDashboard from '@pingux/mdi-react/ViewDashboardIcon';
import WebIcon from '@pingux/mdi-react/WebIcon';

import { pingLogoHorizontalSmallWhite } from '../../../../utils/devUtils/constants/logos';
import statuses, { statusIcon } from '../../../../utils/devUtils/constants/statuses';

import { Aic, Credentials, DaVinci, PamIcon, Protect, Verify } from './navBarIcons';


export default {
  [statuses.DEFAULT]: InformationIcon,
  [statuses.ERROR]: AlertCircleIcon,
  [statuses.SUCCESS]: CheckCircleIcon,
  [statuses.WARNING]: AlertIcon,
  [statusIcon.CRITICAL]: AlertCircleOutlineIcon,
  [statusIcon.FATAL]: CloseOctagonOutlineIcon,
  [statusIcon.INFO]: InformationOutlineIcon,
  [statusIcon.MAJOR]: ArrowUpIcon,
  [statusIcon.MINOR]: ArrowDownIcon,
  [statusIcon.WARNING_NEUTRAL]: WarningIcon,
  aic: Aic,
  applicationsIcon: ApplicationOutlineIcon,
  Ascending: MenuUp,
  authenticationIcon: CheckCircleOutlineIcon,
  clipboard: Clipboard,
  CreateIcon,
  daVinci: DaVinci,
  DefaultCircle,
  Descending: MenuDown,
  popoverMenuIcon: MoreVertIcon,
  ErrorCircle: AlertCircleIcon,
  integrationsIcon: ConnectionIcon,
  listViewMenu: MoreVertIcon,
  mdiAccountCog,
  mdiAccountMultiple: AccountMultiple,
  mdiEarth: Earth,
  mdiEmoticonHappyOutline: EmoticonHappy,
  mdiFingerprint: Fingerprint,
  mdiPlayCircleIcon: PlayCircle,
  mdiScaleBalance: ScaleBalance,
  mdiShoCard: Credentials,
  mdiTransitConnectionVariant: TransitConnection,
  mdiViewDashboard: ViewDashboard,
  mdiWeb: GlobeIcon,
  MenuDown,
  MenuUp,
  monitoringIcon: PulseIcon,
  openInNew: OpenInNew,
  overviewIcon: WebIcon,
  p1verify: Verify,
  pam: PamIcon,
  PingAuthorize: KeyChainVariant,
  pingLogoHorizontalSmall: pingLogoHorizontalSmallWhite,
  protect: Protect,
  rocketLaunchIcon: RocketLaunchIcon,
  shareFeedbackIcon: ChatIcon,
  shieldStar: ShieldStarOutlineIcon,
  SuccessCircle: CheckCircleIcon,
  userExperienceIcon: MonitorScreenshotIcon,
  WarningIcon,
};
