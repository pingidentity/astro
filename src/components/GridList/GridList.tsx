import React, { useRef } from 'react';
import { mergeProps } from 'react-aria';

import useGridList from '../../hooks/useGridList';
import { Box } from '../../index';

import GridListRow from './GridListRow';

const GridList = props => {
  const ref = useRef<HTMLUListElement | null>(null);

  const {
    collectionProps,
    gridListItemProps,
    gridProps,
    state,
  } = useGridList({ ...props, ref });

  return (
    <Box
      {...mergeProps(gridProps, collectionProps)}
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
            {...gridListItemProps}
          />
        );
      })}
    </Box>
  );
};

export default GridList;
