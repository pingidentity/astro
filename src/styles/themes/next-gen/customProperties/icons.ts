import AlertCircleOutlineIcon from '@pingux/mdi-react/AlertCircleOutlineIcon';
import AlertOutlineIcon from '@pingux/mdi-react/AlertOutlineIcon';
import CheckCircleOutlineIcon from '@pingux/mdi-react/CheckCircleOutlineIcon';
import ChevronDownIcon from '@pingux/mdi-react/ChevronDownIcon';
import ChevronUpIcon from '@pingux/mdi-react/ChevronUpIcon';
import InformationOutlineIcon from '@pingux/mdi-react/InformationOutlineIcon';

import { pingLogoHorizontalSmall } from '../../../../utils/devUtils/constants/logos';
import statuses from '../../../../utils/devUtils/constants/statuses';

export default {
  MenuDown: ChevronDownIcon,
  MenuUp: ChevronUpIcon,
  [statuses.DEFAULT]: InformationOutlineIcon,
  [statuses.ERROR]: AlertCircleOutlineIcon,
  [statuses.SUCCESS]: CheckCircleOutlineIcon,
  [statuses.WARNING]: AlertOutlineIcon,
  pingLogoHorizontalSmall,
};
