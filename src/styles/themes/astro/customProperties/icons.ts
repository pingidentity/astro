import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import AlertIcon from '@pingux/mdi-react/AlertIcon';
import CheckCircleIcon from '@pingux/mdi-react/CheckCircleIcon';
import InformationIcon from '@pingux/mdi-react/InformationIcon';
import MenuDown from '@pingux/mdi-react/MenuDownIcon';
import MenuUp from '@pingux/mdi-react/MenuUpIcon';

import { pingLogoHorizontalSmallWhite } from '../../../../utils/devUtils/constants/logos';
import statuses from '../../../../utils/devUtils/constants/statuses';

export default {
  MenuDown,
  MenuUp,
  [statuses.DEFAULT]: InformationIcon,
  [statuses.ERROR]: AlertCircleIcon,
  [statuses.SUCCESS]: CheckCircleIcon,
  [statuses.WARNING]: AlertIcon,
  pingLogoHorizontalSmall: pingLogoHorizontalSmallWhite,
};
