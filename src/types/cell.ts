import { StyleProps } from './shared';

declare module '@react-types/table' {
  export interface CellProps extends StyleProps {
    /** Whether the cell should not wrap its contents. */
    noWrap?: boolean;
    /** The contents of the cell. */
    children: React.ReactNode,
    /** A string representation of the cell's contents, used for features like typeahead. */
    textValue?: string
  }
}
