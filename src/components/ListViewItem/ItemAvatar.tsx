import React, { forwardRef } from 'react';
import { ThemeUICSSObject } from 'theme-ui';

import { Avatar, Icon } from '../..';
import { AvatarProps } from '../../types/avatar';
import { IconProps, IconTypeExtended } from '../../types/icon';

import { getAvatarColor } from './getAvatarColor';

export interface ItemAvatarProps {
  /** The icon to render inside the avatar. */
  icon?: IconTypeExtended;
  /** Props to spread onto the inner icon. */
  iconProps?: Omit<IconProps, 'title'>;
  /** The accessible name for the inner icon. */
  title?: { name: string };
  /** Seeds the avatar color; exact two-tone color-name matches render that color directly. */
  colorId?: string;
  /** Seeds the avatar color when colorId is not provided. */
  avatarDefaultText?: string;
  /** Replaces the icon with these initials. */
  avatarInitials?: string;
  /** Renders the avatar round instead of square. */
  isIconRound?: boolean;
  /** Props to spread onto the avatar; children are managed by the component. */
  avatarProps?: Omit<AvatarProps, 'children'>;
}

const ItemAvatar = forwardRef<HTMLImageElement, ItemAvatarProps>(({
  icon,
  iconProps,
  title,
  colorId,
  avatarDefaultText,
  avatarInitials,
  isIconRound,
  avatarProps,
}, ref) => {
  const initials = avatarInitials || undefined;
  const { colorName, isTwoTone } = getAvatarColor(colorId, avatarDefaultText);
  const { sx: consumerSx, ...restAvatarProps } = avatarProps || {};
  const twoToneSx: ThemeUICSSObject | undefined = isTwoTone
    ? { backgroundColor: `iconWrapper.wrapper.${colorName}` }
    : undefined;
  const mergedSx: ThemeUICSSObject = { ...twoToneSx, ...consumerSx };

  return (
    <Avatar
      ref={ref}
      size="sm"
      isSquare={!isIconRound}
      defaultText={initials || avatarDefaultText}
      color={colorName}
      sx={mergedSx}
      {...restAvatarProps}
    >
      {icon && !initials && (
        <Icon
          icon={icon}
          size="sm"
          title={title}
          color={colorName ? `iconWrapper.icon.${colorName}` : undefined}
          {...iconProps}
        />
      )}
    </Avatar>
  );
});

ItemAvatar.displayName = 'ItemAvatar';

export default ItemAvatar;
