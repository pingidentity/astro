import type { CollectionChildren } from '@react-types/shared';

import { IconProps, IconTypeExtended } from './icon';

export interface CollapsiblePanelProps<T> {
  children?: React.ReactNode | CollectionChildren<T>;
  className?: string;
  /** Amount of selected items indicator. */
  selectedFilterCount?: string | number;
  /** Title of list content. */
  listTitle?: string;
  /** Defines a string value that labels the trigger icon when menu is open. */
  closeAriaLabel?: string;
  /** Sets the default open state of the overlay. */
  isDefaultOpen?: boolean;
  /** Whether the overlay is currently open. */
  isOpen?: boolean;
  /** The list of ListView items (controlled). */
  items?: Iterable<object>;
  /**
   * Method that is called when the open state of the menu changes.
   * Returns the new open state and the action that caused the opening of the menu.
   *
   * `(isOpen: boolean; overlayTrigger: OverlayTriggerAction) => void`
   */
  onOpenChange?: () => void;
  /** Callback function that fires when the selected key changes. */
  onSelectionChange?: () => void;
  /** Defines a string value that labels the trigger icon when menu is closed. */
  openAriaLabel?: string;
}

export interface CollapsiblePanelItemProps {
  text: string;
  icon?: IconTypeExtended;
  isDefaultSelected?: boolean;
  onPress?: () => void;
  iconProps?: IconProps;
}

export interface CollapsiblePanelContainerProps {
  children?: React.ReactNode;
  className?: string;
  /** Amount of selected items indicator. */
  selectedFilterCount?: string | number;
  /** Defines a string value that labels the trigger icon when menu is open. */
  closeAriaLabel?: string;
  /** Sets the default open state of the overlay. */
  isDefaultOpen?: boolean;
  /** Whether the overlay is currently open. */
  isOpen?: boolean;
  /**
   * Method that is called when the open state of the menu changes.
   * Returns the new open state and the action that caused the opening of the menu.
   *
   * `(isOpen: boolean, overlayTrigger: OverlayTriggerAction) => void`
   */
  onOpenChange?: () => void;
  /** Defines a string value that labels the trigger icon when menu is closed. */
  openAriaLabel?: string;
  /** Used in button aria-controls attribute. */
  collapsiblePanelId?: string;
}

export interface CollapsiblePanelBadgeProps {
  className?: string;
  selectedFilterCount?: string | number;
  margin?: string;
  as?: string | React.ReactNode | React.ElementType,
}
