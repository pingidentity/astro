import React from 'react';

import { Badge, Icon } from '../../..';
import { useGetTheme } from '../../../hooks';
import { CalloutBadgeProps } from '../../../types';

const ErrorCalloutBadge = React.forwardRef<HTMLDivElement, CalloutBadgeProps>((props, ref) => {
  const { icons } = useGetTheme();

  return (
    <Badge
      ref={ref}
      variant="errorCalloutBadge"
      slots={{
        leftIcon: <Icon icon={icons.errorCalloutBadge} size="xs" />,
      }}
      {...props}
    />
  );
});

export default ErrorCalloutBadge;
