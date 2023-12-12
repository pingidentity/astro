import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import {
  FocusRing,
  mergeProps,
  useFocusRing,
  VisuallyHidden,
} from 'react-aria';
import MenuDownIcon from '@pingux/mdi-react/MenuDownIcon';
import MenuUpIcon from '@pingux/mdi-react/MenuUpIcon';
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
import PropTypes from 'prop-types';

import {
  DataTableContext,
  useDataTableContext,
} from '../../context/DataTableContext';
import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { Box, Icon, Loader } from '../../index';

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
  },
};

const DataTable = forwardRef((props, ref) => {
  const scale = 'large';
  const direction = 'ltr';
  const {
    onAction,
  } = props;

  const getDefaultWidth = useCallback();

  const getDefaultMinWidth = useCallback(({ props: {
    hideHeader, showDivider,
  } }) => {
    if (hideHeader) {
      const width = DEFAULT_HIDE_HEADER_CELL_WIDTH[scale];
      /* istanbul ignore next */
      return showDivider ? width + 1 : width;
    }
    return 75;
  }, [scale]);

  // Starts when the user selects resize from the menu, ends when resizing ends
  // used to control the visibility of the resizer Nubbin
  const [isInResizeMode, setIsInResizeMode] = useState(false);
  // entering resizing/exiting resizing doesn't trigger a render
  // with table layout, so we need to track it here
  const state = useTableState({
    ...props,
  });

  const domRef = useLocalOrForwardRef(ref);
  const headerRef = useRef();
  const bodyRef = useRef();

  const density = props.density || 'regular';
  const columnLayout = useMemo(
    () => new TableColumnLayout({
      getDefaultWidth,
      getDefaultMinWidth,
    }),
    [getDefaultWidth, getDefaultMinWidth],
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
      ? null
      : DEFAULT_HEADER_HEIGHT[scale],
    estimatedHeadingHeight: props.overflowMode === 'wrap'
      ? DEFAULT_HEADER_HEIGHT[scale]
      : null,
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

    if (style.overflow === 'hidden') {
      style.overflow = 'visible'; // needed to support position: sticky
    }

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
        return null;
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
            />
          </CenteredWrapper>
        );
      default:
        return null;
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
    bodyRef.current.scrollLeft = headerRef.current.scrollLeft;
  };

  const mergedProps = mergeProps(
    gridProps,
    focusProps,
  );

  return (
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
  );
});

DataTable.propTypes = {
  /**
    * Sets the amount of vertical padding within each cell.
    * density: 'compact' | 'regular' | 'spacious'
    * @default 'regular'
  */
  density: PropTypes.string,
  /** Sets the height of table. */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Determine if the header should be hidden. */
  hasHiddenHeader: PropTypes.bool,
  /** Bool that determines if the items are sortable. */
  isSortable: PropTypes.bool,
  /** The list of DataTable items. */
  items: PropTypes.arrayOf(PropTypes.shape({})),
  /** Reflects current loading state. */
  loadingState: PropTypes.oneOf(['error', 'filtering', 'idle', 'loading', 'loadingMore', 'sorting']),
  /** Handler that is called when a user performs an action on a row. */
  onAction: PropTypes.func,
  /**
   * Sets the overflow behavior for the cell contents.
   * overflowMode: 'wrap' | 'truncate'
   * @default 'truncate'
   */
  overflowMode: PropTypes.string,
  /** Callback function that fires when more data should be loaded on demand as user scrolls. */
  onLoadMore: PropTypes.func,
  /** Callback function that fires when sortable column header is pressed. */
  onSortChange: PropTypes.func,
  /** Defines the current column key to sort by and the sort direction. */
  sortDescriptor: PropTypes.oneOfType([
    PropTypes.shape({
      column: PropTypes.string,
      direction: PropTypes.oneOf(['ascending', 'descending']),
    }),
    PropTypes.string]),
  /** Sets the width of table. */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DataTable.defaultProps = {
  width: '100%',
  height: 565,
};

const TableHeader = ({ children, ...otherProps }) => {
  const { rowGroupProps } = useTableRowGroup();

  return (
    <Box {...rowGroupProps} {...otherProps}>
      {children}
    </Box>
  );
};

const TableColumnHeader = props => {
  const { column, isFirst, isLast } = props;
  const ref = useRef(null);
  const { state } = useDataTableContext();
  const { columnHeaderProps } = useTableColumnHeader(
    {
      node: column,
      isVirtualized: true,
    },
    state,
    ref,
  );

  const columnProps = column.props;
  const arrowIcon = state.sortDescriptor?.direction === 'ascending'
    && column.key === state.sortDescriptor?.column ? (
      <Icon size={24} icon={MenuUpIcon} title={{ name: 'Menu Up Icon' }} />
    ) : (
      <Icon size={24} icon={MenuDownIcon} color="active" title={{ name: 'Menu Down Icon' }} />
    );
  const allProps = [columnHeaderProps];

  const { classNames } = useStatusClasses({
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
        {...mergeProps(...allProps, column.props.cellProps)}
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
    <Box {...rowGroupProps} {...otherProps}>
      {children}
    </Box>
  );
};

const TableRow = ({ item, children, hasActions, ...otherProps }) => {
  const ref = useRef();
  const { state } = useDataTableContext();
  const { rowProps } = useTableRow(
    {
      node: item,
      isVirtualized: true,
    },
    state,
    ref,
  );

  const {
    isFocusVisible: isFocusVisibleWithin,
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { isFocusVisible, focusProps } = useFocusRing();

  const props = mergeProps(rowProps, otherProps, focusWithinProps, focusProps);

  const { classNames } = useStatusClasses({
    'is-row-focus-visible': isFocusVisible || isFocusVisibleWithin,
  });

  return (
    <Box
      {...props}
      ref={ref}
      variant="dataTable.tableRow"
      className={classNames}
    >
      {children}
    </Box>
  );
};

const TableHeaderRow = ({ item, children, style }) => {
  const { state } = useDataTableContext();
  const ref = useRef();

  const { rowProps } = useTableHeaderRow(
    { node: item, isVirtualized: true },
    state,
    ref,
  );

  return (
    <Box {...rowProps} ref={ref} style={style}>
      {children}
    </Box>
  );
};

const TableCell = ({ cell }) => {
  const { state } = useDataTableContext();
  const ref = useRef();

  const columnProps = cell.column.props;

  const { gridCellProps } = useTableCell(
    {
      node: cell,
      isVirtualized: true,
    },
    state,
    ref,
  );

  const { classNames } = useStatusClasses({
    [`is-align-${columnProps.align}`]: columnProps.align,
  });

  return (
    <FocusRing focusRingClass="is-key-focused">
      <Box
        pl={cell.index === 0 ? 0 : 'lg'}
        ref={ref}
        variant="dataTable.tableCell"
        className={classNames}
        {...mergeProps(gridCellProps, cell.props.cellProps)}
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
      <Box role="rowheader" aria-colspan={state.collection.columns.length}>
        {children}
      </Box>
    </Box>
  );
};

TableCell.propTypes = {
  cell: PropTypes.shape({
    column: PropTypes.shape({
      props: PropTypes.shape({
        align: PropTypes.string,
      }),
    }),
    index: PropTypes.number,
    parentKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    props: PropTypes.shape({
      cellProps: PropTypes.shape({}),
    }),
    rendered: PropTypes.node,
  }),
};

TableHeaderRow.propTypes = {
  children: PropTypes.node,
  item: PropTypes.shape({}),
  style: PropTypes.shape({}),
};

TableRow.propTypes = {
  children: PropTypes.node,
  hasActions: PropTypes.func,
  item: PropTypes.shape({}),
};

TableColumnHeader.propTypes = {
  column: PropTypes.shape({
    index: PropTypes.number,
    key: PropTypes.string,
    props: PropTypes.shape({
      align: PropTypes.string,
      allowsSorting: PropTypes.bool,
      cellProps: PropTypes.shape({}),
      hideHeader: PropTypes.bool,
    }),
    rendered: PropTypes.node,
  }),
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};


export default DataTable;
