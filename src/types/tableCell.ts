import { DOMAttributes, StyleProps } from './shared';

export interface TableCellProps extends StyleProps, DOMAttributes {
  /** Determines whether or not the html rendered is a th or td element. */
  isHeading?: boolean
}
