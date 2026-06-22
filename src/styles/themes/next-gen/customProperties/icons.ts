import React from 'react';
import EmoticonHappy from '@pingux/mdi-react/EmoticonHappyOutlineIcon';
import Settings from '@pingux/mdi-react/SettingsOutlineIcon';
import ShieldStarOutlineIcon from '@pingux/mdi-react/ShieldStarOutlineIcon';
import ShowChartIcon from '@pingux/mdi-react/ShowChartIcon';
import TransitConnection from '@pingux/mdi-react/TransitConnectionVariantIcon';

import { pingLogoHorizontalSmall } from '../../../../utils/devUtils/constants/logos';
import statuses, { statusIcon } from '../../../../utils/devUtils/constants/statuses';
import { Aic, PamIcon, Protect } from '../../astro/customProperties/navBarIcons';

const icons = {
  [statuses.DEFAULT]: 'info',
  [statuses.ERROR]: 'error',
  [statuses.SUCCESS]: 'check_circle',
  [statuses.WARNING]: 'warning',
  [statusIcon.CRITICAL]: 'error',
  [statusIcon.FATAL]: 'dangerous',
  [statusIcon.INFO]: 'info',
  [statusIcon.MAJOR]: 'arrow_upward',
  [statusIcon.MINOR]: 'arrow_downward',
  [statusIcon.WARNING_NEUTRAL]: 'warning',
  aic: Aic,
  applicationsIcon: 'apps',
  Ascending: 'arrow_upward',
  authenticationIcon: 'check_circle',
  clipboard: 'content_paste',
  CreateIcon: 'edit',
  daVinci: 'account_tree',
  DefaultCircle: 'circle',
  Descending: 'arrow_downward',
  popoverMenuIcon: 'more_horiz',
  ErrorCircle: 'error',
  HomeIcon: 'home',
  integrationsIcon: 'widgets',
  listViewMenu: 'more_horiz',
  mdiAccountCog: 'manage_accounts',
  mdiAccountMultiple: 'group',
  mdiEarth: Settings,
  mdiEmoticonHappyOutline: EmoticonHappy,
  mdiFingerprint: 'fingerprint',
  mdiPlayCircleIcon: 'play_circle',
  mdiScaleBalance: 'balance',
  mdiShoCard: 'id_card',
  mdiTransitConnectionVariant: TransitConnection,
  mdiViewDashboard: 'dashboard',
  mdiWeb: 'globe',
  MenuDown: 'keyboard_arrow_down',
  MenuUp: 'keyboard_arrow_up',
  monitoringIcon: ShowChartIcon,
  openInNew: 'open_in_new',
  overviewIcon: 'dashboard',
  p1verify: 'person_check',
  pam: PamIcon,
  PingAuthorize: 'key',
  pingLogoHorizontalSmall,
  protect: Protect,
  rocketLaunchIcon: 'rocket_launch',
  shareFeedbackIcon: 'chat',
  shieldStar: ShieldStarOutlineIcon,
  SuccessCircle: 'check_circle',
  userExperienceIcon: 'palette',
  WarningIcon: 'warning',
  CameraOutlineIcon: 'photo_camera',
  ImageOutlineIcon: 'image',
  helpHint: 'help_outline',
  ModalCloseIcon: 'close',
};

export default icons;
