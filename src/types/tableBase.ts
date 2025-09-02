import { ReactNode } from 'react';
import type { TableState } from '@react-stately/table';
import { TableColumnResizeState } from '@react-stately/table';
import type { GridNode } from '@react-types/grid';
import type { Node } from '@react-types/shared';
import type { TableProps } from '@react-types/table';

import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';
import { DOMAttributes } from './shared';

export interface BaseProp extends BoxProps, TestingAttributes, DOMAttributes{
}

export interface TableBaseProps<T extends object> extends TableProps<T>, Omit<BaseProp, 'children'> {
  'aria-label'?: string;
  selectionMode?: 'none' | 'single' | 'multiple',
  selectionBehavior?: 'replace' | 'toggle',
  hasSelectionCheckboxes?: boolean;
  'data-testid'?: string;
  caption?: ReactNode | string;
  tableBodyProps?: Record<string, unknown>;
  isStickyHeader?: boolean;
}

export interface TableRowGroupProps extends BaseProp{
  type: 'thead' | 'tbody' | 'tfoot';
  children: ReactNode;
  hasCaption?: boolean;
  isSticky?: boolean;
}

export interface TableHeaderRowProps<T> extends BaseProp{
  item: Node<T>;
  state: TableState<T>;
  children: ReactNode;
  className?: string;
}

export interface TableColumnHeaderProps<T> extends BaseProp{
  column: GridNode<T>;
  state: TableState<T>;
  className?: string;
  layoutState: TableColumnResizeState<T>;
}

export interface TableRowProps<T> extends BaseProp{
  item: Node<T>;
  state: TableState<T>;
  children: ReactNode;
  className?: string;
}

export interface TableCellProps<T> extends BaseProp{
  cell: GridNode<T>;
  state: TableState<T>;
  className?: string;
  layoutState: TableColumnResizeState<T>;
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
