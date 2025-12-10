import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { mergeProps } from 'react-aria';
import { ListDropTargetDelegate, useDraggableCollection, useDroppableCollection } from '@react-aria/dnd';
import { useFocusRing } from '@react-aria/focus';
import { useCollator } from '@react-aria/i18n';
import { useListBox } from '@react-aria/listbox';
import { useDraggableCollectionState, useDroppableCollectionState } from '@react-stately/dnd';
import { ListLayout } from '@react-stately/layout';
import { useTreeState } from '@react-stately/tree';
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

// if you are placing the dragged item into another item.
export const insertItem = (tree, eventTarget, keyBeingDragged, state) => {
  tree.move(
    keyBeingDragged,
    eventTarget.key,
    0,
  );
  // expand target, if target is closed
  if (!state.expandedKeys.has(eventTarget.key)) {
    state.toggleKey(eventTarget.key);
  }
};

export const insertItemToPosition = (tree, dropPosition, targetKey, droppedItem) => {
  // remove item
  tree.remove(droppedItem.key);

  // removing value and then spreading it into the top level.
  // this prevents nesting ie value.value.value.... etc.
  const { value, ...rest } = droppedItem;

  const buildNewItemArray = arr => {
    return arr.map(_item => {
      const { value: _itemValue, ..._itemRest } = _item;
      return { ..._itemValue, _itemRest };
    });
  };

  if (dropPosition === 'before') {
    tree.insertBefore(
      targetKey,
      {
        ...rest,
        ...droppedItem.value,
        ...(droppedItem.children !== undefined
          && { items: buildNewItemArray(droppedItem.children) }),
      },
    );
  } else if (dropPosition === 'after') {
    tree.insertAfter(
      targetKey,
      {
        ...rest,
        ...droppedItem.value,
        ...(droppedItem.children !== undefined
          && { items: buildNewItemArray(droppedItem.children) }),
      },
    );
  }
};

// split out so that it can be exported and unit tested.
export const dropItem = (
  eventTarget, tree, state, droppedItem,
) => {
  // if dropPosition = 'on', just insert as first child, and then open, if closed
  if (eventTarget.dropPosition === 'on') {
    insertItem(tree, eventTarget, droppedItem.key, state);
  } else {
    insertItemToPosition(tree, eventTarget.dropPosition, eventTarget.key, droppedItem);
  }
};

const TreeView = forwardRef((props, ref) => {
  const {
    tree,
    disabledKeys,
    onExpandedChange,
    loadingNodes,
    onDragStart: onDragStartProp,
    onDrop: onDropProp,
    onKeyDown,
    pageLength = 5,
    ...others
  } = props;

  const [keyBeingDragged, setKeyBeingDragged] = useState('');

  const [targetKey, setTargetKey] = useState('');
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
      if (item.value?.children?.length > 0 || item?.props?.hasChildren) {
        return {
          isTopLevel: true,
          hasChildren: true,
        };
      }
      if (item.children?.length > 0 || item.value?.items) {
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
      if (isRendered === true && hasItems) {
        return true;
      }
      return false;
    };

    const buildParentKeys = (parentKey, parentKeys) => {
      const keyArr = [];

      if (parentKey) {
        keyArr.push(parentKey);
      }
      return [...keyArr, ...parentKeys];
    };

    // data is the array being looped through
    // parentKey is the immediate parent of the item
    // parenKeys is the key of all the nesting levels, all the way to the root
    const loop = (data, parentKey, parentKeys) => {
      for (let i = 0; i < data.length; i += 1) {
        const obj = {
          key: data[i].key,
          title: data[i].key,
          items: data[i].value?.children || data[i].children || null,
          parentKey,
          parentKeys: buildParentKeys(parentKey, parentKeys),
        };
        returnArray.push(obj);
        const { hasChildren, isTopLevel } = checkItemNesting(data[i]);

        if (checkSection(state.expandedKeys.has(data[i].key), hasChildren) === true) {
          if (isTopLevel) {
            loop(data[i].value?.children, data[i].key, buildParentKeys(parentKey, parentKeys));
          } else {
            /* istanbul ignore next */
            loop(data[i].children, data[i].key, [parentKey, ...(parentKeys && parentKeys)]);
          }
        }
      }
    };

    loop(_data, undefined, []);

    return returnArray;
  };

  // list of value pairs of keys and refs
  // does not need to be in order, because they are values pairs
  const [refArray, setRefs] = useState([]);

  // creates a flattened list of keys for up/down keyboard use
  // this DOES need to be in the same order as the HTML appears in the DOM.
  // we are essentially turning all rendered items into a flat list, for up/down
  const flatKeyArray = useMemo(() => {
    return flattenNestedData(Array.from(state.collection));
  }, [state.expandedKeys, state.collection]);

  const ariaLabel = props['aria-label'];

  const onItemDrop = e => {
    const thisItem = tree.getItem(keyBeingDragged);
    const foundDraggingItem = flatKeyArray.find(_item => _item.key === keyBeingDragged);
    const foundTargetItem = flatKeyArray.find(_item => _item.key === e.target.key);

    if (Array.from(state.disabledKeys).includes(foundTargetItem.key) && e.target.dropPosition === 'on') {
      setKeyBeingDragged('');
      return;
    }

    // disallow an item from being dropped onto itself, or its children
    if (
      e.target.key !== keyBeingDragged
      && !foundTargetItem.parentKeys.includes(foundDraggingItem.key)
    ) {
      dropItem(e.target, tree, state, thisItem);
      state.selectionManager.state.setFocusedKey(keyBeingDragged);
      if (onDropProp) {
        onDropProp(e);
      }
    }
    setKeyBeingDragged('');
  };

  const dragItemStart = e => {
    setKeyBeingDragged(Array.from(e.keys)[0]);
    if (onDragStartProp) {
      onDragStartProp(e, e.keys[0]);
    }
  };

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

  const dropState = useDroppableCollectionState({
    ...props,
    onDrop: onItemDrop,
    onDropEnter: e => setTargetKey(e.target.key),
    onDropExit: () => setTargetKey(''),
    collection: state.collection,
    selectionManager: state.selectionManager,
  });

  const { collectionProps } = useDroppableCollection(
    {
      ...props,
      onDrop: onItemDrop,
      disabledKeys,
      dropTargetDelegate: new ListDropTargetDelegate(flatKeyArray, treeViewRef),
    },
    dropState,
    treeViewRef,
  );

  // Setup drag state for the collection.
  const dragState = useDraggableCollectionState({
    ...props,
    onDragStart: dragItemStart,
    // Collection and selection manager come from list state.
    collection: state.collection,
    selectionManager: state.selectionManager,
    // Provide data for each dragged item. This function could
    getItems: () => {
      return flatKeyArray.map(_item => {
        return {
          'text/plain': _item.key,
        };
      });
    },
  });

  useEffect(() => {
    if (refArray.find(item => item.key === lastFocusedItem)) {
      const { thisRef } = refArray.find(item => item.key === lastFocusedItem);
      thisRef?.current?.focus();
    }
  }, [state.selectionManager.focusedKey]);

  useDraggableCollection(props, dragState, treeViewRef);

  const {
    focusProps: focusWithinProps,
    isFocused: isFocusedWithin,
  } = useFocusRing({ within: true });

  useEffect(() => {
    if (isFocusedWithin) {
      const { thisRef } = refArray.find(item => item.key === lastFocusedItem);
      thisRef?.current?.focus();
    }
  }, [isFocusedWithin]);

  return (
    <TreeViewContext.Provider
      value={{
        state,
        tree,
        refArray,
        setRefs,
        flatKeyArray,
        dragState,
        dropState,
        pageLength,
        setLastFocusedItem,
        lastFocusedItem,
        targetKey,
        keyBeingDragged,
      }}
    >
      <Box
        {...mergeProps(listBoxProps, collectionProps, focusWithinProps)}
        {...focusWithinProps}
        ref={treeViewRef}
        aria-label={ariaLabel}
        role="treegrid"
        sx={{ overflow: 'hidden', p: '5px', border: 'none !important' }}
        {...others}
      >
        <TreeViewWrapper>
          {Array.from(state.collection).map((item, index) => (
            SectionOrItemRender(
              item.props.hasChildren || item.value.children.length > 0,
              <TreeViewSection
                item={item}
                items={item.value.children}
                title={item.props.title}
                key={item.props.title}
                hasChildren={item.props.hasChildren}
                loadingNodes={loadingNodes}
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
    move: PropTypes.func,
    remove: PropTypes.func,
    insert: PropTypes.func,
    getItem: PropTypes.func,
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
  /** Determines whether the loading indicator is shown for the expanded node. */
  loadingNodes: PropTypes.arrayOf(PropTypes.shape({})),
  /** Handler that is called when a key is pressed. */
  onKeyDown: PropTypes.func,
  /** Callback that is called when the dragging action starts. */
  onDragStart: PropTypes.func,
  /** Callback that is called when the dropping action occurs. */
  onDrop: PropTypes.func,
  /** Number of items to move the focus when page up or page down is pressed */
  pageLength: PropTypes.number,
};

export default TreeView;
