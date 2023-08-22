import { StyleProps } from './shared';

export interface LoaderProps extends StyleProps {
  /**
   * Color key from theme or string value.
   * Default color inherits the font color.
  */
  color?: string,
    /**
   * Size as number or pixel / em / rem value.
   * Sizes can either be a string such as xs, sm, md, etc or numeric size with unit such as 15px.
   * Default size inherits the font size.
  */
  size?: number | string
}
