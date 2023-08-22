import {
  ReactNode,
} from 'react';

import { TestingAttributes } from './shared/test';
import { DOMAttributes, StyleProps } from './shared';

export type SVGComponentProps = {
  title?: string
};

export type IconTypeExtended = ReactNode & {
  type: {
    name: string;
  };
}| React.ElementType


export interface IconProps extends StyleProps, DOMAttributes, TestingAttributes {
    /**
   * The title associated with the icon. It is recommended that icons always have an associated
   * title in order to allow a better user experience for those using screen readers.
   * The **`id`** in the title object will be the id of the title and
   * is also what will be supplied to the **`aria-labelledby`** attribute in the SVG.
   * The **`name`** in the title object will be the content of the title.
   * This prop can only be used when importing the icon from [@pingux/mdi-react](https://www.npmjs.com/package/@pingux/mdi-react).
   * */
  title?: {
    id?: string,
    name: string,
  }
  /** The icon to render. */
  icon: IconTypeExtended,
  /**
   * The size of the icon container. If given a number value, it will be converted to pixels.
   * Tshirt sizing is recommended and can be passed to the size prop as 'xs', 'sm' , 'md'
   * rendering 15, 20, and 25 pixel svg containers.  */
  size?: number | string,
  /** A theme-aware prop to set the icon's color. */
  color?: string,
}
