import React, { forwardRef } from 'react';
import { Avatar as ThemeUIAvatar, Box } from 'theme-ui';

import { useStatusClasses } from '../../hooks';
import { AvatarProps } from '../../types/avatar';

const Avatar = forwardRef<HTMLImageElement, AvatarProps>((props, ref) => {
  const {
    alt = 'Avatar',
    defaultText,
    color,
    className,
    size,
    src,
    sx,
    ...others
  } = props;

  const { classNames } = useStatusClasses(className, {
    [`is-${color}`]: true,
  });


  if (src) {
    return (
      <ThemeUIAvatar
        ref={ref}
        alt={alt}
        src={src}
        sx={{
          size,
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
      {defaultText}
    </Box>
  );
});


Avatar.displayName = 'Avatar';

export default Avatar;
