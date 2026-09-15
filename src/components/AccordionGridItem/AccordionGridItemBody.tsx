import React, { forwardRef } from 'react';
import { mergeProps } from 'react-aria';
import { useGridCell } from '@react-aria/grid';
import { useHover } from '@react-aria/interactions';
import type { GridState } from '@react-stately/grid';
import type { GridCollection } from '@react-types/grid';
import type { FocusableElement, Key } from '@react-types/shared';

import { useAccordionGridContext } from '../../context/AccordionGridContext';
import { useStatusClasses } from '../../hooks';
import { AccordionGridItemBodyProps } from '../../types';
import Box from '../Box';

const AccordionGridItemBody = forwardRef<HTMLElement, AccordionGridItemBodyProps>((props, ref) => {
  const {
    item,
    className,
    children,
    isSelected,
    navigationMode,
    ...others
  } = props;

  const { state } = useAccordionGridContext() as {
    state: GridState<object, GridCollection<object>>
  };
  /* @react-aria/grid's hooks resolve a newer `@react-stately/grid` than the direct
   * dependency (their `GridState.disabledKeys` uses @react-types/shared's `Key`, which
   * omits `bigint`), so the state needs a widening cast before the hook calls. */
  const gridState = state as Omit<
    GridState<object, GridCollection<object>>, 'disabledKeys'
  > & { disabledKeys: Set<Key> };

  const cellNode = Array.from(item!.childNodes)[1];

  const { gridCellProps } = useGridCell({
    node: cellNode,
    focusMode: 'cell',
    shouldSelectOnPressUp: true,
  }, gridState, ref as React.RefObject<FocusableElement>);

  /* istanbul ignore next */
  gridCellProps.onClick = e => {
    (e.target as HTMLElement).focus();
  };

  // Add the cell's key to the disabled keys array,
  // so that clicking this cell does not close the accordion.
  state.disabledKeys.add(cellNode.key);

  const { hoverProps } = useHover({});

  const mergedProps = mergeProps(
    gridCellProps,
    hoverProps,
  );

  const { classNames } = useStatusClasses(className, {
    isSelected,
  });

  const ariaLabel = props['aria-label'];

  delete mergedProps.onMouseDown;
  delete mergedProps.onPointerDown;
  if (navigationMode === 'native') {
    delete mergedProps.onKeyDown;
    delete mergedProps.onKeyDownCapture;
  }

  return (
    <Box
      as="div"
      variant="accordionGrid.body"
      role="gridcell"
      ref={ref}
      {...mergedProps}
      isSelected={isSelected}
      className={classNames}
      aria-label={ariaLabel}
      {...others}
    >
      {children}
    </Box>
  );
});

export default AccordionGridItemBody;
