import React, { forwardRef, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import {
  useTable,
  useTableCell,
  useTableColumnHeader,
  useTableColumnResize,
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
  ResizerProps,
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
    onResizeStart,
    onResize,
    onResizeEnd,
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
                      onResizeStart={onResizeStart}
                      onResize={onResize}
                      onResizeEnd={onResizeEnd}
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
            <TableRow
              key={row.key}
              item={row}
              state={state}
              hasSelectionCheckboxes={hasSelectionCheckboxes}
            >
              {Array.from(collection.getChildren?.(row.key) ?? []).map(cell => (
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

function Resizer<T>(props: ResizerProps<T>) {
  const { column, layoutState, triggerRef, onResizeStart, onResize, onResizeEnd } = props;
  const ref = useRef<HTMLInputElement | null>(null);
  const { resizerProps, inputProps } = useTableColumnResize(
    {
      column,
      'aria-label': `${column.textValue} column width`,
      triggerRef,
      onResizeStart,
      onResize,
      onResizeEnd,
    },
    layoutState,
    ref,
  );
  const { isFocusVisible, focusProps } = useFocusRing();

  // The input must be nested inside the Box that carries resizerProps so that
  // keyboard events fired on the input (Enter to start resize, Escape/Tab to
  // end it) bubble up to the element with the keyboard handlers.

  const { classNames } = useStatusClasses('', {
    isFocused: isFocusVisible,
  });

  return (
    <Box
      role="presentation"
      variant="tableBase.resizer"
      className={classNames}
      {...resizerProps}
    >
      <input
        ref={ref}
        {...mergeProps(inputProps, focusProps)}
      />
    </Box>
  );
}

function TableColumnHeader<T>(props: TableColumnHeaderProps<T>) {
  const { column, state, className, layoutState, onResizeStart, onResize, onResizeEnd } = props;

  const ref = useRef<HTMLTableCellElement | null>(null);

  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );

  // within: true catches keyboard focus on the resizer <input> child so the
  // <th> shows its focus ring even when the child is the active element.
  const { isFocusVisible, focusProps } = useFocusRing({ within: true });

  const allowsSorting = column.props?.allowsSorting;
  const allowsResizing = column.props?.allowsResizing;

  const { icons } = useGetTheme();
  const { Ascending, Descending } = icons;

  const sortDescriptor = state.sortDescriptor;
  const isSortedAscending = sortDescriptor?.column === column.key && sortDescriptor?.direction === 'ascending';
  const arrowIcon = isSortedAscending ? Ascending : Descending;

  const sortIcon = (
    <Icon
      icon={arrowIcon}
      size="xs"
      aria-hidden="true"
      title={{
        name: isSortedAscending ? 'Sort ascending' : 'Sort descending',
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
        position: 'relative',
        ...column.props.sx,
      }}
      {...mergeProps(columnHeaderProps, focusProps, column.props)}
    >
      <Box isRow gap="sm" alignItems="center">
        <Text
          as="h4"
          variant="headText"
        >
          {column.rendered}
        </Text>
        {allowsSorting && sortIcon}
      </Box>
      {allowsResizing && (
        <Resizer
          column={column}
          layoutState={layoutState}
          onResizeStart={onResizeStart}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />
      )}
    </Box>
  );
}

function TableRow<T>(props: TableRowProps<T>) {
  const { item, state, children, className, hasSelectionCheckboxes } = props;

  const ref = useRef<HTMLTableRowElement | null>(null);

  const { rowProps } = useTableRow({ node: item }, state, ref);

  const isSelected = state.selectionManager.isSelected(item.key);

  const isDisabled = state.disabledKeys.has(item.key);

  const { isFocusVisible, focusProps } = useFocusRing();

  const { hoverProps, isHovered } = useHover({});

  // allowTextSelectionOnPress: true prevents the press handler from suppressing
  // native text-selection drags (user-select: none is not applied on pointer down).
  // When hasSelectionCheckboxes is true, isDisabled: true disables the visual
  // isPressed state — selection is handled solely by the checkbox cells.
  const { pressProps, isPressed } = usePress({
    ref,
    allowTextSelectionOnPress: true,
    isDisabled: !!hasSelectionCheckboxes,
  });

  // React Aria's useSelectableItem only maps Space to selection (not Enter).
  // Enter is reserved for "action" which is unused here, so we manually toggle
  // selection on Enter to match expected keyboard behavior.
  const enterKeyProps = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    if (isDisabled || state.selectionManager.selectionMode === 'none') return;
    e.preventDefault();
    state.selectionManager.toggleSelection(item.key);
  }, [isDisabled, item.key, state.selectionManager]);

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
      {...mergeProps(rowProps, focusProps, hoverProps, pressProps, { onKeyDown: enterKeyProps })}
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

  // Prevents pointer events reaching the row's press handler, allowing native text-selection drags.
  const stopPointerPropagation = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
  }, []);

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
      {...mergeProps(
        { onPointerDown: stopPointerPropagation, onMouseDown: stopPointerPropagation },
        gridCellProps,
        focusProps,
        cell.props,
      )}
    >
      {cell.rendered}
    </Box>
  );
}

// Native checkboxes only toggle on Space, not Enter. This handler makes Enter
// behave the same as Space by calling the checkbox's onChange callback.
const handleCheckboxEnterKey = (
  onChange: ((v: boolean) => void) | undefined,
  isSelected: boolean | undefined,
) => (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    onChange?.(!isSelected);
  }
};

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
              onKeyDown: handleCheckboxEnterKey(checkboxProps.onChange, checkboxProps.isSelected),
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
      <CheckboxField
        checkBoxProps={{
          onKeyDown: handleCheckboxEnterKey(checkboxProps.onChange, checkboxProps.isSelected),
        }}
        {...checkboxProps}
      />
    </Box>
  );
}

export default TableBase;
