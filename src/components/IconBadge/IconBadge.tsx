import React, { forwardRef } from 'react';

import { Box } from '../../index';
import { IconBadgeProps } from '../../types';

const IconBadge = forwardRef<HTMLElement, IconBadgeProps>((props, ref) => {
  const {
    children,
    sx,
    circleColor,
    baseSize,
    circleSize,
    ...others
  } = props;

  const [firstIcon, secondIcon] = React.Children.toArray(children);

  return (
    <Box
      ref={ref}
      as="span"
      sx={{
        position: 'relative',
        height: `${baseSize}px`,
        width: `${baseSize}px`,
        display: 'flex',
        alignItems: 'top',
        ...sx,
      }}
      {...others}
    >
      {firstIcon}
      <Box
        as="span"
        sx={{
          position: 'absolute',
          bottom: '-5.5px',
          right: '1px',
          borderRadius: `${circleSize !== undefined && circleSize / 2}px`,
          height: `${circleSize}px`,
          width: `${circleSize}px`,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: circleColor,
        }}
      >
        {secondIcon}
      </Box>
    </Box>
  );
});

IconBadge.defaultProps = {
  circleColor: 'white',
};

export default IconBadge;
