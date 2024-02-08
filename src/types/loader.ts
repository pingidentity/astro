import { IconSize, StyleProps } from './shared';

export interface LoaderProps extends StyleProps {
  /**
   * Color key from theme or string value.
   * Default color inherits the font color.
  */
  color?: string,
  size?: IconSize
}
