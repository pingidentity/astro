import { AvatarProps as ThemeUIAvatarProps, ThemeUICSSObject } from 'theme-ui';

export interface AvatarProps extends ThemeUIAvatarProps {
  /**  Source of avatar. */
  src?: string,
  /** Alternative text for avatar. */
  alt?: string,
  /** Inline styling prop */
  sx?: ThemeUICSSObject
  /** If no image src is supplied, this text will render inside of a styled div */
  defaultText?: string,
  size?: string,
  color?: string,
}
