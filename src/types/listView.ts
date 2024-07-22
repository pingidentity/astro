import { Dispatch, Key, ReactNode, SetStateAction } from 'react';
import { FocusManager } from 'react-aria';
import { TreeProps, TreeState } from 'react-stately';
import type { GridNode } from '@react-types/grid';

export type SelectionOptions = 'expansion' | 'single' | 'multiple' | 'none'

export interface ListViewProps extends Omit<TreeProps<object>, 'selectionMode'> {
  selectionStyle?: string,
  isHoverable?: boolean,
  loadingState?: string,
  selectionMode?: SelectionOptions,
  onFocus?: (event) => void,
  onLoadMore?: () => void,
  'aria-label'?: string,
  containerProps?: object
}

export interface ExpandableItemChildrenContainerProps {
  children?: ReactNode,
  gridCellProps?: object,
  isFocusEscaped?: boolean,
  isFocusWithin?: boolean,
  isFocused?: boolean,
  focusManager?: FocusManager,
  focusProps?: object,
  setIsFocusEscaped?: (boolean) => void,
  focusWithinProps?: object,
}

export interface ExpandableContainerProps {
  containerProps: object,
  isFocusEscaped: boolean,
  children?: ReactNode,
}

export interface ListViewExpandableItemProps<T> {
  isHoverable: boolean,
  isFocusable: boolean,
  className?: string,
  item: ListViewItemTypes<T>
}

export interface ListViewState<T> extends TreeState<T> {
  hover: {
    hoveredItem?: Key | null,
    setHoveredItem: Dispatch<SetStateAction<Key | null>>,
  }
  isLink: boolean,
  isLoading: boolean
}

export interface ListViewItemTypesProps {
  listItemProps?: object,
  rowProps?: object,
  hasSeparator?: boolean,
  hasInsetSeparator?: boolean
}

export interface ListViewItemTypes<T> extends GridNode<T>{
  props?: ListViewItemTypesProps
}

export interface ExpandableListViewItemProps<T> {
  expandableItemRowRef: React.MutableRefObject<HTMLDivElement | null>,
  expandableChildrenRef: React.MutableRefObject<HTMLDivElement | null>,
  className?: string,
  isHoverable: boolean,
  isFocusable: boolean,
  item: GridNode<unknown>,
  state: ListViewState<T>,
  key: string | number,
}

export interface ExpandableItemState {
  isExpanded: boolean,
  toggleExpanded: (boolean) => void,
  isFocusEscaped: boolean,
  gridCellProps: object,
}
