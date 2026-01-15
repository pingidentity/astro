import React, { forwardRef, Key, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import {
  useTable,
  useTableCell,
  useTableColumnHeader,
  useTableHeaderRow,
  useTableRow,
  useTableRowGroup,
  useTableSelectAllCheckbox,
  useTableSelectionCheckbox,
} from '@react-aria/table';
import { mergeProps, useResizeObserver } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useTableColumnResizeState, useTableState } from '@react-stately/table';
import type { GridNode } from '@react-types/grid';

import { Box, CheckboxField, Icon, Loader, Text } from '../..';
import { useGetTheme, useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import type {
  TableBaseProps,
  TableCaptionProps,
  TableCellProps,
  TableCheckboxCellProps,
  TableColumnHeaderProps,
  TableHeaderRowProps,
  TableRowGroupProps,
  TableRowProps,
  TableSelectAllCellProps,
} from '../../types/tableBase';

const useHandleFocusRef = ref => {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleFocus = () => {
      const container = el.closest('.last-column-sticky');
      if (!container) return;

      const cellRect = el.getBoundingClientRect();
      const contRect = container.getBoundingClientRect();

      container.scrollLeft = cellRect.left + contRect.width;
    };

    el.addEventListener('focus', handleFocus);

    // eslint-disable-next-line consistent-return
    return () => {
      el.removeEventListener('focus', handleFocus);
    };
  }, []);
};

const TableBase = forwardRef<HTMLTableElement, TableBaseProps<object>>((props, ref) => {
  const {
    caption,
    selectionMode,
    selectionBehavior,
    hasSelectionCheckboxes,
    isStickyHeader = false,
    className,
    isLastColumnSticky,
    ...others
  } = props;

  const tableRef = useLocalOrForwardRef(ref);
  const headerRef = useRef(null);
  const scrollRef = useRef(null);
  const bodyRef = useRef(null);

  const [tableWidth, setTableWidth] = useState(0);

  const state = useTableState({
    ...props,
    showSelectionCheckboxes: hasSelectionCheckboxes || (selectionMode === 'multiple' && selectionBehavior !== 'replace'),
  });

  const { collection } = state;

  const { gridProps } = useTable(
    {
      ...props,
      scrollRef,
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
      return 70;
    }
    return 100;
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

  const { classNames } = useStatusClasses(className, {
    'has-caption': !!caption,
    'is-last-column-sticky': isLastColumnSticky,
  });

  return (
    <Box ref={scrollRef}>
      <Box
        as="table"
        display="table"
        variant="tableBase.container"
        className={classNames}
        ref={tableRef}
        {...gridProps}
        {...others}
      >
        {caption && (
          <TableCaption caption={caption} />
        )}
        <TableRowGroup
          ref={headerRef}
          type="thead"
          isSticky={isStickyHeader}
        >
          {collection.headerRows.map(headerRow => (
            <TableHeaderRow
              key={headerRow.key}
              item={headerRow}
              state={state}
            >
              {Array.from(headerRow.childNodes).map(column => (
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
        <TableRowGroup
          ref={bodyRef}
          type="tbody"
          {...collection.body.props}
        >
          {
            collection.size === 0 && (
              <Box
                as="tr"
                role="row"
                key="loading"
                data-testid="loading"
                alignItems="center"
                justifyContent="center"
                px="lg"
                py="md"
              >
                <Loader variant="loader.withinDataTable" />
              </Box>
            )
          }
          {Array.from(collection.body.childNodes).map(row => (
            <TableRow key={row.key} item={row} state={state}>
              {Array.from(collection.getChildren!(row.key)).map(cell => (
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
    </Box>
  );
});

const TableCaption = forwardRef<HTMLElement, TableCaptionProps>((props, ref) => {
  const { caption, ...others } = props;

  if (!caption) {
    return null;
  }

  return (
    <Box
      as="caption"
      display="table-caption"
      ref={ref}
      variant="tableBase.caption"
      textAlign="left"
      {...others}
    >
      {caption}
    </Box>
  );
});

const TableRowGroup = forwardRef<
  HTMLTableSectionElement,
  TableRowGroupProps
>((props, ref) => {
  const { type, children, className, isSticky, ...others } = props;
  const { rowGroupProps } = useTableRowGroup();

  const { classNames } = useStatusClasses(className, {
    isSticky: isSticky && type === 'thead',
  });

  return (
    <Box
      as={type}
      display={type === 'thead' ? 'table-header-group' : 'table-row-group'}
      ref={ref}
      className={classNames}
      variant={`tableBase.${type}`}
      tabIndex="0"
      {...rowGroupProps}
      {...others}
    >
      {children}
    </Box>
  );
});

function TableHeaderRow<T>(props: TableHeaderRowProps<T>) {
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
}

function TableColumnHeader<T>(props: TableColumnHeaderProps<T>) {
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

  useHandleFocusRef(ref);

  return (
    <Box
      as="th"
      display="table-cell"
      ref={ref}
      variant="tableBase.head"
      className={classNames}
      sx={{
        width: layoutState?.getColumnWidth(column.key),
        ...column.props.sx,
      }}
      {...mergeProps(columnHeaderProps, focusProps, column.props)}
    >
      <Box isRow gap="sm" alignItems="center">
        <Text>{column.rendered}</Text>
        {allowsSorting && sortIcon}
      </Box>
    </Box>
  );
}

function TableRow<T>(props: TableRowProps<T>) {
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
      display="table-row"
      className={classNames}
      variant="tableBase.row"
      {...mergeProps(rowProps, focusProps, hoverProps, pressProps)}
      ref={ref}
    >
      {children}
    </Box>
  );
}

function TableCell<T>(props: TableCellProps<T>) {
  const { cell, state, className, layoutState } = props;

  const ref = useRef<HTMLTableCellElement | null>(null);

  const { gridCellProps } = useTableCell({ node: cell }, state, ref);

  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
  });

  useHandleFocusRef(ref);

  return (
    <Box
      as="td"
      display="table-cell"
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
      display="table-cell"
      variant="tableBase.head"
      sx={{
        width: layoutState?.getColumnWidth(column.key),
      }}
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

function TableCheckboxCell<T>(props: TableCheckboxCellProps<T>) {
  const { cell, state, layoutState } = props;
  const ref = useRef<HTMLTableCellElement | null>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { checkboxProps } = useTableSelectionCheckbox(
    { key: String(cell.parentKey) },
    state,
  );

  return (
    <Box
      as="td"
      display="table-cell"
      variant="tableBase.data"
      sx={{
        width: layoutState?.getColumnWidth((cell.column as GridNode<T>).key),
        ...cell.props.sx,
      }}
      {...gridCellProps}
      ref={ref}
    >
      <CheckboxField {...checkboxProps} />
    </Box>
  );
}

export default TableBase;
