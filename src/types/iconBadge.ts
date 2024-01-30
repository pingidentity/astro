import { StylePropertyValue, ThemeUICSSObject } from 'theme-ui';

import { DOMAttributes, StyleProps } from './shared';

type UpdatedStyleProps = Omit<StyleProps, 'as'>;

export interface IconBadgeProps extends UpdatedStyleProps, DOMAttributes {
  /** JSX styling that is passed into the component. */
  sx?: ThemeUICSSObject;
  /** Color that is applied to the circular background.
   * Default is white.
   */
  circleColor?: StylePropertyValue<string | undefined>;
  /**
   * The size of the base Icon. When given a number value, it will be converted to pixels.
   */
  baseSize?: number | string | undefined;
  /**
   * The size of the Icon within the circle.
   * When given a number value, it will be converted to pixels.
   */
  circleSize?: number | undefined | 0;
}
