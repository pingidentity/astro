import React, { Key, useRef } from 'react';
import { mergeProps } from 'react-aria';
import { Collection } from 'react-stately';
import type { Node } from '@react-types/shared';

import useGridList from '../../hooks/useGridList';
import { Box } from '../../index';
import { GridListProps } from '../../types/gridList';

import GridListRow from './GridListRow';

const GridList = (props: GridListProps) => {
  const ref = useRef<HTMLUListElement | null>(null);

  const { containerProps, rowProps, cellProps, ...others } = props;

  const {
    collectionProps,
    gridListItemProps,
    gridProps,
    state,
  } = useGridList({ ...others, ref });

  return (
    <Box
      {...mergeProps(gridProps, collectionProps, containerProps)}
      ref={ref}
      className="list"
      variant="gridList.container"
      gap="sm"
    >
      {[...Array.from(state.collection)].map(item => {
        return (
          <GridListRow
            key={item.key}
            item={item}
            rowProps={rowProps}
            cellProps={cellProps}
            {...gridListItemProps}
          />
        );
      })}
    </Box>
  );
};

export default GridList;
