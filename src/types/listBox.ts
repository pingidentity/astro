import { Key, ReactNode } from 'react';
import { ComboBoxState, ListState, Node } from 'react-stately';
import { AriaListBoxOptions, AriaOptionProps } from '@react-aria/listbox';
import { VirtualizerItemOptions } from '@react-aria/virtualizer';
import { ReusableView } from '@react-stately/virtualizer';
import type { CollectionChildren, FocusStrategy } from '@react-types/shared';

import { BoxProps } from './box';

export interface ComboBoxStateType extends ComboBoxState<object> {
  focusStrategy: FocusStrategy,
}

export interface ListStateType extends ListState<object> {
  focusStrategy?: FocusStrategy,
}

export type ListBoxStateType = ListStateType | ComboBoxStateType

interface ListBoxItemType extends Node<unknown> {
  key: Key
}

export interface ListBoxProps extends AriaListBoxOptions<object>{
  hasAutoFocus?: boolean,
  hasFocusWrap?: boolean,
  hasNoEmptySelection?: boolean,
  hasVirtualFocus?: boolean,
  isLoading?: boolean,
  isFocusedOnHover?: boolean,
  isSelectedOnPressUp?: boolean,
  onLoadMore?: () => void,
  onScroll?: () => void,
  state: ListBoxStateType
  renderEmptyState?: React.ReactNode,
  variant?: string
  children?: CollectionChildren<object>
}

export interface OptionType {
  item: ListBoxItemType,
  hasVirtualFocus?: boolean,
}

export interface AriaListBoxOptionsType extends AriaOptionProps {
  onPressStart: () => void,
  onPressUp: () => void,
}

export interface ListBoxSectionProps extends Omit<VirtualizerItemOptions<object, object>, 'ref'> {
  children?: ReactNode,
  header: ReusableView<object, ReactNode>,
}

export interface UseListBoxSectionProps {
  headingProps: BoxProps,
  groupProps: BoxProps,
}
