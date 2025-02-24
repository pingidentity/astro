import React, { useContext, useRef } from 'react';

import useExpandableListViewItem from '../../hooks/useExpandableListViewItem/useExpandableListViewItem';
import useGetTheme from '../../hooks/useGetTheme';
import { Box, Icon } from '../../index';
import { ListViewExpandableItemProps } from '../../types/listView';

import { ListViewContext } from './ListViewContext';
import ListViewFocusWrapper from './ListViewFocusWrapper';

const ListViewExpandableItem = (props: ListViewExpandableItemProps<unknown>) => {
  const {
    item,
    item: {
      props: { listItemProps, rowProps, hasSeparator = true, hasInsetSeparator } = {},
      key,
    },
    isHoverable,
    isFocusable,
    className,
  } = props;

  const { icons } = useGetTheme();
  const { MenuDown, MenuUp } = icons;

  const { state } = useContext(ListViewContext);

  const expandableItemRowRef = useRef(null);
  const expandableChildrenRef = useRef(null);

  const hookProps = {
    item,
    key,
    listItemProps,
    rowProps,
    hasSeparator,
    hasInsetSeparator,
    isHoverable,
    isFocusable,
    className,
    expandableItemRowRef,
    expandableChildrenRef,
    state,
  };

  const {
    expandableRowProps,
    cellProps,
    expandableContainerProps,
    expandableItemState,
  } = useExpandableListViewItem(hookProps);

  const {
    isExpanded,
    toggleExpanded,
    isFocusEscaped,
  } = expandableItemState;

  return (
    <Box {...expandableRowProps}>
      <Box
        {...cellProps}
        onMouseUp={toggleExpanded}
        isRow
        justifyContent="start"
      >
        <Box
          isRow
          sx={{ alignItems: 'center', width: '100%' }}
        >
          {item.rendered && item.rendered[0]}
          <Icon
            sx={{ ml: 'auto' }}
            icon={isExpanded ? MenuUp : MenuDown}
            title={{ name: `${key} expand icon button` }}
          />
        </Box>
      </Box>
      <Box {...expandableItemState.gridCellProps}>
        {isExpanded
          && (
            <ListViewFocusWrapper
              isFocusEscaped={isFocusEscaped}
              containerProps={expandableContainerProps}
            >
              {item.rendered && item.rendered[1]}
            </ListViewFocusWrapper>
          )}
      </Box>
    </Box>
  );
};

export default ListViewExpandableItem;
