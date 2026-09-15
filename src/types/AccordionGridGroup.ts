import { ReactNode } from 'react';
import { MultipleSelectionStateProps } from '@react-stately/selection';

import { TestingAttributes } from './shared/test';
import { AccordionGridItemHeaderProps } from './AccordionGridItem';
import { BoxProps } from './box';

export interface AccordionGridGroupProps<T extends object = object>
  extends Omit<BoxProps, 'children'>, MultipleSelectionStateProps {
  /** The list of ListView items (controlled). */
  items?: Iterable<T>;
  children?: ReactNode | ((item: T) => ReactNode);
  /**
   * Defines a type of navigation mode.
   * "native" - navigation via "tab" key.
   *  "arrows" - navigation via arrow keys.
   */
  navigationMode?: 'native' | 'arrows';
  /** Props object that is spread directly into the root (top-level) element. */
  containerProps?: BoxProps & TestingAttributes;
  /**
   * The props object is directly spread into the accordion header element.
   * Utilize the `customUpArrow` & `customDownArrow` keys to incorporate custom Up and Down arrows.
   * */
  headerProps?: AccordionGridItemHeaderProps;
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string;
  /** Defines a string value that labels the current element. */
  'aria-label'?: string;
  /** Identifies the element (or elements) that labels the current element. */
  'aria-labelledby'?: string;
  /** Identifies the element (or elements) that describes the object. */
  'aria-describedby'?: string;
  /**
   * Identifies the element (or elements) that provide a detailed, extended description for
   * the object.
   */
  'aria-details'?: string;
}
