import React, { forwardRef } from 'react';

import { useGetTheme, useTShirtSize } from '../../hooks';
import { IconProps } from '../../types';
import Box from '../Box';

const IconSymbol = forwardRef<HTMLElement, IconProps>((props, ref) => {
  const theme = useGetTheme();

  const { icon = 'disabled_by_default',
    className,
    title,
    size = theme.defaultIconSize,
    color = theme.defaultIconColor,
    hasFill,
    ...rest } = props;

  const { sizeProps } = useTShirtSize({ size, sizes: theme.tShirtSizes });

  return (
    <Box
      as="span"
      ref={ref}
      className={`material-symbols-outlined ${className || ''}`}
      title={title?.name}
      {...rest}
      sx={{
        ...rest.sx,
        color,
        fontSize: sizeProps.size,
        fontVariationSettings: hasFill ? "'FILL' 1" : "'FILL' 0",
      }}
    >
      {icon as string}
    </Box>
  );
});

IconSymbol.displayName = 'Icon';

export default IconSymbol;
