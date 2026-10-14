import React from 'react';

import { Badge, Icon } from '../../..';
import { useGetTheme } from '../../../hooks';
import { CalloutBadgeProps } from '../../../types';

const InfoCalloutBadge = React.forwardRef<HTMLDivElement, CalloutBadgeProps>((props, ref) => {
  const { icons } = useGetTheme();

  return (
    <Badge
      ref={ref}
      variant="infoCalloutBadge"
      slots={{
        leftIcon: <Icon icon={icons.infoCalloutBadge} size="xs" />,
      }}
      {...props}
    />
  );
});

export default InfoCalloutBadge;
