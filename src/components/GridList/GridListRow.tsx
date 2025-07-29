import React, { forwardRef } from 'react';
import DragIcon from '@pingux/mdi-react/DragVerticalIcon';

import { useLocalOrForwardRef } from '../../hooks';
import useGridListItem from '../../hooks/useGridListItem/useGridListItem';
import { Box, Icon, IconButton } from '../../index';
import { GridListRowProps } from '../../types/dnd';
import { InsertionIndicator } from '../TreeView';

const GridListRow = forwardRef<HTMLElement, GridListRowProps>((props, ref) => {
  const colRef = React.useRef(null);
  const rowRef = useLocalOrForwardRef<HTMLElement>(ref);
  const buttonRef = React.useRef(null);
  const cellRef = React.useRef(null);
  const { dragState, dropState, isReorderable, item, state } = props;
  const {
    rowProps,
    gridCellProps,
    buttonProps,
  } = useGridListItem({
    state,
    item,
    dragState,
    dropState,
    ref: rowRef,
    cellRef,
    isReorderable,
  });

  return (
    <>
      <InsertionIndicator
        key={`${item.key}-before`}
        target={{ type: 'item', key: item.key, dropPosition: 'before' }}
        dropState={dropState}
        collectionRef={colRef}
      />
      <Box
        {...rowProps}
        variant="gridList.rowContainer"
        isRow
        ref={rowRef}
      >
        {isReorderable
          && (
          <Box isRow sx={{ alignItems: 'center', mr: 'xs' }}>
            <IconButton ref={buttonRef} {...buttonProps} sx={{ pointerEvents: 'none' }}>
              <Icon icon={DragIcon} />
            </IconButton>
          </Box>
          )}
        <Box {...gridCellProps} isRow sx={{ alignItems: 'center' }}>
          {item.rendered}
        </Box>
      </Box>

      {state.collection.getKeyAfter(item.key) == null
          && (
            <InsertionIndicator
              key={`${item.key}-after`}
              target={{ type: 'item', key: item.key, dropPosition: 'after' }}
              dropState={dropState}
              collectionRef={colRef}
            />
          )}
    </>
  );
});


export default GridListRow;
