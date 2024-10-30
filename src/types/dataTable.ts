import { Key, ReactElement, ReactNode, RefObject } from 'react';
import { Layout, ReusableView } from '@react-stately/virtualizer';
import type { GridNode } from '@react-types/grid';
import type { ColumnSize, TableCollection } from '@react-types/table';

import { BadgeProps } from './badge';
import { IconTypeExtended } from './icon';
import { loadingState } from './shared';

export interface DataTableBadgeProps extends BadgeProps {
  cell?: string
}

export interface MultiLineCell {
  name?: string,
  accountId?: number | string,
  icon?: IconTypeExtended;
  key?: Key
}

export interface DataTableMultiLineProps {
  cell: MultiLineCell[]
}

export interface DataTableItem {
  type: string
}

export interface DataTableVirtualizerProps<T extends object, V> {
  renderWrapper: (
    parent: ReusableView<T, V> | null,
    reusableView: ReusableView<T, V>,
    children: ReusableView<T, V>[],
    renderChildren: (views: ReusableView<T, V>[]) => ReactElement[]
  ) => ReactElement,
  collection: TableCollection<T>
  layout: Layout<T>,
  focusedKey?: Key,
  sizeToFit?: 'width' | 'height',
  scrollDirection?: 'horizontal' | 'vertical' | 'both',
  isLoading?: boolean,
  onLoadMore?: () => void,
  shouldUseVirtualFocus?: boolean,
  scrollToItem?: (key: Key) => void,
  autoFocus?: boolean,
  children?: ReactNode | ((type: string, content: T | ReactNode) => V),
  renderView: (type: string, content: T) => V | undefined,
  domRef: RefObject<HTMLDivElement>,
  bodyRef: RefObject<HTMLDivElement>,
  onVisibleRectChange(rect: object): void,
  headerRef: RefObject<HTMLDivElement>,
  isFocusVisible?: boolean,
  height?: string | number,
  style?: {
    whiteSpace?: 'normal' | 'initial'
  }
}

export interface DataTableProps {
  onSelectedKeyChange?: () => void,
  selectedKeys?: Key[],
  defaultSelectedKeys?: Key[],
  selectionMode?: 'single' | 'none'
  'aria-label'?: string,
  onAction?: () => void,
  density?: 'compact' | 'medium' | 'spacious',
  height?: string | number,
  hasHiddenHeader?: boolean,
  isSortable?: boolean,
  items?: Iterable<object>,
  overflowMode?: 'wrap' | 'truncate',
  onLoadMore?: () => void,
  onSortChange?: () => void,
  loadingState?: loadingState,
  sortDescriptor?: {
    column?: string,
    direction?: 'ascending' | 'descending'
  },
  width?: string | number,
  children: ReactNode,
  scale?: 'large' | 'medium' | 'xl'
}

export interface DataTableCellProps {
  cell: GridNode<object>
}

export interface DataTableHeaderRowProps {
  item: GridNode<object>
  children: ReactNode,
  style: object
}

export interface DataTableRowProps {
  item: GridNode<object>
  children: ReactNode,
  hasActions?: () => void,
  style: object,
}

export interface DataTableColumnHeader {
  column: GridNode<object>,
  isFirst: boolean,
  isLast: boolean,
  align?: string,
  hideHeader?: boolean
}

export type GetDefaultMinWidth = (column: GridNode<object>) => ColumnSize | null | undefined;
