import AlertCircleOutlineIcon from '@pingux/mdi-react/AlertCircleOutlineIcon';
import AlertOutlineIcon from '@pingux/mdi-react/AlertOutlineIcon';
import ArrowDownIcon from '@pingux/mdi-react/ArrowDownIcon';
import ArrowUpIcon from '@pingux/mdi-react/ArrowUpIcon';
import CheckCircleOutlineIcon from '@pingux/mdi-react/CheckCircleOutlineIcon';
import ChevronDownIcon from '@pingux/mdi-react/ChevronDownIcon';
import ChevronUpIcon from '@pingux/mdi-react/ChevronUpIcon';
import CloseOctagonOutlineIcon from '@pingux/mdi-react/CloseOctagonOutlineIcon';
import DotsHorizontalIcon from '@pingux/mdi-react/DotsHorizontalIcon';
import InformationOutlineIcon from '@pingux/mdi-react/InformationOutlineIcon';

import { pingLogoHorizontalSmall } from '../../../../utils/devUtils/constants/logos';
import statuses, { statusIcon } from '../../../../utils/devUtils/constants/statuses';

export default {
  MenuDown: ChevronDownIcon,
  MenuUp: ChevronUpIcon,
  [statuses.DEFAULT]: InformationOutlineIcon,
  [statuses.ERROR]: AlertCircleOutlineIcon,
  [statuses.SUCCESS]: CheckCircleOutlineIcon,
  [statuses.WARNING]: AlertOutlineIcon,
  [statusIcon.INFO]: InformationOutlineIcon,
  [statusIcon.CRITICAL]: AlertCircleOutlineIcon,
  [statusIcon.MAJOR]: ArrowUpIcon,
  [statusIcon.MINOR]: ArrowDownIcon,
  [statusIcon.WARNING_NEUTRAL]: AlertOutlineIcon,
  [statusIcon.FATAL]: CloseOctagonOutlineIcon,
  pingLogoHorizontalSmall,
  listViewMenu: DotsHorizontalIcon,
  Ascending: ArrowUpIcon,
  Descending: ArrowDownIcon,
};
