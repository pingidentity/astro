import React from 'react';
import Alert from '@pingux/mdi-react/AlertIcon';

import { Badge, Icon } from '../../..';

const WarningCalloutBadge = React.forwardRef((props, ref) => {
  return (
    <Badge
      ref={ref}
      variant="warningCalloutBadge"
      slots={{
        leftIcon: <Icon icon={Alert} size={15} color="#E86900" />,
      }}
      {...props}
    />
  );
});

export default WarningCalloutBadge;
