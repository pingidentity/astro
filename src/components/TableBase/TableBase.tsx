import React, { forwardRef, useRef } from 'react';
import { TableStateProps } from 'react-stately';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import {
  useTable,
  useTableCell,
  useTableColumnHeader,
  useTableHeaderRow,
  useTableRow,
  useTableRowGroup,
} from '@react-aria/table';
import { mergeProps } from '@react-aria/utils';
import { useTableState } from '@react-stately/table';

import { Box } from '../..';
import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import type {
  TableBaseProps,
  TableCellProps,
  TableColumnHeaderProps,
  TableHeaderRowProps,
  TableRowGroupProps,
  TableRowProps,
} from '../../types/tableBase';

const TableBase = forwardRef<HTMLTableElement, TableBaseProps>((props, ref) => {
  const {
    caption,
    selectionMode,
    selectedKeys,
    defaultSelectedKeys = [],
    tableBodyProps,
    ...others
  } = props;

  const state = useTableState({
    ...props,
    selectionMode,
    selectedKeys,
    defaultSelectedKeys: selectedKeys ? undefined : defaultSelectedKeys,
  } as TableStateProps<object>);

  const tableRef = useLocalOrForwardRef(ref);
  const bodyRef = useRef<HTMLTableSectionElement | null>(null);

  const { collection } = state;

  const { gridProps } = useTable(
    {
      ...props,
      'aria-describedby': props['aria-describedby'] || 'table-caption',
      scrollRef: bodyRef,
    },
    state,
    tableRef,
  );

  return (
    <Box
      as="table"
      display="table"
      variant="tableBase.container"
      ref={tableRef}
      {...gridProps}
      {...others}
    >
      {caption && (
        <Box
          as="caption"
          display="table-caption"
          variant="tableBase.caption"
          textAlign="left"
          id={props['aria-describedby'] || 'table-caption'}
        >
          {caption}
        </Box>
      )}
      <TableRowGroup type="thead" hasCaption={!!caption}>
        {collection.headerRows.map(headerRow => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {Array.from(
              state.collection.getChildren?.(headerRow.key) || [],
            ).map(column => (
              <TableColumnHeader
                key={column.key}
                column={column}
                state={state}
              />
            ))}
          </TableHeaderRow>
        ))}
      </TableRowGroup>
      <TableRowGroup ref={bodyRef} type="tbody" {...tableBodyProps}>
        {Array.from(collection).map(row => (
          <TableRow key={row.key} item={row} state={state}>
            {Array.from(state.collection.getChildren!(row.key)).map(cell => (
              <TableCell key={cell.key} cell={cell} state={state} />
            ))}
          </TableRow>
        ))}
      </TableRowGroup>
    </Box>
  );
});
export default TableBase;

export const TableRowGroup = forwardRef<
  HTMLTableSectionElement,
  TableRowGroupProps
>((props, ref) => {
  const { type, children, hasCaption, className, ...others } = props;
  const { rowGroupProps } = useTableRowGroup();

  const { classNames } = useStatusClasses(className, {
    hasCaption,
  });

  return (
    <Box
      ref={ref}
      {...rowGroupProps}
      as={type}
      className={classNames}
      display="table-row-group"
      variant={`tableBase.${type}`}
      {...others}
    >
      {children}
    </Box>
  );
});

export const TableHeaderRow = (props: TableHeaderRowProps) => {
  const { item, state, children } = props;
  const ref = useRef<HTMLTableRowElement | null>(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <Box
      as="tr"
      display="table-row"
      {...rowProps}
      ref={ref}
    >
      {children}
    </Box>
  );
};

export const TableColumnHeader = (props: TableColumnHeaderProps) => {
  const { column, state, className } = props;

  const ref = useRef<HTMLTableCellElement | null>(null);

  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );

  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
  });

  return (
    <Box
      as="th"
      display="table-cell"
      variant="tableBase.head"
      className={classNames}
      {...mergeProps(columnHeaderProps, focusProps)}
      ref={ref}
      {...column.props}
    >
      {column.rendered}
    </Box>
  );
};

export const TableRow = (props: TableRowProps) => {
  const { item, state, children, className } = props;

  const ref = useRef<HTMLTableRowElement | null>(null);

  const { rowProps } = useTableRow({ node: item }, state, ref);

  const isSelected = state.selectionManager.isSelected(item.key);
  const { isFocusVisible, focusProps } = useFocusRing();

  const { hoverProps, isHovered } = useHover({});
  const { pressProps, isPressed } = usePress({ ref });

  const { classNames } = useStatusClasses(className, {
    isSelected,
    isHovered,
    isPressed,
    isFocused: isFocusVisible,
  });

  return (
    <Box
      display="table-row"
      as="tr"
      className={classNames}
      variant="tableBase.row"
      {...mergeProps(rowProps, focusProps, hoverProps, pressProps)}
      ref={ref}
    >
      {children}
    </Box>
  );
};

export function TableCell(props: TableCellProps) {
  const { cell, state, className } = props;

  const ref = useRef<HTMLTableCellElement | null>(null);

  const { gridCellProps } = useTableCell({ node: cell }, state, ref);

  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
    noWrap: cell.props.noWrap ?? false,
  });

  return (
    <Box
      as="td"
      display="table-cell"
      className={classNames}
      {...mergeProps(gridCellProps, focusProps)}
      variant="tableBase.data"
      ref={ref}
      {...cell.props}
    >
      {cell.rendered}
    </Box>
  );
}
