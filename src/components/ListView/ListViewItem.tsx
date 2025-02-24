import React, { useContext, useRef } from 'react';
import { mergeProps, useFocusRing, useGridListItem } from 'react-aria';
import { useHover } from '@react-aria/interactions';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import { Box, Loader } from '../../index';

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

  const rowRef = useRef(null);

  const isSelectable = state.selectionManager.selectionMode !== 'none';

  const {
    isFocusVisible: isFocusVisibleWithin,
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const onPointerLeaveFunction = /* istanbul ignore next */ () => {
    state.hover.setHoveredItem('');
  };

  const { hoverProps } = useHover({
    onHoverStart: () => {
      state.hover.setHoveredItem(item.key);
    },
    onHoverEnd:
    /* istanbul ignore next */
    () => {
      onPointerLeaveFunction();
    },
  });

  const {
    rowProps: raRowProps,
    gridCellProps,
    isPressed,
  } = useGridListItem({
    node: item,
    isVirtualized: true,
    shouldSelectOnPressUp: true,
  }, state, rowRef);

  const isSelected = state.selectionManager.isSelected(item.key);

  const mergedProps = mergeProps(
    raRowProps,
    hoverProps,
    isFocusable ? { ...focusProps, ...focusWithinProps } : {},
    { onPointerLeave: onPointerLeaveFunction },
  );

  const { classNames } = useStatusClasses(className, {
    isHovered: isSelectable && isHoverable && (item.key === state.hover.hoveredItem),
    isSelected,
    isFocused: isDisabled ? false : isFocusVisible || isFocusVisibleWithin,
    hasSeparator,
    hasInsetSeparator,
    isPressed,
  });

  // Whether the current component should have legacy styles removed
  // TODO: [Astro 3.0.0] Remove the legacy styles and update the code here.
  const shouldOverRideLegacyStyles = Object.keys(item?.rendered?.props).includes(
    'data',
  );

  // Apply appropriate variant dependant on whether a legacy list item is used
  /* istanbul ignore next */
  const listItemVariant = shouldOverRideLegacyStyles ? 'listViewItem.styledListItem' : 'listViewItem.container';

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
        variant={listItemVariant}
        {...gridCellProps}
        isFocused={isDisabled ? false : isFocusVisible}
        isDisabled={isDisabled}
        isSelected={isSelected}
        className={classNames}
        data-id={dataId}
        {...listItemProps}
      >
        {item.rendered}
        {state.isLoading && isFocusVisibleWithin && (
          <Box variant="listViewItem.loaderContainer">
            <Loader color="neutral.50" />
          </Box>
        )}
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
