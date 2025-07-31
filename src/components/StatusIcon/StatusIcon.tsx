import React from 'react';

import { Box, Icon } from '../..';
import { useGetTheme, useStatusClasses } from '../../hooks';
import type { IconProps } from '../../types';

export type Status = 'default' | 'warning' | 'info' | 'critical' | 'major' | 'minor' | 'warningNeutral' | 'fatal';
export interface StatusIconProps {
  'data-testid'?: string;
  status?: Status;
  className?: string;
  isSelected?: boolean;
  iconProps?: IconProps
}

const StatusIcon = (props:StatusIconProps) => {
  const {
    status = 'default',
    className,
    isSelected,
    iconProps,
    ...others
  } = props;

  const { icons } = useGetTheme();

  const { classNames } = useStatusClasses(className, {
    'status-icon': true,
    [`is-${status}`]: true,
    'is-selected': isSelected,
  });

  return (
    <Box variant="statusIcon.base" className={classNames} {...others}>
      <Icon
        icon={icons[status]}
        data-testid={`status-icon-${status}`}
        {...iconProps}
      />
    </Box>
  );
};

StatusIcon.displayName = 'StatusIcon';
export default StatusIcon;
