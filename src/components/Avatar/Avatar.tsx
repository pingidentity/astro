import React, { forwardRef, useMemo } from 'react';
import { Avatar as ThemeUIAvatar, Box } from 'theme-ui';

import { useStatusClasses } from '../../hooks';
import { AvatarProps } from '../../types/avatar';

import { avatarColors } from './constants';
import getColorFromUUID from './getColorFromUuid';

const Avatar = forwardRef<HTMLImageElement, AvatarProps>((props, ref) => {
  const {
    alt = 'Avatar',
    defaultText = 'AA',
    color,
    colorId,
    className,
    size = 'sm',
    src,
    sx,
    children,
    isSquare,
    isLogo,
    ...others
  } = props;

  const safeColorId = colorId || '_INTERNAL_DEFAULT_ID_';

  if (process.env.NODE_ENV !== 'production') {
    if (!src && !color && !colorId) {
      console.warn(
        "[Astro] Avatar: No 'src', 'color', or 'colorId' provided. "
        + 'The component is falling back to a default generated color.',
      );
    }
  }

  const finalColor = useMemo(() => {
    if (color) return color;
    return getColorFromUUID(safeColorId, avatarColors);
  }, [color, safeColorId]);

  const { classNames } = useStatusClasses(className, {
    [`is-${finalColor}`]: finalColor,
    [`size-${size}`]: size,
    [`font-size-${size}`]: src ? false : size,
    'is-square': isSquare,
    'is-image': src,
    'is-logo': isLogo,
  });

  if (src) {
    return (
      <Box
        variant="avatar"
        className={classNames}
        {...others}
      >
        <ThemeUIAvatar
          ref={ref}
          alt={alt}
          src={src}
          size={size}
        />
      </Box>
    );
  }

  return (
    <Box
      variant="avatar"
      className={classNames}
      sx={{
        size,
        fontSize: size,
        ...sx,
      }}
      {...others}
    >
      {children || defaultText}
    </Box>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
