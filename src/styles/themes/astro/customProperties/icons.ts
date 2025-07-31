import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import AlertCircleOutlineIcon from '@pingux/mdi-react/AlertCircleOutlineIcon';
import AlertIcon from '@pingux/mdi-react/AlertIcon';
import AlertOutlineIcon from '@pingux/mdi-react/AlertOutlineIcon';
import ArrowDownIcon from '@pingux/mdi-react/ArrowDownIcon';
import ArrowUpIcon from '@pingux/mdi-react/ArrowUpIcon';
import CheckCircleIcon from '@pingux/mdi-react/CheckCircleIcon';
import CloseOctagonOutlineIcon from '@pingux/mdi-react/CloseOctagonOutlineIcon';
import InformationIcon from '@pingux/mdi-react/InformationIcon';
import InformationOutlineIcon from '@pingux/mdi-react/InformationOutlineIcon';
import MenuDown from '@pingux/mdi-react/MenuDownIcon';
import MenuUp from '@pingux/mdi-react/MenuUpIcon';
import MoreVertIcon from '@pingux/mdi-react/MoreVertIcon';

import { pingLogoHorizontalSmallWhite } from '../../../../utils/devUtils/constants/logos';
import statuses, { statusIcon } from '../../../../utils/devUtils/constants/statuses';

export default {
  MenuDown,
  MenuUp,
  [statuses.DEFAULT]: InformationIcon,
  [statuses.ERROR]: AlertCircleIcon,
  [statuses.SUCCESS]: CheckCircleIcon,
  [statuses.WARNING]: AlertIcon,
  [statusIcon.INFO]: InformationOutlineIcon,
  [statusIcon.CRITICAL]: AlertCircleOutlineIcon,
  [statusIcon.MAJOR]: ArrowUpIcon,
  [statusIcon.MINOR]: ArrowDownIcon,
  [statusIcon.WARNING_NEUTRAL]: AlertOutlineIcon,
  [statusIcon.FATAL]: CloseOctagonOutlineIcon,
  pingLogoHorizontalSmall: pingLogoHorizontalSmallWhite,
  listViewMenu: MoreVertIcon,
};
