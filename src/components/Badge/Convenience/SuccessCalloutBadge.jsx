import React from 'react';

import { Badge, Icon } from '../../..';
import { useGetTheme } from '../../../hooks';

const SuccessCalloutBadge = React.forwardRef((props, ref) => {
  const { icons } = useGetTheme();

  return (
    <Badge
      ref={ref}
      variant="successCalloutBadge"
      slots={{
        leftIcon: <Icon icon={icons.successCalloutBadge} size="xs" />,
      }}
      {...props}
    />
  );
});

export default SuccessCalloutBadge;
