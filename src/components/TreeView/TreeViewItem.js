import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import FileIcon from '@pingux/mdi-react/FileIcon';
import PropTypes from 'prop-types';

import { useTreeViewContext } from '../../context/TreeViewContext';
import { Box } from '../../index';

import TreeViewRow from './TreeViewRow';

const TreeViewItem = forwardRef((props, ref) => {
  const { item, title } = props;

  const treeItemRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => treeItemRef.current);

  const { state, tree } = useTreeViewContext();
  const isExpanded = Array.from(state.expandedKeys).includes(item.key);
  const isSelected = Array.from(tree.selectedKeys).includes(item.key);
  const isDisabled = Array.from(state.disabledKeys).includes(item.key);


  // this component may seem unnecessary, but it will be where the
  // useOption and dragAndDrop stuff will go
  // this comment will be removed at that time.

  return (
    <Box
      as="li"
      isRow
      ref={treeItemRef}
      role="treeitem"
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      sx={{
        width: '100%',
        ml: '36px',
        ':not(:last-child)': {
          pb: 'sm',
        },
      }}

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
};

export default TreeViewItem;
