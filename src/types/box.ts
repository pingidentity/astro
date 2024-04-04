import { StylePropertyValue } from 'theme-ui';

import { DOMAttributes, StyleProps } from './shared';

export interface BoxProps extends StyleProps, DOMAttributes {
  /** The background color of the box. */
  bg?: StylePropertyValue<string | undefined>,
  /** When true, display as a row rather than a column. */
  isRow?: boolean,
  /** Whether the box is disabled. */
  isDisabled?: boolean,
  /** Whether the box is focused. */
  isFocused?: boolean,
  tabIndex?: string | number,
  isSelected?: boolean,
  isUnavailable?: boolean,
  hidden?: boolean,
}
