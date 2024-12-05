import React, { forwardRef } from 'react';

import { useStatusClasses, useTShirtSize } from '../../hooks';
import { Box, Icon } from '../../index';
import { IconWrapperProps } from '../../types';
import { iconWrapperSizes } from '../../utils/devUtils/constants/tShirtSizes';

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

  const { sizeProps } = useTShirtSize({ ...{ size, sizes: iconWrapperSizes } });

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
