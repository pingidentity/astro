import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import {
  FocusRing,
  mergeProps,
  useFocusRing,
  VisuallyHidden,
} from 'react-aria';
import { TableStateProps } from 'react-stately';
import { useHover } from '@react-aria/interactions';
import {
  useTable,
  useTableCell,
  useTableColumnHeader,
  useTableHeaderRow,
  useTableRow,
  useTableRowGroup,
} from '@react-aria/table';
import { layoutInfoToStyle, VirtualizerItem } from '@react-aria/virtualizer';
import { TableLayout } from '@react-stately/layout';
import { TableColumnLayout, useTableState } from '@react-stately/table';

import {
  DataTableContext,
  useDataTableContext,
} from '../../context/DataTableContext';
import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import useGetTheme from '../../hooks/useGetTheme';
import { Box, BoxProps, DataTableCellProps, DataTableColumnHeader, DataTableHeaderRowProps, DataTableProps, DataTableRowProps, GetDefaultMinWidth, Icon, Loader } from '../../index';

import DataTableVirtualizer from './DataTableVirtualizer';

const DEFAULT_HEADER_HEIGHT = {
  medium: 34,
  large: 40,
};

const DEFAULT_HIDE_HEADER_CELL_WIDTH = {
  medium: 38,
  large: 46,
};

const ROW_HEIGHTS = {
  compact: {
    medium: 32,
    large: 40,
  },
  regular: {
    medium: 40,
    large: 50,
  },
  spacious: {
    medium: 48,
    large: 60,
    xl: 74,
  },
};

const DataTable = forwardRef<HTMLDivElement, DataTableProps>((props, ref) => {
  const {
    defaultSelectedKeys = [],
    selectionMode,
    selectedKeys,
    ...others
  } = props;

  const direction = 'ltr';

  const {
    onAction,
    scale = 'large',
  } = props;

  // const getDefaultWidth = useCallback(() => null, []) as GetDefaultWidth;

  const getDefaultMinWidth = useCallback(({ props: {
    hideHeader, showDivider,
  } }) => {
    if (hideHeader) {
      const width = DEFAULT_HIDE_HEADER_CELL_WIDTH[scale];
      /* istanbul ignore next */
      return showDivider ? width + 1 : width;
    }
    return 75;
  }, [scale]) as GetDefaultMinWidth;

  // Starts when the user selects resize from the menu, ends when resizing ends
  // used to control the visibility of the resizer Nubbin
  const [isInResizeMode, setIsInResizeMode] = useState(false);
  // entering resizing/exiting resizing doesn't trigger a render
  // with table layout, so we need to track it here

  // there appears to be a quirky feature in useTableState where uncontrolled selection
  // will not work unless the defaultSelectedKeys array is supplied.
  const state = useTableState({
    ...others,
    selectionMode,
    selectedKeys,
    defaultSelectedKeys: selectedKeys ? undefined : defaultSelectedKeys,
  } as TableStateProps<object>);

  const domRef = useLocalOrForwardRef(ref);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const density = props.density || 'regular';
  const columnLayout = useMemo(
    () => new TableColumnLayout({
      getDefaultMinWidth,
    }),
    [getDefaultMinWidth],
  );

  const layout = useMemo(() => new TableLayout({
    // If props.rowHeight is auto,
    // then use estimated heights based on scale, otherwise use fixed heights.
    rowHeight: props.overflowMode === 'wrap'
      ? null
      : ROW_HEIGHTS[density][scale],
    estimatedRowHeight: props.overflowMode === 'wrap'
      ? ROW_HEIGHTS[density][scale]
      : null,
    headingHeight: props.overflowMode === 'wrap'
      ? undefined
      : DEFAULT_HEADER_HEIGHT[scale],
    estimatedHeadingHeight: props.overflowMode === 'wrap'
      ? DEFAULT_HEADER_HEIGHT[scale]
      : undefined,
    columnLayout,
    initialCollection: state.collection,
  }),
  // don't recompute when state.collection changes, only used for initial value
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [props.overflowMode, scale, density, columnLayout],
  );

  const { gridProps } = useTable({
    ...props,
    isVirtualized: true,
    layout,
    onRowAction: onAction,
  }, state, domRef);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);

  // This overrides collection view's renderWrapper to support DOM hierarchy.
  const renderWrapper = (parent, reusableView, children, renderChildren) => {
    const style = layoutInfoToStyle(
      reusableView.layoutInfo,
      direction,
      parent && parent.layoutInfo,
    );

    if (reusableView.viewType === 'rowgroup') {
      return (
        <TableRowGroup key={reusableView.key} style={style}>
          {renderChildren(children)}
        </TableRowGroup>
      );
    }

    if (reusableView.viewType === 'header') {
      return (
        <TableHeader key={reusableView.key} style={style}>
          {renderChildren(children)}
        </TableHeader>
      );
    }

    if (reusableView.viewType === 'row') {
      return (
        <TableRow
          key={reusableView.key}
          item={reusableView.content}
          style={style}
          hasActions={onAction}
        >
          {renderChildren(children)}
        </TableRow>
      );
    }

    if (reusableView.viewType === 'headerrow') {
      return (
        <TableHeaderRow
          key={reusableView.key}
          style={style}
          item={reusableView.content}
        >
          {renderChildren(children)}
        </TableHeaderRow>
      );
    }

    return (
      <VirtualizerItem
        key={reusableView.key}
        reusableView={reusableView}
        parent={parent}
      />
    );
  };

  // Overrides default renderView
  const renderView = (type, item) => {
    const isFirstColumn = item?.column?.index === 0;
    const isLastColumn = item?.column?.index === state.collection.columnCount - 1;

    switch (type) {
      case 'header':
      case 'rowgroup':
      case 'row':
      case 'headerrow':
        return undefined;
      case 'cell': {
        return <TableCell cell={item} />;
      }
      case 'column':
        return <TableColumnHeader column={item} isFirst={isFirstColumn} isLast={isLastColumn} />;
      case 'loader':
        return (
          <CenteredWrapper>
            <Loader
              color="accent.70"
              aria-label={state.collection.size > 0 ? 'loadingMore' : 'loading'}
              sx={{ gap: '9px' }}
              dotProps={{ sx: { m: 0 } }}
            />
          </CenteredWrapper>
        );
      default:
        return undefined;
    }
  };

  const viewport = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const onVisibleRectChange = useCallback(e => {
    if (viewport.current.width === e.width && viewport.current.height === e.height) {
      return;
    }
    viewport.current = e;
  }, []);

  const { isFocusVisible, focusProps } = useFocusRing();
  const isEmpty = state.collection.size === 0;

  const onFocusedResizer = () => {
    /* istanbul ignore next */
    if (bodyRef.current && headerRef.current) {
      bodyRef.current.scrollLeft = headerRef.current.scrollLeft;
    }
  };

  const mergedProps = mergeProps(
    gridProps,
    focusProps,
  );

  return (
    <Box variant="dataTable.container">
      <DataTableContext.Provider
        value={{
          state,
          layout,
          isInResizeMode,
          setIsInResizeMode,
          isEmpty,
          onFocusedResizer,
          headerMenuOpen,
          setHeaderMenuOpen,
        }}
      >
        <DataTableVirtualizer
          {...mergedProps}
          layout={layout}
          collection={state.collection}
          renderView={renderView}
          renderWrapper={renderWrapper}
          onVisibleRectChange={onVisibleRectChange}
          domRef={domRef}
          headerRef={headerRef}
          bodyRef={bodyRef}
          isFocusVisible={isFocusVisible}
          height={props.height}
          style={{
            whiteSpace: props.overflowMode === 'wrap' ? 'normal' : 'initial',
          }}
        />
      </DataTableContext.Provider>
    </Box>
  );
});

const TableHeader = ({ children, ...otherProps }) => {
  const { rowGroupProps } = useTableRowGroup();

  return (
    <Box {...rowGroupProps as BoxProps} {...otherProps}>
      {children}
    </Box>
  );
};

const TableColumnHeader = (props: DataTableColumnHeader) => {
  const { column, isFirst, isLast } = props;
  const ref = useRef(null);
  const { state } = useDataTableContext();
  const { icons } = useGetTheme();
  const {
    MenuUp,
    MenuDown,
  } = icons;
  const { columnHeaderProps } = useTableColumnHeader(
    {
      node: column,
      isVirtualized: true,
    },
    state,
    ref,
  );

  const columnProps = column.props;
  const arrowIcon = state.sortDescriptor?.direction === 'ascending' && column.key === state.sortDescriptor?.column
    ? (
      <Icon size={24} icon={MenuUp} title={{ name: 'Menu Up Icon' }} />
    ) : (
      <Icon size={24} icon={MenuDown} color="active" title={{ name: 'Menu Down Icon' }} />
    );
  const allProps = [columnHeaderProps];

  const { classNames } = useStatusClasses('', {
    'is-column-sortable': columnProps.allowsSorting,
    [`is-align-${columnProps.align}`]: columnProps.align,
    'is-first-column': isFirst,
    'is-last-column': isLast,
  });

  return (
    <FocusRing focusRingClass="is-key-focused" focusClass="is-click-focused">
      <Box
        pl={column.index === 0 ? 0 : 'lg'}
        ref={ref}
        variant="dataTable.tableHeadCell"
        className={classNames}
        {...mergeProps(...allProps, column.props)}
      >
        {columnProps.hideHeader ? (
          <VisuallyHidden>{column.rendered}</VisuallyHidden>
        ) : (
          <Box>{column.rendered}</Box>
        )}
        {columnProps.allowsSorting
          && state.sortDescriptor?.column === column.key
          && <Box>{arrowIcon}</Box>}
      </Box>
    </FocusRing>
  );
};

const TableRowGroup = ({ children, ...otherProps }) => {
  const { rowGroupProps } = useTableRowGroup();

  return (
    <Box {...rowGroupProps as BoxProps} {...otherProps}>
      {children}
    </Box>
  );
};

const TableRow = ({ item, children, hasActions, ...otherProps }: DataTableRowProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { state } = useDataTableContext();
  const { rowProps } = useTableRow(
    {
      node: item,
      isVirtualized: true,
      shouldSelectOnPressUp: true,
    },
    state,
    ref,
  );

  const isSelectable = state.selectionManager.selectionMode !== 'none';

  const isSelected = state.selectionManager.isSelected(item.key);
  const isDisabled = state.disabledKeys.has(item.key);

  const {
    isFocusVisible: isFocusVisibleWithin,
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { isFocusVisible, focusProps } = useFocusRing();

  const { hoverProps, isHovered } = useHover({});

  const props = mergeProps(otherProps, focusWithinProps, focusProps, rowProps, hoverProps);

  const { classNames } = useStatusClasses('', {
    'is-row-focus-visible': isFocusVisible || isFocusVisibleWithin,
    isSelectable,
    isSelected,
    isHovered,
    isDisabled,
  });

  const variant = isSelectable ? 'dataTable.selectableTableRow' : 'dataTable.tableRow';

  return (
    <Box
      {...props as BoxProps}
      ref={ref}
      variant={variant}
      className={classNames}
    >
      {children}
    </Box>
  );
};

const TableHeaderRow = ({ item, children, style }: DataTableHeaderRowProps) => {
  const { state } = useDataTableContext();
  const ref = useRef<HTMLDivElement>(null);

  const { rowProps } = useTableHeaderRow(
    { node: item, isVirtualized: true, shouldSelectOnPressUp: true },
    state,
    ref,
  );

  return (
    <Box {...rowProps as BoxProps} ref={ref} style={style}>
      {children}
    </Box>
  );
};

const TableCell = ({ cell }: DataTableCellProps) => {
  const { state } = useDataTableContext();
  const ref = useRef<HTMLDivElement>(null);

  const columnProps = cell.column?.props;

  const { gridCellProps } = useTableCell(
    {
      node: cell,
      isVirtualized: true,
      shouldSelectOnPressUp: true,
    },
    state,
    ref,
  );

  const { classNames } = useStatusClasses('', {
    [`is-align-${columnProps.align}`]: columnProps.align,
  });

  return (
    <FocusRing focusRingClass="is-key-focused">
      <Box
        pl={cell.index === 0 ? 0 : 'lg'}
        ref={ref}
        variant="dataTable.tableCell"
        className={classNames}
        {...mergeProps(gridCellProps, cell.props)}
      >
        <Box variant="dataTable.tableCellContents">
          {cell.rendered}
        </Box>
      </Box>
    </FocusRing>
  );
};

const CenteredWrapper = ({ children }) => {
  const { state } = useDataTableContext();
  return (
    <Box
      role="row"
      aria-rowindex={
        state.collection.headerRows.length + state.collection.size + 1
      }
      variant="dataTable.tableCenteredWrapper"
    >
      <Box role="rowheader" aria-colspan={state.collection.columns.length} variant="dataTable.rowHeader">
        {children}
      </Box>
    </Box>
  );
};


export default DataTable;
