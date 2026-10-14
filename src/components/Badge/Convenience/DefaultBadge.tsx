import React from 'react';

import { Badge } from '../../..';
import { useGetTheme } from '../../../hooks';
import { DefaultBadgeProps } from '../../../types';

const DefaultBadge = React.forwardRef<HTMLDivElement, DefaultBadgeProps>((props, ref) => {
  const { themeState: { isOnyx } } = useGetTheme();

  return (
    <Badge ref={ref} label="Default" isUppercase={!isOnyx} variant="convenienceDefault" {...props} />
  );
});

export default DefaultBadge;
