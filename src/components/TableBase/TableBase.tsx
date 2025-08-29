import React, { forwardRef, Key, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import {
  useTable,
  useTableCell,
  useTableColumnHeader,
  useTableHeaderRow,
  useTableRow,
  useTableRowGroup,
  useTableSelectAllCheckbox, useTableSelectionCheckbox,
} from '@react-aria/table';
import { mergeProps, useResizeObserver } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useTableColumnResizeState, useTableState } from '@react-stately/table';
import type { GridNode } from '@react-types/grid';

import { Box, Card, CheckboxField, Icon, Loader } from '../..';
import { useGetTheme, useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import type {
  TableBaseProps,
  TableCellProps,
  TableCheckboxCellProps,
  TableColumnHeaderProps,
  TableHeaderRowProps,
  TableRowGroupProps,
  TableRowProps,
  TableSelectAllCellProps,
} from '../../types/tableBase';

const TableBase = forwardRef<HTMLTableElement, TableBaseProps<object>>((props, ref) => {
  const {
    caption,
    selectionMode,
    selectionBehavior,
    tableBodyProps,
    hasSelectionCheckboxes,
    isStickyHeader = false,
    ...others
  } = props;

  const [tableWidth, setTableWidth] = useState(0);

  const state = useTableState({
    ...props,
    showSelectionCheckboxes: hasSelectionCheckboxes || (selectionMode === 'multiple' && selectionBehavior !== 'replace'),
  });

  const tableRef = useLocalOrForwardRef(ref);
  const bodyRef = useRef<HTMLTableSectionElement | null>(null);

  const { collection } = state;

  const { gridProps } = useTable(
    {
      ...props,
      scrollRef: bodyRef,
    },
    state,
    tableRef,
  );

  const getDefaultWidth = useCallback((node: GridNode<object>) => {
    if (node.props.isSelectionCell) {
      return 70;
    }
    return undefined;
  }, []);

  const getDefaultMinWidth = useCallback((node: GridNode<object>) => {
    if (node.props.isSelectionCell) {
      return 50;
    }
    return 70;
  }, []);

  const layoutState = useTableColumnResizeState(
    {
      getDefaultWidth,
      getDefaultMinWidth,
      tableWidth,
    },
    state,
  );

  useLayoutEffect(() => {
    if (tableRef && tableRef.current) {
      setTableWidth(tableRef.current.clientWidth);
    }
  }, [tableRef]);

  useResizeObserver({
    ref: tableRef,
    onResize: () => setTableWidth(tableRef.current.clientWidth),
  });

  return (
    <Card variant="cards.tableWrapper">
      <Box
        as="table"
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
          >
            {caption}
          </Box>
        )}
        <TableRowGroup type="thead" hasCaption={!!caption} isSticky={isStickyHeader}>
          {collection.headerRows.map(headerRow => (
            <TableHeaderRow
              key={headerRow.key}
              item={headerRow}
              state={state}
            >
              {Array.from(
                state.collection.getChildren?.(headerRow.key) || [],
              ).map(column => (
                column.props.isSelectionCell
                  ? (
                    <TableSelectAllCell
                      key={column.key}
                      column={column}
                      state={state}
                      layoutState={layoutState}
                    />
                  )
                  : (
                    <TableColumnHeader
                      key={column.key}
                      column={column}
                      state={state}
                      layoutState={layoutState}
                    />
                  )
              ))}
            </TableHeaderRow>
          ))}
        </TableRowGroup>
        <TableRowGroup ref={bodyRef} type="tbody" {...tableBodyProps}>
          {
            collection.size === 0 && (
              <Box
                role="row"
                key="loading"
                data-testid="loading"
                as="tr"
                alignItems="center"
                justifyContent="center"
                px="lg"
                py="md"
              >
                <Loader color="active" />
              </Box>
            )
          }
          {Array.from(collection).map(row => (
            <TableRow key={row.key} item={row} state={state}>
              {Array.from(state.collection.getChildren!(row.key)).map(cell => (
                cell.props.isSelectionCell
                  ? (
                    <TableCheckboxCell
                      key={cell.key}
                      cell={cell}
                      state={state}
                      layoutState={layoutState}
                    />
                  )
                  : (
                    <TableCell
                      key={cell.key}
                      cell={cell}
                      state={state}
                      layoutState={layoutState}
                    />
                  )
              ))}
            </TableRow>
          ))}
        </TableRowGroup>
      </Box>
    </Card>
  );
});

export default TableBase;

export const TableRowGroup = forwardRef<
  HTMLTableSectionElement,
  TableRowGroupProps
>((props, ref) => {
  const { type, children, hasCaption, className, isSticky, ...others } = props;
  const { rowGroupProps } = useTableRowGroup();

  const { classNames } = useStatusClasses(className, {
    hasCaption,
    isSticky: isSticky && type === 'thead',
  });

  return (
    <Box
      ref={ref}
      as={type}
      className={classNames}
      variant={`tableBase.${type}`}
      {...rowGroupProps}
      {...others}
    >
      {children}
    </Box>
  );
});

export function TableHeaderRow<T>(props: TableHeaderRowProps<T>) {
  const { item, state, children } = props;
  const ref = useRef<HTMLTableRowElement | null>(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <Box
      as="tr"
      isRow
      {...rowProps}
      ref={ref}
    >
      {children}
    </Box>
  );
}

export function TableColumnHeader<T>(props: TableColumnHeaderProps<T>) {
  const { column, state, className, layoutState } = props;

  const ref = useRef<HTMLTableCellElement | null>(null);

  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  const allowsSorting = column.props?.allowsSorting;

  const { icons } = useGetTheme();
  const { Ascending, Descending } = icons;

  const sortDescriptor = state.sortDescriptor;
  const arrowIcon = (sortDescriptor?.column === column.key && sortDescriptor?.direction === 'ascending') ? Ascending : Descending;

  const sortIcon = (
    <Icon
      icon={arrowIcon}
      size="xs"
      aria-hidden="true"
      title={{
        name: sortDescriptor?.direction === 'ascending' ? 'Sort ascending' : 'Sort descending',
      }}
    />
  );

  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
  });

  return (
    <Box
      isRow
      ref={ref}
      as="th"
      variant="tableBase.head"
      className={classNames}
      alignItems="center"
      sx={{
        gap: 'sm',
        width: layoutState?.getColumnWidth(column.key),
        ...column.props.sx,
      }}
      {...mergeProps(columnHeaderProps, focusProps, column.props)}
    >
      {column.rendered}
      {allowsSorting && sortIcon}
    </Box>
  );
}

export function TableRow<T>(props: TableRowProps<T>) {
  const { item, state, children, className } = props;

  const ref = useRef<HTMLTableRowElement | null>(null);

  const { rowProps } = useTableRow({ node: item }, state, ref);

  const isSelected = state.selectionManager.isSelected(item.key);

  const isDisabled = state.disabledKeys.has(item.key);

  const { isFocusVisible, focusProps } = useFocusRing();

  const { hoverProps, isHovered } = useHover({});
  const { pressProps, isPressed } = usePress({ ref });

  const { classNames } = useStatusClasses(className, {
    isSelected,
    isHovered,
    isPressed,
    isFocused: isFocusVisible,
    isDisabled,
  });

  return (
    <Box
      as="tr"
      isRow
      className={classNames}
      variant="tableBase.row"
      {...mergeProps(rowProps, focusProps, hoverProps, pressProps)}
      ref={ref}
    >
      {children}
    </Box>
  );
}

export function TableCell<T>(props: TableCellProps<T>) {
  const { cell, state, className, layoutState } = props;

  const ref = useRef<HTMLTableCellElement | null>(null);

  const { gridCellProps } = useTableCell({ node: cell }, state, ref);

  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
  });

  return (
    <Box
      as="td"
      variant="tableBase.data"
      ref={ref}
      className={classNames}
      sx={{
        width: layoutState?.getColumnWidth((cell.column as GridNode<T>).key),
        ...cell.props.sx,
      }}
      {...mergeProps(gridCellProps, focusProps, cell.props)}
    >
      {cell.rendered}
    </Box>
  );
}

export function TableCheckboxCell<T>(props: TableCheckboxCellProps<T>) {
  const { cell, state, layoutState } = props;
  const ref = useRef<HTMLTableCellElement | null>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey as Key },
    state,
  );

  return (
    <Box
      as="td"
      variant="tableBase.data"
      width={layoutState?.getColumnWidth((cell.column as GridNode<T>).key)}
      {...gridCellProps}
      ref={ref}
    >
      <CheckboxField {...checkboxProps} />
    </Box>
  );
}

function TableSelectAllCell<T>(props: TableSelectAllCellProps<T>) {
  const { column, state, layoutState } = props;
  const ref = useRef<HTMLTableCellElement | null>(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );
  const { checkboxProps } = useTableSelectAllCheckbox(state);

  return (
    <Box
      as="th"
      variant="tableBase.head"
      width={layoutState?.getColumnWidth(column.key)}
      {...columnHeaderProps}
      ref={ref}
    >
      {state.selectionManager.selectionMode === 'single'
        ? <VisuallyHidden>{checkboxProps['aria-label']}</VisuallyHidden>
        : (
          <CheckboxField
            checkBoxProps={{
              'data-testid': 'select-all-checkbox',
            }}
            {...checkboxProps}
          />
        )}
    </Box>
  );
}
