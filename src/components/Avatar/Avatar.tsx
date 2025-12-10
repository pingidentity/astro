import React, { forwardRef } from 'react';
import { Avatar as ThemeUIAvatar, Box } from 'theme-ui';

import { useStatusClasses } from '../../hooks';
import { AvatarProps } from '../../types/avatar';

const Avatar = forwardRef<HTMLImageElement, AvatarProps>((props, ref) => {
  const {
    alt = 'Avatar',
    defaultText = 'AA',
    color,
    className,
    size = 'sm',
    src,
    sx,
    children,
    isSquare,
    isLogo,
    ...others
  } = props;

  const { classNames } = useStatusClasses(className, {
    [`is-${color}`]: color,
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
      >
        <ThemeUIAvatar
          ref={ref}
          alt={alt}
          src={src}
          {...others}
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
