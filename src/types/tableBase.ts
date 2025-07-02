import { Key, ReactNode } from 'react';
import type { TableState } from '@react-stately/table';
import type { GridNode } from '@react-types/grid';
import type { Node } from '@react-types/shared';

import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';
import { DOMAttributes } from './shared';

export interface TableBaseProp extends BoxProps, TestingAttributes, DOMAttributes{
}

export interface TableBaseProps extends TableBaseProp {
  'aria-label'?: string;
  selectedKeys?: Key[],
  defaultSelectedKeys?: Key[],
  selectionMode?: 'single' | 'none',
  'data-testid'?: string;
  caption?: ReactNode | string;
  tableBodyProps?: Record<string, unknown>;
}

export interface TableRowGroupProps extends TableBaseProp {
  type: 'thead' | 'tbody' | 'tfoot';
  children: ReactNode;
  hasCaption?: boolean;
}

export interface TableHeaderRowProps extends TableBaseProp {
  item: Node<object>;
  state: TableState<object>;
  children: ReactNode;
  className?: string;
}

export interface TableColumnHeaderProps extends TableBaseProp {
  column: GridNode<object>;
  state: TableState<object>;
  className?: string;
}

export interface TableRowProps extends TableBaseProp {
  item: Node<object>;
  state: TableState<object>;
  children: ReactNode;
  className?: string;
}

export interface TableCellProps extends TableBaseProp {
  cell: GridNode<object>;
  state: TableState<object>;
  className?: string;
}
