import { GridProps as ThemeUIGridProps, ResponsiveStyleValue } from 'theme-ui';

export interface GridProps extends ThemeUIGridProps {
  /**
   * Minimum width of child elements
   */
  width?: ResponsiveStyleValue<string | number>
  /**
   * *Cannot be used in conjunction with the width prop*
   *
   * Number of equally-sized columns, or [grid syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) string values, to use for the layout
   */
  columns?: ResponsiveStyleValue<string | number>
  /**
   * Space between child elements
   */
  gap?: ResponsiveStyleValue<string | number>
  /**
   * Auto-repeat track behaviour (default is fit)
   */
  repeat?: 'fit' | 'fill'
}
