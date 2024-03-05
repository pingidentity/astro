import React, { useContext, useRef } from 'react';
import MenuDownIcon from '@pingux/mdi-react/MenuDownIcon';
import MenuUpIcon from '@pingux/mdi-react/MenuUpIcon';
import PropTypes from 'prop-types';

import useExpandableListViewItem from '../../hooks/useExpandableListViewItem/useExpandableListViewItem';
import { Box, Icon } from '../../index';

import { ListViewContext } from './ListViewContext';
import ListViewFocusWrapper from './ListViewFocusWrapper';

const ListViewExpandableItem = props => {
  const {
    item,
    item: {
      props: { listItemProps, rowProps, hasSeparator = true, hasInsetSeparator },
    },
    isHoverable,
    isFocusable,
    className,
  } = props;

  const { key } = item;

  const { state } = useContext(ListViewContext);

  const expandableItemRowRef = useRef();
  const expandableChildrenRef = useRef();

  const hookProps = {
    item,
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
        onMouseDown={toggleExpanded}
        isRow
        justifyContent="start"
      >
        <Box
          isRow
          sx={{ alignItems: 'center', width: '100%' }}
        >
          {item.rendered[0]}
          <Icon
            sx={{ ml: 'auto' }}
            icon={isExpanded ? MenuUpIcon : MenuDownIcon}
            title={{ name: `${key} expand icon button` }}
          />
        </Box>
      </Box>
      <Box {...expandableItemState.gridCellProps}>
        { isExpanded
          && (
          <ListViewFocusWrapper
            isFocusEscaped={isFocusEscaped}
            containerProps={expandableContainerProps}
          >
            {item.rendered[1]}
          </ListViewFocusWrapper>
          )}
      </Box>
    </Box>
  );
};

ListViewExpandableItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    rendered: PropTypes.node,
    props: PropTypes.shape({
      'data-id': PropTypes.string,
      listItemProps: PropTypes.shape({}),
      rowProps: PropTypes.shape({}),
      hasSeparator: PropTypes.bool,
      hasInsetSeparator: PropTypes.bool,
    }),
  }),
  isHoverable: PropTypes.bool,
  isFocusable: PropTypes.bool,
};

export default ListViewExpandableItem;
