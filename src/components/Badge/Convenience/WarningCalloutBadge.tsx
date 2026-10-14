import React from 'react';

import { Badge, Icon } from '../../..';
import { useGetTheme } from '../../../hooks';
import { CalloutBadgeProps } from '../../../types';

const WarningCalloutBadge = React.forwardRef<HTMLDivElement, CalloutBadgeProps>((props, ref) => {
  const { icons } = useGetTheme();

  return (
    <Badge
      ref={ref}
      variant="warningCalloutBadge"
      slots={{
        leftIcon: <Icon icon={icons.warningCalloutBadge} size="xs" />,
      }}
      {...props}
    />
  );
});

export default WarningCalloutBadge;
