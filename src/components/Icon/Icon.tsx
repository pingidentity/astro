import React, { forwardRef } from 'react';

import { useGetTheme, useTShirtSize } from '../../hooks';
import { IconProps } from '../../types';
import Box from '../Box';

const Icon = forwardRef<HTMLElement, IconProps>((props, ref) => {
  const {
    color,
    icon: IconComponent,
    sx,
    size = 'sm',
    variant,
    title,
    ...others
  } = props;

  const theme = useGetTheme();
  const { sizeProps } = useTShirtSize({ size, sizes: theme.tShirtSizes });

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
        fill: color,
        minWidth: sizeProps.size,
        ...sx,
      }}
      {...others}
    />
  );
});

Icon.displayName = 'Icon';

export default Icon;
