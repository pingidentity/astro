import React, { Key, ReactNode } from 'react';
import type { MenuTriggerAction } from '@react-types/combobox';
import type { CollectionChildren } from '@react-types/shared';

import { ControlProps } from '../hooks/useField/useField';

import { BoxProps } from './box';
import { Status } from './item';
import { ScrollBoxProps } from './scrollBox';
import { Axis, loadingState } from './shared';

export interface ComboBoxFieldProps<T extends object = object>
  extends Omit<BoxProps, 'children' | 'direction'> {
  /** Whether or not adding new options to the list is enabled. */
  hasAddOption?: boolean;
  /** Whether the ComboBox allows a non-item matching input value to be set. */
  hasCustomValue?: boolean;
  /** Whether the collection allows empty selection. */
  hasNoEmptySelection?: boolean;
  /**
   * The item keys that are disabled. These items cannot be selected, focused, or otherwise
   * interacted with.
   */
  disabledKeys?: Iterable<Key>;
  /** The interaction required to display the ComboBox menu. */
  menuTrigger?: MenuTriggerAction;
  /**
   * Whether the ComboBox menu is prevented from flipping directions when insufficient space is
   * available for the given `direction` placement.
   */
  isNotFlippable?: boolean;
  /** Where the ComboBox menu opens relative to its trigger. */
  direction?: Axis;
  /** Text rendered below the input. */
  helperText?: ReactNode;
  /** The initial selected key in the collection (uncontrolled). */
  defaultSelectedKey?: string;
  /** The currently selected key in the collection (controlled). */
  selectedKey?: Key | null;
  /**
   * Handler that is called when the selection changes.
   *
   * `(key: Key) => any`
   */
  onSelectionChange?(key: Key | null): void;
  /** The list of ComboBox items (uncontrolled). */
  defaultItems?: Iterable<T>;
  /** The list of ComboBox items (controlled). */
  items?: Iterable<T>;
  /**
   * Method that is called when the open state of the menu changes.
   * Returns the new open state and the action that caused the opening of the menu.
   *
   * `(isOpen: boolean, menuTrigger: MenuTriggerAction) => void`
   */
  onOpenChange?: (isOpen: boolean, menuTrigger?: MenuTriggerAction) => void;
  loadingState?: loadingState;
  onLoadMore?: () => void;
  /** The default value of the ComboBox input (uncontrolled). */
  defaultInputValue?: string;
  /** The value of the ComboBox input (controlled). */
  inputValue?: string;
  /**
   * Handler that is called when the ComboBox input value changes.
   *
   * `(value: string) => void`
   */
  onInputChange?: (value: string) => void;
  /** Whether user input is required on the input before form submission. */
  isRequired?: boolean;
  /** Whether the input is disabled. */
  isDisabled?: boolean;
  /** Whether the input can be selected but not changed by the user. */
  isReadOnly?: boolean;
  /** The rendered label for the field. */
  label?: ReactNode;
  /** Temporary text that occupies the text input when it is empty. */
  placeholder?: string;
  /** Whether the element should receive focus on render. */
  hasAutoFocus?: boolean;
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator?: boolean;
  /**
   * Handler that determines the default filtering for items. If undefined, `contains` from
   * [useFilter](https://react-spectrum.adobe.com/react-aria/useFilter.html) is used.
   *
   * `(option: string, inputValue: string) => boolean`
   */
  defaultFilter?: (textValue: string, inputValue: string) => boolean;
  /** @ignore */
  scrollBoxProps?: Omit<ScrollBoxProps, 'sx'> & { sx?: Record<string, unknown> };
  /** Props object that is spread directly into the ComboBoxInput element. */
  controlProps?: ControlProps;
  /** Whether the collection allows an empty collection. */
  allowsEmptyCollection?: boolean;
  /** The function to render when the collection is empty. */
  renderEmptyState?: () => ReactNode;
  /** Determines any status related styling. */
  status?: Status;
  /** The collection items. */
  children?: CollectionChildren<T>;
  /** Whether the ComboBox menu is currently open (controlled). */
  isOpen?: boolean;
  /** Props object that is spread directly into the ComboBoxInput wrapper element. */
  wrapperProps?: Omit<BoxProps, 'sx'> & { sx?: Record<string, unknown> };
  /** Props object that is spread directly into the input wrapper element. */
  containerProps?: Omit<BoxProps, 'sx'> & { sx?: Record<string, unknown> };
}
