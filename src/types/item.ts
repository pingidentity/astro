import { ElementType, Key, ReactNode } from 'react';
import type { ItemProps } from '@react-types/shared';

import { IconTypeExtended } from './icon';
import { DOMAttributes, StyleProps } from './shared';

export type Status = 'default' | 'error' | 'success' | 'warning';

declare module '@react-types/shared' {
  // eslint-disable-next-line no-shadow, @typescript-eslint/no-unused-vars
  interface ItemProps<T> extends StyleProps, DOMAttributes {
    /** The rendered label for the item. */
    label?: string | ReactNode;
    /** Props for the accordion item content element. */
    regionProps?: StyleProps,
    /** Props for the accordion item content element. */
    containerProps?: StyleProps,
    /** Props for the accordion item button element. */
    buttonProps?: StyleProps,
    /** Props for the tab line element. */
    tabLineProps?: StyleProps,
    /** Whether the item has a separator */
    isSeparator?: boolean,
    /** Whether the item is pressed */
    isPressed?: boolean,
    /** The HTML element type that will be used to render the item. */
    elementType?: string | ElementType,
    /** Indicates the status of item */
    status?: Status,
    /** A URL to link to if elementType="a". */
    href?: string,
    /** Inline styling prop for item */
    sx?: StyleProps
    /** Key for the item. */
    key?: Key,
    slots?: {
      postHeading?: ReactNode,
      afterTab?: ReactNode,
      beforeTab?: ReactNode,
    },
    icon?: IconTypeExtended
    /** isCurrent for the Breadcrumbs item. */
    isCurrent?: boolean;
  }
}

export default ItemProps;
