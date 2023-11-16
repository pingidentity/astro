import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { useTreeState } from 'react-stately';
import { useCollator } from '@react-aria/i18n';
import { useListBox } from '@react-aria/listbox';
import { ListLayout } from '@react-stately/layout';
import PropTypes from 'prop-types';

import { TreeViewContext } from '../../context/TreeViewContext';
import { Box, TreeViewItem, TreeViewSection } from '../../index';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';

// split out and exported for ease of use across components
// and to facilitate easier testing (eliminates redundant conditional renders)
export const SectionOrItemRender = (condition, SectionComponent, ItemComponent) => {
  if (condition) {
    return SectionComponent;
  }
  return ItemComponent;
};

export function useTreeViewLayout(state) {
  const collator = useCollator({ usage: 'search', sensitivity: 'base' });
  const layout = useMemo(() => (

    new ListLayout()
  ), [collator]);

  layout.collection = state.collection;
  layout.disabledKeys = state.disabledKeys;
  return layout;
}

const TreeView = forwardRef((props, ref) => {
  const {
    tree,
    disabledKeys,
    onExpandedChange,
    ...others
  } = props;

  const treeViewRef = useRef();

  const { selectedKeys } = tree;

  /* istanbul ignore next */
  useImperativeHandle(ref, () => treeViewRef.current);

  const state = useTreeState({
    onExpandedChange,
    disabledKeys,
    selectedKeys,
    selectionMode: 'single',
    disallowEmptySelection: true,
    ...others,
  });

  const level = 0;
  const ariaLabel = props['aria-label'];

  const listBoxOptions = {
    disabledKeys,
    'aria-label': ariaLabel,
  };

  const layout = useTreeViewLayout(state);

  const { listBoxProps } = useListBox(
    {
      ...listBoxOptions,
      keyboardDelegate: layout,
    },
    state,
    treeViewRef,
  );

  return (
    <TreeViewContext.Provider value={{ state, tree }}>
      <Box
        as="ul"
        {...listBoxProps}
        ref={treeViewRef}
        aria-label={ariaLabel}
        role="treegrid"
        sx={{ overflow: 'hidden' }}
        {...others}
      >
        {Array.from(state.collection).map((item, index) => (
          SectionOrItemRender(
            item.props.items.length > 0,
            <TreeViewSection
              item={item}
              items={item.props.items}
              title={item.props.title}
              key={item.props.title}
              level={level + 1}
              setSize={state.collection.size}
              position={index}
            />,
            <TreeViewItem
              item={item}
              title={item.value.value.title}
              key={item.value.value.title}
              level={level + 1}
              position={index}
              setSize={state.collection.size}
            />,
          )
        ))}
      </Box>
    </TreeViewContext.Provider>
  );
});

TreeView.propTypes = {
  /** data object prop that is required to make the tree function
  this is returned from the useTreeData hook in React-Aria */
  tree: PropTypes.shape({
    selectedKeys: isIterableProp,
  }).isRequired,
  /** The currently disabled keys in the collection. */
  disabledKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  /** Callback function that is called when items are expanded or collapsed. */
  onExpandedChange: PropTypes.func,
  /** The list of TreeView items. */
  items: isIterableProp,
  /** String that describes the treeview when using a screen reader. */
  'aria-label': PropTypes.string,
};

export default TreeView;
