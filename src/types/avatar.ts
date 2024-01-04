import { AvatarProps as ThemeUIAvatarProps, ThemeUICSSObject } from 'theme-ui';

export interface AvatarProps extends ThemeUIAvatarProps {
  /**  Source of avatar. */
  src: string,
  /** Alternative text for avatar. */
  alt?: string,
  /** Inline styling prop */
  sx?: ThemeUICSSObject
}
