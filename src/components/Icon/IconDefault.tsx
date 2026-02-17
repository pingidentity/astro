import React, { forwardRef } from 'react';

import { useGetTheme, useTShirtSize } from '../../hooks';
import { IconProps } from '../../types';
import Box from '../Box';

const IconDefault = forwardRef<HTMLElement, IconProps>((props, ref) => {
  const theme = useGetTheme();

  const {
    color,
    icon: IconComponent,
    sx,
    size = theme.defaultIconSize,
    variant,
    title,
    ...others
  } = props;

  const { sizeProps } = useTShirtSize({ size, sizes: theme.tShirtSizes });

  const { defaultIconColor } = theme;

  const resolvedTitle = title ?? (
    typeof IconComponent === 'object' && 'type' in IconComponent
      ? { name: IconComponent.type.name }
      : ''
  );

  return (
    <Box
      as={IconComponent}
      ref={ref}
      role="img"
      title={resolvedTitle}
      variant={variant}
      size={sizeProps.size}
      sx={{
        fill: color || defaultIconColor,
        minWidth: sizeProps.size,
        ...sx,
      }}
      {...others}
    />
  );
});

IconDefault.displayName = 'Icon';

export default IconDefault;
