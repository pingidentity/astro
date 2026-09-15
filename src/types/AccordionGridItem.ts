import { ReactNode } from 'react';
import type { MdiReactIconComponentType } from '@pingux/mdi-react';
import type { Node } from '@react-types/shared';
import type { MaterialSymbol } from 'material-symbols';

import { BoxProps } from './box';
import { IconTypeExtended } from './icon';

export interface AccordionGridItemProps extends BoxProps {
  /** The grid node for this accordion item, provided by AccordionGridGroup. */
  item?: Node<object>;
  /** Props object that is spread into the accordion item header element. */
  headerProps?: AccordionGridItemHeaderProps;
  /** Props object that is spread into the accordion item body element. */
  bodyProps?: AccordionGridItemBodyProps;
  /**
   * Defines a type of navigation mode.
   * "native" - navigation via "tab" key.
   *  "arrows" - navigation via arrow keys.
   */
  navigationMode?: 'native' | 'arrows';
  className?: string;
  children?: ReactNode;
}

export interface AccordionGridItemBodyProps extends BoxProps {
  /** The grid cell node for this accordion item body, provided by AccordionGridGroup. */
  item?: Node<object>;
  /**
   * Defines a type of navigation mode.
   * "native" - navigation via "tab" key.
   *  "arrows" - navigation via arrow keys.
   */
  navigationMode?: 'native' | 'arrows';
  /** Defines a string value that labels the current element. */
  'aria-label'?: string;
}

export interface AccordionGridItemHeaderProps extends BoxProps {
  /** The grid cell node for this accordion item header, provided by AccordionGridGroup. */
  item?: Node<object>;
  /** Whether to render the expand/collapse caret in the header. */
  hasCaret?: boolean;
  /** Custom icon to render as the down (collapsed) arrow. */
  customDownArrow?: IconTypeExtended | MaterialSymbol | string | MdiReactIconComponentType;
  /** Custom icon to render as the up (expanded) arrow. */
  customUpArrow?: IconTypeExtended | MaterialSymbol | string | MdiReactIconComponentType;
  /**
   * Defines a type of navigation mode.
   * "native" - navigation via "tab" key.
   *  "arrows" - navigation via arrow keys.
   */
  navigationMode?: 'native' | 'arrows';
  /** Defines a string value that labels the current element. */
  'aria-label'?: string;
}
