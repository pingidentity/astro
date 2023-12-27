import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTreeState } from 'react-stately';
import { useCollator } from '@react-aria/i18n';
import { useListBox } from '@react-aria/listbox';
import { ListLayout } from '@react-stately/layout';
import PropTypes from 'prop-types';

import { TreeViewContext } from '../../context/TreeViewContext';
import { Box, TreeViewItem, TreeViewSection } from '../../index';
import { isIterableProp } from '../../utils/devUtils/props/isIterable';

import TreeViewWrapper from './TreeViewWrapper';

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
    onKeyDown,
    pageLength = 5,
    ...others
  } = props;

  // we are tracking the last focused item.
  // this enables us to have focus jump back to the item, after focus
  // leaves the tree, and then returns.
  const [lastFocusedItem, setLastFocusedItem] = useState(tree?.items[0]?.key);

  const level = 0;

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

  const flattenNestedData = _data => {
    const returnArray = [];

    const checkItemNesting = item => {
      if (item.value?.items?.length > 0) {
        return {
          isTopLevel: true,
          hasChildren: true,
        };
      }
      if (item.items?.length > 0) {
        return {
          isTopLevel: false,
          hasChildren: true,
        };
      } return {
        isTopLevel: false,
        hasChildren: false,
      };
    };

    const checkSection = (isRendered, hasItems) => {
      return isRendered && hasItems;
    };

    const loop = data => {
      for (let i = 0; i < data.length; i += 1) {
        const obj = {
          key: data[i].key,
        };
        returnArray.push(obj);
        const { hasChildren, isTopLevel } = checkItemNesting(data[i]);
        if (checkSection(state.expandedKeys.has(data[i].key), hasChildren) === true) {
          if (isTopLevel) {
            loop(data[i].value?.items);
          } else {
            loop(data[i].items);
          }
        }
      }
    };

    loop(_data);

    return returnArray;
  };

  // list of value pairs of keys and refs
  // does not need to be in order, because they are values pairs
  const [refArray, setRefs] = useState([]);

  // creates a flattened list of keys for up/down keyboard use
  // this DOES need to be in the same order as the HTML appears in the DOM.
  // we are essentially turning all rendered items into a flat list, for up/down
  const flatKeyArray = useMemo(() => flattenNestedData(props.items), [state.expandedKeys]);

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
    <TreeViewContext.Provider
      value={{
        state,
        tree,
        refArray,
        setRefs,
        flatKeyArray,
        pageLength,
        setLastFocusedItem,
        lastFocusedItem,
      }}
    >
      <Box
        {...listBoxProps}
        ref={treeViewRef}
        aria-label={ariaLabel}
        role="treegrid"
        sx={{ overflow: 'hidden', p: '5px', border: 'none !important' }}
        {...others}
      >
        <TreeViewWrapper>
          {Array.from(state.collection).map((item, index) => (
            SectionOrItemRender(
              item.props.items.length > 0,
              <TreeViewSection
                item={item}
                items={item.props.items}
                title={item.props.title}
                key={item.props.title}
                onKeyDown={onKeyDown}
                level={level + 1}
                setSize={state.collection.size}
                position={index}
              />,
              <TreeViewItem
                item={item}
                title={item.value.value.title}
                key={item.value.value.title}
                onKeyDown={onKeyDown}
                level={level + 1}
                setSize={state.collection.size}
                position={index}
              />,
            )
          ))}
        </TreeViewWrapper>
      </Box>
    </TreeViewContext.Provider>
  );
});

TreeView.propTypes = {
  /** data object prop that is required to make the tree function
  this is returned from the useTreeData hook in React-Aria */
  tree: PropTypes.shape({
    selectedKeys: isIterableProp,
    items: isIterableProp,
  }).isRequired,
  /** The currently disabled keys in the collection. */
  disabledKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  /** Callback function that is called when items are expanded or collapsed. */
  onExpandedChange: PropTypes.func,
  /** The list of TreeView items. */
  items: isIterableProp,
  /** String that describes the treeview when using a screen reader. */
  'aria-label': PropTypes.string,
  /** Handler that is called when a key is pressed. */
  onKeyDown: PropTypes.func,
  /** Number of items to move the focus when page up or page down is pressed */
  pageLength: PropTypes.number,
};

export default TreeView;
