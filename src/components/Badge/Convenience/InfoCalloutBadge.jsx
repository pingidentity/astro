import React from 'react';

import { Badge, Icon } from '../../..';
import { useGetTheme } from '../../../hooks';

const InfoCalloutBadge = React.forwardRef((props, ref) => {
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
