import React, { useContext, useRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';
import { useHover } from '@react-aria/interactions';
import { useListItem } from '@react-aria/list';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import Box from '../Box';

import { ListViewContext } from './ListViewContext';

const ListViewItem = props => {
  const {
    item,
    item: {
      props: { listItemProps, rowProps, hasSeparator = true, hasInsetSeparator },
    },
    isHoverable,
    isFocusable,
    className,
  } = props;

  const dataId = item.props['data-id'];

  const { state } = useContext(ListViewContext);

  const isDisabled = state.disabledKeys.has(item.key);

  const rowRef = useRef();

  const isSelectable = state.selectionManager.selectionMode !== 'none';

  const {
    isFocusVisible: isFocusVisibleWithin,
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const { hoverProps, isHovered } = useHover({
    onHoverStart: () => {
      state.hover.setHoveredItem(item.key);
    },
  });

  const {
    rowProps: raRowProps,
    gridCellProps,
  } = useListItem({
    node: item,
    isVirtualized: true,
    isDisabled,
  }, state, rowRef);

  const isSelected = state.selectionManager.isSelected(item.key);

  const mergedProps = mergeProps(
    raRowProps,
    hoverProps,
    isFocusable ? { ...focusProps, ...focusWithinProps } : {},
  );

  const { classNames } = useStatusClasses(className, {
    isHovered: isSelectable && isHovered && isHoverable && (item.key === state.hover.hoveredItem),
    isSelected,
    isFocused: isDisabled ? false : isFocusVisible || isFocusVisibleWithin,
    hasSeparator,
    hasInsetSeparator,
  });

  // Whether the current component should have legacy styles removed
  // TODO: [Astro 3.0.0] Remove the legacy styles and update the code here.
  const shouldOverRideLegacyStyles = Object.keys(item.rendered.props).includes(
    'data',
  );

  return (
    <Box
      isDisabled={isDisabled}
      isRow
      ref={rowRef}
      {...mergedProps}
      {...rowProps}
      sx={{ outline: 'none' }}
    >
      <Box
        as="div"
        // Apply appropriate variant dependant on whether a legacy list item is used
        variant={shouldOverRideLegacyStyles ? 'listViewItem.styledListItem' : 'listViewItem.container'}
        {...gridCellProps}
        isFocused={isDisabled ? false : isFocusVisible}
        isDisabled={isDisabled}
        isSelected={isSelected}
        className={classNames}
        data-id={dataId}
        {...listItemProps}
      >
        {item.rendered}
      </Box>
    </Box>
  );
};

ListViewItem.propTypes = {
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

export default ListViewItem;
