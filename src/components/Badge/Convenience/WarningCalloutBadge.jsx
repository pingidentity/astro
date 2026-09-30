import React from 'react';

import { Badge, Icon } from '../../..';
import { useGetTheme } from '../../../hooks';

const WarningCalloutBadge = React.forwardRef((props, ref) => {
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
