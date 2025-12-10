import { Node, TreeState } from 'react-stately';

import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';

export interface MenuSectionProps extends BoxProps, TestingAttributes {
  /** Whether the menu item is currently pressed. */
  isPressed?: boolean;
  /**
   * Whether the containing menu has keyboard focus.
   * Used to determine when to present hover vs focus styling.
  */
  isFocusVisible?: boolean;
  /**
   * Whether menu item should receive focus state on hover.
  */
  isNotFocusedOnHover?: boolean;
  /** A screen reader only label for the menu item. */
  /** Handler that is called when the menu should close after selecting an item. */
  onClose?: () => void;
  /** Handler that is called when the user activates the item. */
  onAction?: () => void;
  section: Node<object>;
  state: TreeState<object>;
  defaultSelectedKey?: string | number
}
