import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import FileIcon from '@pingux/mdi-react/FileIcon';
import { useOption } from '@react-aria/listbox';
import PropTypes from 'prop-types';

import { useTreeViewContext } from '../../context/TreeViewContext';
import { Box } from '../../index';

import TreeViewRow from './TreeViewRow';

const TreeViewItem = forwardRef((props, ref) => {
  const { item, title, level, position, setSize } = props;

  const { key } = item;

  const treeItemRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => treeItemRef.current);

  const { state } = useTreeViewContext();

  const { optionProps, isSelected, isDisabled } = useOption({ key }, state, treeItemRef);

  const isExpanded = state.expandedKeys.has(key);

  return (
    <Box
      as="li"
      isRow
      ref={treeItemRef}
      aria-disabled={isDisabled}
      aria-level={level}
      aria-posinset={position + 1}
      aria-setsize={setSize}
      {...optionProps}
      role="treeitem"
      sx={{
        width: '100%',
        ml: '36px',
        ':not(:last-child)': {
          pb: 'sm',
        },
      }}
      aria-selected={isSelected}
    >
      <TreeViewRow
        item={item}
        title={title}
        mainIcon={FileIcon}
        isSelected={isSelected}
        isExpanded={isExpanded}
        isDisabled={isDisabled}
      />
    </Box>
  );
});

TreeViewItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
  }),
  name: PropTypes.string,
  title: PropTypes.string,
  level: PropTypes.number,
  position: PropTypes.number,
  setSize: PropTypes.number,
};

export default TreeViewItem;
