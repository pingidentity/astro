import React, { useContext, useRef } from 'react';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import PropTypes from 'prop-types';
import { useGridCell, useGridRow } from '@react-aria/grid';
import { useHover } from '@react-aria/interactions';
import { ListViewContext } from '../ListView/ListViewContext';
import Box from '../Box';
import Separator from '../Separator';
import { useStatusClasses } from '../../hooks';

const ListViewItem = (props) => {
  const {
    item,
    item: {
      props: {
        listItemProps,
        rowProps,
        hasSeparator = true,
      },
    },
    className,
  } = props;

  const dataId = item.props['data-id'];

  const cellNode = [...item.childNodes][0];

  const { state } = useContext(ListViewContext);

  const isDisabled = state.disabledKeys.has(item.key);

  const rowRef = useRef();
  const cellRef = useRef();

  const {
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const { hoverProps, isHovered } = useHover({});

  const { rowProps: raRowProps } = useGridRow({
    node: item,
    isVirtualized: true,
  }, state, rowRef);

  const isSelected = raRowProps['aria-selected'];

  const { gridCellProps } = useGridCell({
    node: cellNode,
    focusMode: 'cell',
  }, state, cellRef);

  const mergedProps = mergeProps(
    gridCellProps,
    hoverProps,
    focusWithinProps,
    focusProps,
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
        {...raRowProps}
        ref={rowRef}
        {...rowProps}
      >
        <Box
          as="div"
          ref={cellRef}
          {...mergedProps}
          role="listitem"
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
      { hasSeparator && <Separator m="0px" />}
    </>
  );
};

ListViewItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    rendered: PropTypes.node,
    childNodes: PropTypes.arrayOf(PropTypes.shape({})),
    props: PropTypes.shape({
      'data-id': PropTypes.string,
      listItemProps: PropTypes.shape({}),
      rowProps: PropTypes.shape({}),
      hasSeparator: PropTypes.bool,
    }),
  }),
};

export default ListViewItem;
