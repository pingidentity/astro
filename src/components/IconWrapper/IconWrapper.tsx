import React, { forwardRef, useMemo } from 'react';

import { useGetTheme, useStatusClasses, useTShirtSize } from '../../hooks';
import { Box, Icon } from '../../index';
import { IconWrapperProps } from '../../types';
import { avatarColors } from '../Avatar/constants';
import getColorFromUUID from '../Avatar/getColorFromUuid';

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
    colorId,
    sx,
  } = props;
  const theme = useGetTheme();

  const safeColorId = colorId || '_INTERNAL_DEFAULT_ID_';

  if (process.env.NODE_ENV !== 'production') {
    if (!color && !colorId) {
      console.warn(
        "[Astro] IconWrapper: No 'color' or 'colorId' provided. "
        + 'The component is falling back to a default generated color.',
      );
    }
  }

  const finalColor = useMemo(() => {
    if (color) return color;
    return getColorFromUUID(safeColorId, avatarColors);
  }, [color, safeColorId]);

  const { sizeProps } = useTShirtSize({ size, sizes: theme.iconWrapperSizes });

  const { classNames } = useStatusClasses(className, {
    isCircle,
  });

  return (
    <Box
      ref={ref}
      variant={`iconWrapper.${size}`}
      sx={{
        backgroundColor: `iconWrapper.wrapper.${finalColor}`,
        ...sx,
      }}
      className={classNames}
      justifyContent="center"
      alignItems="center"
      {...wrapperProps}
    >
      <Icon
        icon={icon}
        size={sizeProps.size}
        title={title}
        color={`iconWrapper.icon.${finalColor}`}
        {...iconProps}
      />
    </Box>
  );
});

export default IconWrapper;
