import { CSSProperties, ElementType } from 'react';
import type { ItemProps } from '@react-types/shared';

import { DOMAttributes, StyleProps } from './shared';

export interface StylingProps extends DOMAttributes, StyleProps {
  style?: CSSProperties | string,
}

declare module '@react-types/shared' {
  // eslint-disable-next-line no-shadow, @typescript-eslint/no-unused-vars
  interface ItemProps<T> extends StyleProps, DOMAttributes {
      /** The rendered label for the item. */
    label?: string;
    /** Props for the accordion item content element. */
    regionProps?: StylingProps,
     /** Props for the accordion item content element. */
    containerProps?: StylingProps,
     /** Whether the item has a separator */
    isSeparator?: boolean,
     /** Whether the item is pressed */
    isPressed?: boolean,
     /** The HTML element type that will be used to render the item. */
    elementType?: string | ElementType,
     /** Indicates the status of item */
    status?: 'default' | 'error' | 'success' | 'warning',
      /** A URL to link to if elementType="a". */
    href?: string,
    /** Inline styling prop for item */
    sx?: StylingProps
  }
}

export default ItemProps;
