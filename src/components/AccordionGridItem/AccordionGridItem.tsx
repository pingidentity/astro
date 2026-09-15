import React, { useEffect, useRef } from 'react';
import { mergeProps } from 'react-aria';
import { useGridRow } from '@react-aria/grid';
import type { GridState } from '@react-stately/grid';
import type { GridCollection } from '@react-types/grid';
import type { Key } from '@react-types/shared';

import { useAccordionGridContext } from '../../context/AccordionGridContext';
import { useStatusClasses } from '../../hooks';
import { AccordionGridItemProps } from '../../types';
import Box from '../Box';

import AccordionGridItemBody from './AccordionGridItemBody';
import AccordionGridItemHeader from './AccordionGridItemHeader';

const AccordionGridItem = (props: AccordionGridItemProps) => {
  const {
    item,
    headerProps,
    bodyProps,
    children,
    className,
    navigationMode,
    ...others
  } = props;

  const [header, body, ...otherChildren] = React.Children.toArray(children);
  const cellNode = Array.from(item!.childNodes)[0];

  const { state } = useAccordionGridContext() as {
    state: GridState<object, GridCollection<object>>
  };
  /* @react-aria/grid's hooks resolve a newer `@react-stately/grid` than the direct
   * dependency (their `GridState.disabledKeys` uses @react-types/shared's `Key`, which
   * omits `bigint`), so the state needs a widening cast before the hook calls. */
  const gridState = state as Omit<
    GridState<object, GridCollection<object>>, 'disabledKeys'
  > & { disabledKeys: Set<Key> };

  // Treat first cell as a row,
  // fixes focus and keyboard interactions
  const isDisabled = state.disabledKeys.has(cellNode.key);
  const isSelected = state.selectionManager.isSelected(cellNode.key);

  // Sync selection between the first cell and the row
  const isRowSelected = state.selectionManager.isSelected(item!.key);
  useEffect(() => {
    if (isSelected !== isRowSelected) {
      state.selectionManager.toggleSelection(item!.key);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected, isRowSelected, item!.key]);

  const rowRef = useRef<HTMLElement>(null);
  const cellRef = useRef<HTMLElement>(null);
  const cellBodyRef = useRef<HTMLElement>(null);

  const { rowProps } = useGridRow({
    node: item!,
  }, gridState, rowRef);

  const { classNames } = useStatusClasses(className, {
    isSelected,
    isDisabled,
  });

  delete rowProps.onMouseDown;
  delete rowProps.onPointerDown;
  delete rowProps.onClick;
  if (navigationMode === 'native') {
    delete rowProps.onKeyDown;
  }

  return (
    <Box
      as="div"
      tabIndex="0"
      {...mergeProps(rowProps, others)}
      aria-selected={isSelected}
      aria-expanded={isSelected}
      className={classNames}
      variant="accordionGrid.item"
      ref={rowRef}
    >
      <AccordionGridItemHeader
        item={item}
        ref={cellRef}
        isDisabled={isDisabled}
        isSelected={isSelected}
        navigationMode={navigationMode}
        {...headerProps}
      >
        {header}
      </AccordionGridItemHeader>
      <AccordionGridItemBody
        item={item}
        ref={cellBodyRef}
        isSelected={isSelected}
        navigationMode={navigationMode}
        {...bodyProps}
      >
        {body}
      </AccordionGridItemBody>
      {otherChildren}
    </Box>
  );
};

export default AccordionGridItem;
