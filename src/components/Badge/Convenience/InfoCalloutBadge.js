import React from 'react';
import Information from '@pingux/mdi-react/InformationIcon';

import { Badge, Icon } from '../../..';

const InfoCalloutBadge = React.forwardRef((props, ref) => {
  return (
    <Badge
      ref={ref}
      variant="infoCalloutBadge"
      slots={{
        leftIcon: <Icon icon={Information} size={15} color="text.secondary" />,
      }}
      {...props}
    />
  );
});

export default InfoCalloutBadge;
