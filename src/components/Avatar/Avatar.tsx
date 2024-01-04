import React, { forwardRef } from 'react';
import { Avatar as ThemeUIAvatar } from 'theme-ui';

import { AvatarProps } from '../../types/avatar';

const Avatar = forwardRef<HTMLImageElement, AvatarProps>((props, ref) => {
  return (
    <ThemeUIAvatar
      ref={ref}
      {...props}
    />
  );
});

Avatar.defaultProps = {
  alt: 'Avatar',
};

Avatar.displayName = 'Avatar';

export default Avatar;
