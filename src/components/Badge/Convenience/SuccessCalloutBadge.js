import React from 'react';
import CheckCircle from '@pingux/mdi-react/CheckCircleIcon';

import { Badge, Icon } from '../../..';

const SuccessCalloutBadge = React.forwardRef((props, ref) => {
  return (
    <Badge
      ref={ref}
      variant="successCalloutBadge"
      slots={{
        leftIcon: <Icon icon={CheckCircle} size={15} color="success.bright" />,
      }}
      {...props}
    />
  );
});

export default SuccessCalloutBadge;
