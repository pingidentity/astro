import { MutableRefObject, ReactNode } from 'react';
import type { Key, Node, PressEvent } from '@react-types/shared';

import { Status } from './item';
import { ScrollBoxProps } from './scrollBox';
import { Axis, loadingState } from './shared';
import { TextProps } from './text';

/** A selected value rendered as a badge, with optional sections in condensed mode. */
export interface MultivaluesFieldItem {
  /** A unique identifier for the item. */
  id?: string | number;
  /** The key of the item. */
  key?: Key;
  /** The rendered label for the item. */
  name?: string;
  /** Props object that is spread directly into the Badge element. */
  badgeProps?: { textProps?: TextProps } & Record<string, unknown>;
  /** Props object that is spread directly into the delete IconButton element. */
  buttonProps?: Record<string, unknown>;
  /** Props object that is spread directly into the Badge slots. */
  slots?: { leftIcon?: ReactNode };
  /** Child items, when the item is a section (condensed mode). */
  children?: MultivaluesFieldItem[];
}

/**
 * Shared field/menu props for both MultivaluesField modes. Consumers should use
 * `CondensedMultivaluesFieldProps`, `DefaultMultivaluesFieldProps`, or the
 * dispatcher type `MultivaluesFieldProps` rather than this interface directly.
 */
interface MultivaluesFieldBaseProps {
  /** Identifies the element (or elements) whose contents or presence
   * are controlled by the current element. */
  'aria-controls'?: string;
  /** Identifies the element (or elements) that describes the object. */
  'aria-describedby'?: string;
  /** Identifies the element (or elements) that provide a detailed, extended description
   * for the object. */
  'aria-details'?: string;
  /** Identifies the element that provides an error message for the object. */
  'aria-errormessage'?: string;
  /** Defines a string value that labels the current element. */
  'aria-label'?: string;
  /** Identifies the element (or elements) that labels the current element. */
  'aria-labelledby'?: string;
  /** Props object spread into the outer-most container. Wrapper and label will be children. */
  containerProps?: Record<string, unknown>;
  /** The initial selected keys in the collection (uncontrolled). */
  defaultSelectedKeys?: Iterable<Key>;
  /** Where the menu opens relative to its trigger. */
  direction?: Axis;
  /**
   * The item keys that are disabled. These items cannot be selected.
   */
  disabledKeys?: Key[];
  /** A function that filters the items in the collection. If undefined, the
   * component's default filtering is used. */
  filter?: (nodes: Iterable<Node<object>>) => Iterable<Node<object>>;
  /** Whether the element should receive focus on render. */
  hasAutoFocus?: boolean;
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator?: boolean;
  /** Text rendered below the input. */
  helperText?: ReactNode;
  /**
   * Props that get passed as-is to the underlying TextField element
   */
  inputProps?: Record<string, unknown>;
  /** Whether the input is disabled. */
  isDisabled?: boolean;
  /**
   * Whether the menu is prevented from flipping directions when insufficient space is
   * available for the given `direction` placement.
   */
  isNotFlippable?: boolean;
  /** Whether the input can be selected but not changed by the user. */
  isReadOnly?: boolean;
  /** Whether user input is required on the input before form submission. */
  isRequired?: boolean;
  /** The list of items.
   *
   * **Note:** Every item needs to have key and name properties.
   */
  items?: MultivaluesFieldItem[];
  /** The rendered label for the field. */
  label?: ReactNode;
  /** The contents of the collection. Supports item render props (as children). */
  children?: ReactNode | ((item: MultivaluesFieldItem) => ReactNode);
  /** Whether the component allows to create new values or only choose from the selection list */
  mode?: 'restrictive' | 'non-restrictive' | 'condensed';
  /** Whether the items are currently loading. */
  loadingState?: loadingState;
  /**
   * Handler that is called when the element loses focus.
   */
  onBlur?: (e: FocusEvent) => void;
  /**
   * Handler that is called when the element receives focus.
   */
  onFocus?: (e: FocusEvent) => void;
  /**
   * Handler that is called when the input value changes.
   */
  onInputChange?: (value: string) => void;
  /**
   * Handler that is called when a key is pressed.
   */
  onKeyDown?: (e: KeyboardEvent) => void;
  /**
   * Handler that is called when a key is released.
   */
  onKeyUp?: (e: KeyboardEvent) => void;
  /**
   * Handler that is called when more items should be loaded, e.g. while scrolling near the bottom.
   */
  onLoadMore?: () => unknown;
  /**
   * Handler that is called when more items should be loaded, e.g. while scrolling near the top.
   */
  onLoadPrev?: () => unknown;
  /**
   * Method that is called when the open state of the menu changes.
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Handler that is called when the selection changes.
   */
  onSelectionChange?: (keys: Iterable<Key>) => unknown;
  /** Temporary text that occupies the text input when it is empty. */
  placeholder?: string;
  /** Props object that is spread directly into the input element. Will be a child
   * of the Wrapper. */
  controlProps?: Record<string, unknown>;
  /** Props object spread to the field control wrapper, i.e. the immediate parent
   * element for the control, sibling of the label, and child of the field container. */
  controlWrapperProps?: Record<string, unknown>;
  /** Props object spread to the field label, i.e. the visible text which labels the control. */
  labelProps?: Record<string, unknown>;
  /** The currently selected keys in the collection (controlled). */
  selectedKeys?: Iterable<Key>;
  /** @ignore Props object that is spread directly into the ScrollBox element. */
  scrollBoxProps?: ScrollBoxProps;
  /** Determines any status related styling. */
  status?: Status;
}

/** Props for the MultivaluesField in `condensed` mode. */
export interface CondensedMultivaluesFieldProps
  extends MultivaluesFieldBaseProps {
  /** Whether the component allows to create new values or only choose from the selection list */
  mode?: 'condensed';
  /** Whether the field has the select all button. */
  hasNoSelectAll?: boolean;
  /** Whether filtering of the options list is disabled. */
  isFilteringDisabled?: boolean;
  /** Text describing the currently selected options in place of the default count. */
  selectedOptionText?: string;
}

/** Props for the MultivaluesField in `restrictive` or `non-restrictive` mode. */
export interface DefaultMultivaluesFieldProps
  extends MultivaluesFieldBaseProps {
  /** Whether the component allows to create new values or only choose from the selection list */
  mode?: 'restrictive' | 'non-restrictive';
  /** Whether filtering of the options list is disabled. */
  isFilteringDisabled?: boolean;
  /**
   * The item keys that are readonly. These items cannot be changed or selected.
   */
  readOnlyKeys?: string[];
  /** Props object spread into the outer-most container. */
  multivaluesProps?: Record<string, unknown>;
}

/**
 * Mode-specific props that either mode may accept. The original dispatcher's
 * PropTypes declared all of these on the parent component, so the dispatcher
 * type exposes them as optional members regardless of the active `mode`.
 */
interface MultivaluesFieldModeProps {
  /** Whether the field has the select all button (condensed mode). */
  hasNoSelectAll?: boolean;
  /** Whether filtering of the options list is disabled. */
  isFilteringDisabled?: boolean;
  /** Text describing the currently selected options in place of the default count. */
  selectedOptionText?: string;
  /** The item keys that are readonly. These items cannot be changed or selected. */
  readOnlyKeys?: string[];
  /** Props object spread into the outer-most container (default mode). */
  multivaluesProps?: Record<string, unknown>;
}

/**
 * Props for the MultivaluesField dispatcher. Accepts the props of either mode.
 *
 * Note: this deliberately avoids `Omit`/intersection-based composition.
 * react-docgen (used by Storybook to extract the props table) only resolves
 * plain interface inheritance; an unresolved extends clause or an intersection
 * type silently produces an empty props table in the docs.
 */
export interface MultivaluesFieldProps
  extends MultivaluesFieldBaseProps,
    MultivaluesFieldModeProps {}

/** Props for the badge rendered for each selected item in the default mode. */
export interface BadgeLabelTooltipProps {
  /** The selected item to render as a badge. */
  item: MultivaluesFieldItem;
  /** The index of the badge in the selected items list. */
  index: number;
  /**
   * Handler that is called when the badge's delete button is pressed.
   */
  deleteItem: (key: Key, e: PressEvent) => void;
  /** Refs to the badge delete buttons, used to manage focus when badges are removed. */
  closeBadgeRefs: MutableRefObject<(HTMLDivElement | HTMLButtonElement | null)[]>;
}
