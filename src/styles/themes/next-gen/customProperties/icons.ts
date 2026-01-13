import React from 'react';
import AccountCheckIcon from '@pingux/mdi-react/AccountCheckOutlineIcon';
import mdiAccountCog from '@pingux/mdi-react/AccountCogIcon';
import AccountMultipleOutlineIcon from '@pingux/mdi-react/AccountMultipleOutlineIcon';
import AlertCircleOutlineIcon from '@pingux/mdi-react/AlertCircleOutlineIcon';
import AlertOutlineIcon from '@pingux/mdi-react/AlertOutlineIcon';
import AppsIcon from '@pingux/mdi-react/AppsIcon';
import ArrowDownIcon from '@pingux/mdi-react/ArrowDownIcon';
import ArrowUpIcon from '@pingux/mdi-react/ArrowUpIcon';
import CardAccountDetailsOutlineIcon from '@pingux/mdi-react/CardAccountDetailsOutlineIcon';
import ChatIcon from '@pingux/mdi-react/ChatIcon';
import DefaultCircle from '@pingux/mdi-react/CheckboxBlankCircleOutlineIcon';
import CheckCircleOutlineIcon from '@pingux/mdi-react/CheckCircleOutlineIcon';
import ChevronDownIcon from '@pingux/mdi-react/ChevronDownIcon';
import ChevronUpIcon from '@pingux/mdi-react/ChevronUpIcon';
import Clipboard from '@pingux/mdi-react/ClipboardIcon';
import CloseOctagonOutlineIcon from '@pingux/mdi-react/CloseOctagonOutlineIcon';
import CreateOutlineIcon from '@pingux/mdi-react/CreateOutlineIcon';
import DotsHorizontalIcon from '@pingux/mdi-react/DotsHorizontalIcon';
import EmoticonHappy from '@pingux/mdi-react/EmoticonHappyOutlineIcon';
import FileTreeIcon from '@pingux/mdi-react/FileTreeOutlineIcon';
import Fingerprint from '@pingux/mdi-react/FingerprintIcon';
import GlobeIcon from '@pingux/mdi-react/GlobeIcon';
import InformationOutlineIcon from '@pingux/mdi-react/InformationOutlineIcon';
import KeyOutline from '@pingux/mdi-react/KeyOutlineIcon';
import OpenInNew from '@pingux/mdi-react/OpenInNewIcon';
import PaletteOutlineIcon from '@pingux/mdi-react/PaletteOutlineIcon';
import PlayCircleOutline from '@pingux/mdi-react/PlayCircleOutlineIcon';
import RocketLaunchIcon from '@pingux/mdi-react/RocketLaunchIcon';
import ScaleBalance from '@pingux/mdi-react/ScaleBalanceIcon';
import Settings from '@pingux/mdi-react/SettingsOutlineIcon';
import ShieldStarOutlineIcon from '@pingux/mdi-react/ShieldStarOutlineIcon';
import ShowChartIcon from '@pingux/mdi-react/ShowChartIcon';
import TransitConnection from '@pingux/mdi-react/TransitConnectionVariantIcon';
import ViewDashboard from '@pingux/mdi-react/ViewDashboardIcon';
import DashboardIcon from '@pingux/mdi-react/ViewDashboardOutlineIcon';
import WidgetsOutlineIcon from '@pingux/mdi-react/WidgetsOutlineIcon';

import { pingLogoHorizontalSmall } from '../../../../utils/devUtils/constants/logos';
import statuses, { statusIcon } from '../../../../utils/devUtils/constants/statuses';
import { Aic, PamIcon, Protect } from '../../astro/customProperties/navBarIcons';

const icons = {
  [statuses.DEFAULT]: InformationOutlineIcon,
  [statuses.ERROR]: AlertCircleOutlineIcon,
  [statuses.SUCCESS]: CheckCircleOutlineIcon,
  [statuses.WARNING]: AlertOutlineIcon,
  [statusIcon.CRITICAL]: AlertCircleOutlineIcon,
  [statusIcon.FATAL]: CloseOctagonOutlineIcon,
  [statusIcon.INFO]: InformationOutlineIcon,
  [statusIcon.MAJOR]: ArrowUpIcon,
  [statusIcon.MINOR]: ArrowDownIcon,
  [statusIcon.WARNING_NEUTRAL]: AlertOutlineIcon,
  aic: Aic,
  applicationsIcon: AppsIcon,
  Ascending: ArrowUpIcon,
  authenticationIcon: CheckCircleOutlineIcon,
  clipboard: Clipboard,
  CreateIcon: CreateOutlineIcon,
  daVinci: FileTreeIcon,
  DefaultCircle,
  Descending: ArrowDownIcon,
  ErrorCircle: AlertCircleOutlineIcon,
  integrationsIcon: WidgetsOutlineIcon,
  listViewMenu: DotsHorizontalIcon,
  mdiAccountCog,
  mdiAccountMultiple: AccountMultipleOutlineIcon,
  mdiEarth: Settings,
  mdiEmoticonHappyOutline: EmoticonHappy,
  mdiFingerprint: Fingerprint,
  mdiPlayCircleIcon: PlayCircleOutline,
  mdiScaleBalance: ScaleBalance,
  mdiShoCard: CardAccountDetailsOutlineIcon,
  mdiTransitConnectionVariant: TransitConnection,
  mdiViewDashboard: ViewDashboard,
  mdiWeb: GlobeIcon,
  MenuDown: ChevronDownIcon,
  MenuUp: ChevronUpIcon,
  monitoringIcon: ShowChartIcon,
  openInNew: OpenInNew,
  overviewIcon: DashboardIcon,
  p1verify: AccountCheckIcon,
  pam: PamIcon,
  PingAuthorize: KeyOutline,
  pingLogoHorizontalSmall,
  protect: Protect,
  rocketLaunchIcon: RocketLaunchIcon,
  shareFeedbackIcon: ChatIcon,
  shieldStar: ShieldStarOutlineIcon,
  SuccessCircle: CheckCircleOutlineIcon,
  userExperienceIcon: PaletteOutlineIcon,
  WarningIcon: AlertOutlineIcon,
};

export default icons;
