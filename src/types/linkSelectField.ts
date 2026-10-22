import { UseSelectFieldProps } from '../hooks/useSelectField/useSelectField';

import { IconProps } from './icon';
import { Status } from './item';

export interface LinkSelectFieldProps
  extends Omit<UseSelectFieldProps<object>, 'align' | 'helperText' | 'label'> {
  /** Alignment of the popover menu relative to the trigger. */
  align?: 'start' | 'end' | 'middle';
  /** Where the popover menu opens relative to its trigger. */
  direction?: 'top' | 'right' | 'bottom' | 'left';
  /** The initial selected key in the collection (uncontrolled). */
  defaultSelectedKey?: string;
  /** Array of keys to disable within the options list. */
  disabledKeys?: Iterable<string>;
  /** Whether the collection allows empty selection. */
  hasNoEmptySelection?: boolean;
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator?: boolean;
  /** Text rendered below the input. */
  helperText?: React.ReactNode;
  /** Props object that is spread directly into the helphint element. */
  helpHintProps?: Record<string, unknown>;
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText?: string;
  /** The label for the select element. */
  label?: React.ReactNode;
  /** Sets the default open state of the menu. */
  isDefaultOpen?: boolean;
  /** Whether the input is disabled. */
  isDisabled?: boolean;
  /** Whether the items are currently loading. */
  isLoading?: boolean;
  /** @ignore Whether the menu should automatically flip direction when space is limited. */
  isNotFlippable?: boolean;
  /** Sets the open state of the menu. */
  isOpen?: boolean;
  /** @ignore Whether the input can be selected but not changed by the user. */
  isReadOnly?: boolean;
  /** Whether user input is required on the input before form submission. */
  isRequired?: boolean;
  /**
   * *For performance reasons, use this prop instead of Array.map when iteratively rendering Items*.
   * For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections).
   */
  items?: Iterable<object>;
  /** The name for the select element, used when submitting a form. */
  name?: string;
  /** Temporary text that occupies the text input when it is empty. */
  placeholder?: string;
  /** The currently selected key in the collection (controlled). */
  selectedKey?: string;
  /**
   * Handler that is called when more items should be loaded, e.g. while scrolling near the bottom.
   *
   * () => any
   */
  onLoadMore?: () => unknown;
  /**
   * Method that is called when the open state of the menu changes.
   *
   * (isOpen: boolean) => void
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Handler that is called when the selection changes.
   *
   * (key: Key) => any
   */
  onSelectionChange?: (key: React.Key | null) => void;
  /** Display an inline loader inside the select trigger while loading. */
  hasInlineLoader?: boolean;
  /**
   * Props object that is spread directly into the Icon inside the default trigger button.
   * Supports all IconProps (icon, title, size, color, sx, etc.).
   * The sx prop is merged with the rotation style.
   */
  iconProps?: IconProps;
  /** Width of the popover menu. Accepts any valid CSS unit. */
  popoverWidth?: string | number;
  /**
   * A ReactNode that replaces the default Button trigger entirely.
   * When provided, the local Button element is not rendered.
   */
  trigger?: React.ReactNode;
  /** Props object that is spread directly into the default trigger button. */
  triggerProps?: Record<string, unknown>;
  /** Determines any status related styling. */
  status?: Status;
  /** Props object spread into the outer-most container. Wrapper and label will be children. */
  containerProps?: Record<string, unknown>;
  /** Props object that is spread directly into the input element. Will be a child
   * of the Wrapper. */
  controlProps?: Record<string, unknown>;
  /** Props object spread to the field control wrapper, i.e. the immediate parent
   * element for the control, sibling of the label, and child of the field container. */
  controlWrapperProps?: Record<string, unknown>;
  /** Props object spread to the field label, i.e. the visible text which labels the control. */
  labelProps?: Record<string, unknown>;
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
}
