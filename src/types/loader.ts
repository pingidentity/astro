import { LoaderSize, StyleProps } from './shared';
import { BoxProps } from '.';

export interface LoaderProps extends StyleProps {
  /**
   * Color key from theme or string value.
   * Default color inherits the font color.
  */
  color?: string,
  size?: LoaderSize,
  dotProps?: BoxProps,
  progress?: number,
  strokeColor?: string,
  strokeBaseColor?: string,
  isCircle?: boolean,
}
