import React, { forwardRef } from 'react';
import { Avatar as ThemeUIAvatar, Box } from 'theme-ui';

import { useStatusClasses } from '../../hooks';
import sizes from '../../styles/themes/next-gen/sizes';
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
    ...others
  } = props;

  const { classNames } = useStatusClasses(className, {
    [`is-${color}`]: color,
    [`size-${size}`]: size,
    [`font-size-${size}`]: size,
    'is-square': isSquare,
  });

  if (src) {
    return (
      <ThemeUIAvatar
        ref={ref}
        alt={alt}
        src={src}
        sx={{
          size,
          width: sizes.avatar[size],
          height: sizes.avatar[size],
          ...sx,
        }}
        {...others}
      />
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
