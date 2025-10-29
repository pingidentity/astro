import React from 'react';
import AlertCircle from '@pingux/mdi-react/AlertCircleIcon';

import { Badge, Icon } from '../../..';

const ErrorCalloutBadge = React.forwardRef((props, ref) => {
  return (
    <Badge
      ref={ref}
      variant="errorCalloutBadge"
      slots={{
        leftIcon: <Icon icon={AlertCircle} size={15} color="critical.bright" />,
      }}
      {...props}
    />
  );
});

export default ErrorCalloutBadge;
