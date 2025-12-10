import React, { forwardRef } from 'react';

import { useGetTheme, useStatusClasses, useTShirtSize } from '../../hooks';
import { Box, Icon } from '../../index';
import { IconWrapperProps } from '../../types';

const IconWrapper = forwardRef<HTMLElement, IconWrapperProps>((props, ref) => {
  const {
    icon,
    iconProps,
    wrapperProps,
    color,
    size,
    title,
    className,
    isCircle,
    sx,
  } = props;
  const theme = useGetTheme();

  const { sizeProps } = useTShirtSize({ size, sizes: theme.iconWrapperSizes });

  const { classNames } = useStatusClasses(className, {
    isCircle,
  });

  return (
    <Box
      ref={ref}
      variant={`iconWrapper.${size}`}
      sx={{
        backgroundColor: `iconWrapper.wrapper.${color}`,
        ...sx,
      }}
      className={classNames}
      {...wrapperProps}
    >
      <Icon
        icon={icon}
        size={sizeProps.size}
        title={title}
        color={`iconWrapper.icon.${color}`}
        {...iconProps}
      />
    </Box>
  );
});

export default IconWrapper;
