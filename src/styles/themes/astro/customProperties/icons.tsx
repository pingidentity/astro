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
import CameraAltIcon from '@pingux/mdi-react/CameraAltIcon';
import ChatIcon from '@pingux/mdi-react/ChatIcon';
import DefaultCircle from '@pingux/mdi-react/CheckboxBlankCircleOutlineIcon';
import CheckCircleIcon from '@pingux/mdi-react/CheckCircleIcon';
import CheckCircleOutlineIcon from '@pingux/mdi-react/CheckCircleOutlineIcon';
import Clipboard from '@pingux/mdi-react/ClipboardIcon';
import CloseIcon from '@pingux/mdi-react/CloseIcon';
import CloseOctagonOutlineIcon from '@pingux/mdi-react/CloseOctagonOutlineIcon';
import ConnectionIcon from '@pingux/mdi-react/ConnectionIcon';
import CreateIcon from '@pingux/mdi-react/CreateIcon';
import Earth from '@pingux/mdi-react/EarthIcon';
import EmoticonHappy from '@pingux/mdi-react/EmoticonHappyOutlineIcon';
import Fingerprint from '@pingux/mdi-react/FingerprintIcon';
import GlobeIcon from '@pingux/mdi-react/GlobeIcon';
import HomeIcon from '@pingux/mdi-react/HomeIcon';
import ImageFilterHdrIcon from '@pingux/mdi-react/ImageFilterHdrIcon';
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
import { v4 as uuid } from 'uuid';

import { pingLogoHorizontalSmallWhite } from '../../../../utils/devUtils/constants/logos';
import statuses, { statusIcon } from '../../../../utils/devUtils/constants/statuses';

import { Aic, Credentials, DaVinci, PamIcon, Protect, Verify } from './navBarIcons';

const HelpIcon = () => {
  const uid = uuid();
  return (
    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby={uid}>
      <title id={uid}>Help Icon</title>
      <path d="M2.56685 7.306V9H4.29385V7.306H2.56685ZM0.795848 3.676H2.41285C2.41285 3.478 2.43485 3.29467 2.47885 3.126C2.52285 2.95 2.58885 2.79967 2.67685 2.675C2.77218 2.543 2.88951 2.44033 3.02885 2.367C3.17551 2.28633 3.34785 2.246 3.54585 2.246C3.83918 2.246 4.06651 2.32667 4.22785 2.488C4.39651 2.64933 4.48085 2.89867 4.48085 3.236C4.48818 3.434 4.45151 3.599 4.37085 3.731C4.29751 3.863 4.19851 3.984 4.07385 4.094C3.94918 4.204 3.81351 4.314 3.66685 4.424C3.52018 4.534 3.38085 4.666 3.24885 4.82C3.11685 4.96667 2.99951 5.14633 2.89685 5.359C2.80151 5.57167 2.74285 5.83567 2.72085 6.151V6.646H4.20585V6.228C4.23518 6.008 4.30485 5.82467 4.41485 5.678C4.53218 5.53133 4.66418 5.403 4.81085 5.293C4.95751 5.17567 5.11151 5.062 5.27285 4.952C5.44151 4.83467 5.59185 4.69533 5.72385 4.534C5.86318 4.37267 5.97685 4.17833 6.06485 3.951C6.16018 3.72367 6.20785 3.434 6.20785 3.082C6.20785 2.86933 6.16018 2.642 6.06485 2.4C5.97685 2.15067 5.82651 1.91967 5.61385 1.707C5.40118 1.49433 5.11885 1.31833 4.76685 1.179C4.42218 1.03233 3.98951 0.959 3.46885 0.959C3.06551 0.959 2.69885 1.02867 2.36885 1.168C2.04618 1.3 1.76751 1.487 1.53285 1.729C1.30551 1.971 1.12585 2.257 0.993848 2.587C0.869181 2.917 0.803181 3.28 0.795848 3.676Z" fill="#3B4A58" />
    </svg>
  );
};

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
  HomeIcon,
  pingLogoHorizontalSmall: pingLogoHorizontalSmallWhite,
  protect: Protect,
  rocketLaunchIcon: RocketLaunchIcon,
  shareFeedbackIcon: ChatIcon,
  shieldStar: ShieldStarOutlineIcon,
  SuccessCircle: CheckCircleIcon,
  userExperienceIcon: MonitorScreenshotIcon,
  WarningIcon,
  CameraOutlineIcon: CameraAltIcon,
  ImageOutlineIcon: ImageFilterHdrIcon,
  helpHint: HelpIcon,
  ModalCloseIcon: CloseIcon,
};
