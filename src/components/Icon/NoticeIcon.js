import React from 'react';
import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import AlertIcon from 'mdi-react/AlertIcon';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import InformationIcon from 'mdi-react/InformationIcon';

import { Icon } from '../..';
import statuses from '../../utils/devUtils/constants/statuses';
import { statusPropTypes } from '../../utils/docUtils/statusProp';

export const noticeIcons = {
  [statuses.DEFAULT]: { icon: InformationIcon, testid: 'default-icon-testid' },
  [statuses.ERROR]: { icon: AlertCircleIcon, testid: 'error-icon-testid' },
  [statuses.SUCCESS]: { icon: CheckCircleIcon, testid: 'success-icon-testid' },
  [statuses.WARNING]: { icon: AlertIcon, testid: 'warning-icon-testid' },
};

export const NoticeIcon = ({
  status = statuses.DEFAULT,
  ...others
}) => (
  <Icon
    data-testid={noticeIcons[status].testid}
    icon={noticeIcons[status].icon}
    {...others}
  />
);


NoticeIcon.propTypes = {
  ...statusPropTypes,
};
