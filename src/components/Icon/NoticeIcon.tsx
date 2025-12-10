import React from 'react';
import AlertCircleIcon from '@pingux/mdi-react/AlertCircleIcon';
import AlertIcon from '@pingux/mdi-react/AlertIcon';
import CheckCircleIcon from '@pingux/mdi-react/CheckCircleIcon';
import InformationIcon from '@pingux/mdi-react/InformationIcon';

import { Icon } from '../..';
import useGetTheme from '../../hooks/useGetTheme';
import { IconProps, Status } from '../../types';
import statuses from '../../utils/devUtils/constants/statuses';

export const noticeIcons = {
  [statuses.DEFAULT]: { icon: InformationIcon, testid: 'default-icon-testid', name: 'Information Icon' },
  [statuses.ERROR]: { icon: AlertCircleIcon, testid: 'error-icon-testid', name: 'Alert Circle Icon' },
  [statuses.SUCCESS]: { icon: CheckCircleIcon, testid: 'success-icon-testid', name: 'Check Circle Icon' },
  [statuses.WARNING]: { icon: AlertIcon, testid: 'warning-icon-testid', name: 'Alert Icon' },
};

interface NoticeIconProps extends Omit<IconProps, 'icon'> {
  status?: Status,
}

export const NoticeIcon: React.FC<NoticeIconProps> = ({
  status = statuses.DEFAULT,
  ...others
}) => {
  const { icons } = useGetTheme();

  return (
    <Icon
      data-testid={noticeIcons[status].testid}
      title={{ name: noticeIcons[status].name }}
      icon={icons[status]}
      {...others}
    />
  );
};
