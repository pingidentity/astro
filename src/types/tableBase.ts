import { ReactNode, RefObject } from 'react';
import type { TableState } from '@react-stately/table';
import { TableColumnResizeState } from '@react-stately/table';
import type { GridNode } from '@react-types/grid';
import type { FocusableElement, Key, Node } from '@react-types/shared';
import type { ColumnSize, TableProps } from '@react-types/table';

import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';
import { DOMAttributes, loadingState } from './shared';

export type ResizeHandler = (widths: Map<Key, ColumnSize>) => void;

export interface BaseProp extends BoxProps, TestingAttributes, DOMAttributes{
}

export interface TableBaseProps<T extends object> extends TableProps<T>, Omit<BaseProp, 'children' | 'onResize'> {
  'aria-label'?: string;
  selectionMode?: 'none' | 'single' | 'multiple',
  selectionBehavior?: 'replace' | 'toggle',
  hasSelectionCheckboxes?: boolean;
  'data-testid'?: string;
  caption?: ReactNode | string;
  isStickyHeader?: boolean;
  isLastColumnSticky?: boolean;
  loadingState?: loadingState;
  renderEmptyState?: () => ReactNode;
  onResizeStart?: ResizeHandler;
  onResize?: ResizeHandler;
  onResizeEnd?: ResizeHandler;
  onRowAction?: (key: Key) => void;
}

export interface TableRowGroupProps extends BaseProp{
  type: 'thead' | 'tbody';
  children: ReactNode;
  isSticky?: boolean;
}

export interface TableHeaderRowProps<T> extends BaseProp{
  item: Node<T>;
  state: TableState<T>;
  children: ReactNode;
  className?: string;
}

export interface ResizerProps<T> {
  column: GridNode<T>;
  layoutState: TableColumnResizeState<T>;
  triggerRef?: RefObject<FocusableElement | null>;
  onResizeStart?: (widths: Map<Key, ColumnSize>) => void;
  onResize?: (widths: Map<Key, ColumnSize>) => void;
  onResizeEnd?: (widths: Map<Key, ColumnSize>) => void;
}

export interface TableColumnHeaderProps<T> extends Omit<BaseProp, 'onResize'> {
  column: GridNode<T>;
  state: TableState<T>;
  className?: string;
  layoutState: TableColumnResizeState<T>;
  onResizeStart?: ResizeHandler;
  onResize?: ResizeHandler;
  onResizeEnd?: ResizeHandler;
}

export interface TableRowProps<T> extends BaseProp{
  item: Node<T>;
  state: TableState<T>;
  children: ReactNode;
  className?: string;
  hasSelectionCheckboxes?: boolean;
  hasActions?: boolean;
  isActiveRow?: boolean;
  registerRef?: (key: Key, el: HTMLElement | null) => void;
  onRowFocus?: (key: Key) => void;
}

export interface TableCellProps<T> extends BaseProp{
  cell: GridNode<T>;
  state: TableState<T>;
  className?: string;
  layoutState: TableColumnResizeState<T>;
  hasActions?: boolean;
}

export interface TableCheckboxCellProps<T> extends BaseProp{
  cell: GridNode<T>;
  state: TableState<T>;
  layoutState: TableColumnResizeState<T>;
}

export interface TableSelectAllCellProps<T> extends BaseProp{
  column: GridNode<T>;
  state: TableState<T>;
  layoutState: TableColumnResizeState<T>;
}

export interface TableCaptionProps {
  caption: string | React.ReactNode;
}

export interface TableBaseEmptyStateProps extends BoxProps {
  defaultIcon?: React.ElementType;
  headerLabel?: string;
  descriptionLabel?: string;
  addButtonLabel?: string;
  onAddButtonPress?: () => void;
}
