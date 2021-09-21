import React, { useContext, useRef } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import PropTypes from 'prop-types';
import { useGridCell, useGridRow } from '@react-aria/grid';
import { useHover } from '@react-aria/interactions';
import { ListViewContext } from '../ListView/ListViewContext';
import Box from '../Box';
import Separator from '../Separator';
import useStatusClasses from '../../hooks/useStatusClasses';

const ListViewItem = (props) => {
  const {
    item,
    className,
    ...others
  } = props;

  const { key } = item;

  const { state } = useContext(ListViewContext);

  const {
    disabledKeys,
  } = state;

  const isDisabled = disabledKeys.has(key);

  const ref = useRef();

  const {
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const { hoverProps, isHovered } = useHover({});

  const { rowProps } = useGridRow({
    node: item,
    isVirtualized: true,
  }, state, ref);

  const isSelected = rowProps['aria-selected'];

  const { gridCellProps } = useGridCell({
    node: item,
    focusMode: 'cell',
  }, state, ref);

  const mergedProps = mergeProps(
    gridCellProps,
    hoverProps,
    focusWithinProps,
    focusProps,
    others,
  );

  const { classNames } = useStatusClasses(className, {
    isHovered,
    isSelected,
    isFocused: isDisabled ? false : isFocusVisible,
  });

  return (
    <>
      <Box
        as="li"
        isDisabled={isDisabled}
        isRow
        {...rowProps}
      >
        <Box
          as="div"
          ref={ref}
          {...mergedProps}
          role="listitem"
          variant="boxes.listViewItem"
          isFocused={isDisabled ? false : isFocusVisible}
          isDisabled={isDisabled}
          isSelected={isSelected}
          className={classNames}
        >
          {item.rendered}
        </Box>
      </Box>
      <Separator m="0px" />
    </>
  );
};

ListViewItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    rendered: PropTypes.node,
  }),
};

export default ListViewItem;
