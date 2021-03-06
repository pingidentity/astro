import React, { useContext, useRef } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import PropTypes from 'prop-types';
import { useListItem } from '@react-aria/list';
import { useHover } from '@react-aria/interactions';
import { ListViewContext } from '../ListView/ListViewContext';
import Box from '../Box';
import { useStatusClasses } from '../../hooks';

const ListViewItem = (props) => {
  const {
    item,
    item: {
      props: { listItemProps, rowProps, hasSeparator = true },
    },
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

  const { hoverProps, isHovered } = useHover({});

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
    focusWithinProps,
    focusProps,
  );

  const { classNames } = useStatusClasses(className, {
    isHovered: isSelectable && isHovered,
    isSelected,
    isFocused: isDisabled ? false : isFocusVisible || isFocusVisibleWithin,
    hasSeparator,
  });

  return (
    <>
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
          {...gridCellProps}
          variant="boxes.listViewItem"
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
    </>
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
    }),
  }),
};

export default ListViewItem;
