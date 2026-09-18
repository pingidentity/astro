import React from 'react';

import { Badge } from '../../..';
import { useGetTheme } from '../../../hooks';

const DefaultBadge = React.forwardRef((props, ref) => {
  const { themeState: { isOnyx } } = useGetTheme();

  return (
    <Badge ref={ref} label="Default" isUppercase={!isOnyx} variant="convenienceDefault" {...props} />
  );
});

export default DefaultBadge;
