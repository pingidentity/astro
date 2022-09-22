import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { mergeProps } from '@react-aria/utils';
import { FocusRing, useFocusRing } from '@react-aria/focus';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { layoutInfoToStyle, VirtualizerItem } from '@react-aria/virtualizer';
import { useTableColumnResizeState, useTableState } from '@react-stately/table';
import { TableLayout } from '@react-stately/layout';
import {
  useTable,
  useTableCell,
  useTableColumnHeader,
  useTableHeaderRow,
  useTableRow,
  useTableRowGroup,
} from '@react-aria/table';
import PropTypes from 'prop-types';
import MenuDownIcon from 'mdi-react/MenuDownIcon';
import MenuUpIcon from 'mdi-react/MenuUpIcon';
import {
  DataTableContext,
  useDataTableContext,
} from '../../context/DataTableContext';
import DataTableVirtualizer from './DataTableVirtualizer';
import { useStatusClasses } from '../../hooks';
import { Box, Icon, Loader } from '../../index';

const DEFAULT_HEADER_HEIGHT = {
  medium: 34,
  large: 37.5,
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
    large: 75,
  },
};

/**
 * DataTable component using react aria Spectrum TableView
 * Primarily utilizes [TableView](https://react-spectrum.adobe.com/react-spectrum/TableView.html)
 * Cross platform state management react hook for DataTable
 * Primarily utilizes [useTableState](https://react-spectrum.adobe.com/react-stately/useTableState.html)
*/

const DataTable = forwardRef((props, ref) => {
  const {
    width,
    height,
    onAction,
  } = props;
  const direction = 'ltr'; // useLocale override
  const scale = 'large'; // useProvider override

  const getDefaultWidth = useCallback();

  const state = useTableState({
    ...props,
  });

  const columnState = useTableColumnResizeState(
    { ...props, getDefaultWidth },
    state.collection,
  );

  const domRef = useRef(ref);
  const bodyRef = useRef();

  const density = props.density || 'regular';
  const layout = useMemo(
    () =>
      new TableLayout({
        // If props.rowHeight is auto, then use estimated heights based on scale,
        // otherwise use fixed heights.
        rowHeight:
          props.overflowMode === 'wrap' ? null : ROW_HEIGHTS[density][scale],
        estimatedRowHeight:
          props.overflowMode === 'wrap' ? ROW_HEIGHTS[density][scale] : null,
        headingHeight:
          props.overflowMode === 'wrap' ? null : DEFAULT_HEADER_HEIGHT[scale],
        estimatedHeadingHeight:
          props.overflowMode === 'wrap' ? DEFAULT_HEADER_HEIGHT[scale] : null,
      }),
    [props.overflowMode, scale, density],
  );
  layout.collection = state.collection;
  layout.getColumnWidth = columnState.getColumnWidth;

  const { gridProps } = useTable(
    {
      ...props,
      isVirtualized: true,
      layout,
      onRowAction: onAction,
    },
    state,
    domRef,
  );

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

  const renderView = (type, item) => {
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
        return <TableColumnHeader column={item} />;
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
  const onVisibleRectChange = useCallback((e) => {
    if (
      viewport.current.width === e.width &&
      viewport.current.height === e.height
    ) {
      return;
    }
    viewport.current = e;
  }, []);

  return (
    <DataTableContext.Provider value={{ state, layout, columnState }}>
      <DataTableVirtualizer
        style={{
          whiteSpace: props.overflowMode === 'wrap' ? 'normal' : 'initial',
        }}
        {...gridProps}
        width={width}
        height={height}
        layout={layout}
        collection={state.collection}
        focusedKey={state.selectionManager.focusedKey}
        renderView={renderView}
        renderWrapper={renderWrapper}
        setTableWidth={columnState.setTableWidth}
        onVisibleRectChange={onVisibleRectChange}
        domRef={domRef}
        bodyRef={bodyRef}
        getColumnWidth={columnState.getColumnWidth}
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
  /**
   * Sets the overflow behavior for the cell contents.
   * overflowMode: 'wrap' | 'truncate'
   * @default 'truncate'
   */
  overflowMode: PropTypes.string,
  /** Handler that is called when a user performs an action on a row. */
  onAction: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DataTable.defaultProps = {
  width: '100%',
  height: 565,
};


function TableHeader({ children, ...otherProps }) {
  const { rowGroupProps } = useTableRowGroup();

  return (
    <Box {...rowGroupProps} {...otherProps}>
      {children}
    </Box>
  );
}
function TableColumnHeader(props) {
  const { column } = props;
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
  const arrowIcon =
    state.sortDescriptor?.direction === 'ascending' &&
    column.key === state.sortDescriptor?.column ? (
      <Icon icon={MenuUpIcon} />
      ) : (
        <Icon icon={MenuDownIcon} color="active" />
      );
  const allProps = [columnHeaderProps];

  const { classNames } = useStatusClasses({
    'is-column-sortable': columnProps.allowsSorting,
    [`is-align-${columnProps.align}`]: columnProps.align,
  });

  return (
    <FocusRing focusRingClass="is-key-focused" focusClass="is-click-focused">
      <Box
        {...mergeProps(...allProps)}
        ref={ref}
        variant="dataTable.tableHeadCell"
        className={classNames}
      >
        {columnProps.hideHeader ? (
          <VisuallyHidden>{column.rendered}</VisuallyHidden>
        ) : (
          <Box>{column.rendered}</Box>
        )}
        {columnProps.allowsSorting && <Box>{arrowIcon}</Box>}
      </Box>
    </FocusRing>
  );
}

function TableRowGroup({ children, ...otherProps }) {
  const { rowGroupProps } = useTableRowGroup();

  return (
    <Box {...rowGroupProps} {...otherProps}>
      {children}
    </Box>
  );
}

function TableRow({ item, children, hasActions, ...otherProps }) {
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

  const { isFocusVisible: isFocusVisibleWithin, focusProps: focusWithinProps } =
    useFocusRing({ within: true });
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
}
function TableHeaderRow({ item, children, style }) {
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
}
function TableCell({ cell }) {
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
        {...gridCellProps}
        ref={ref}
        variant="dataTable.tableCell"
        className={classNames}
      >
        <Box variant="dataTable.tableCellContents">{cell.rendered}</Box>
      </Box>
    </FocusRing>
  );
}

function CenteredWrapper({ children }) {
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
}

TableCell.propTypes = {
  cell: PropTypes.shape({
    column: PropTypes.shape({
      props: PropTypes.shape({
        align: PropTypes.string,
      }),
    }),
    parentKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
    key: PropTypes.string,
    props: PropTypes.shape({
      align: PropTypes.string,
      allowsSorting: PropTypes.bool,
      hideHeader: PropTypes.bool,
    }),
    rendered: PropTypes.node,
  }),
};

export default DataTable;
