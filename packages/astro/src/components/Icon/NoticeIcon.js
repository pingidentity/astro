import React from 'react';
import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import AlertIcon from '@pingux/mdi-react/AlertIcon';
import CheckCircleIcon from '@pingux/mdi-react/CheckCircleIcon';
import InformationIcon from '@pingux/mdi-react/InformationIcon';

import { Icon } from '../..';
import statuses from '../../utils/devUtils/constants/statuses';
import { statusPropTypes } from '../../utils/docUtils/statusProp';

export const noticeIcons = {
  [statuses.DEFAULT]: { icon: InformationIcon, testid: 'default-icon-testid', name: 'Information Icon' },
  [statuses.ERROR]: { icon: AlertCircleIcon, testid: 'error-icon-testid', name: 'Alert Circle Icon' },
  [statuses.SUCCESS]: { icon: CheckCircleIcon, testid: 'success-icon-testid', name: 'Check Circle Icon' },
  [statuses.WARNING]: { icon: AlertIcon, testid: 'warning-icon-testid', name: 'Alert Icon' },
};

export const NoticeIcon = ({
  status = statuses.DEFAULT,
  ...others
}) => (
  <Icon
    data-testid={noticeIcons[status].testid}
    icon={noticeIcons[status].icon}
    title={{ name: noticeIcons[status].name }}
    {...others}
  />
);


NoticeIcon.propTypes = {
  ...statusPropTypes,
};
