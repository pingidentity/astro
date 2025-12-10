import React from 'react';

import { Badge } from '../../..';

const DefaultBadge = React.forwardRef((props, ref) => {
  return (
    <Badge ref={ref} label="default" isUppercase variant="convenienceDefault" {...props} />
  );
});

export default DefaultBadge;
