import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import FileIcon from '@pingux/mdi-react/FileIcon';
import { useOption } from '@react-aria/listbox';
import PropTypes from 'prop-types';

import { useTreeViewContext } from '../../context/TreeViewContext';
import { Box } from '../../index';

import InsertionIndicator from './InsertionIndicator';
import { itemPressHandlers } from './TreeViewKeyboardDelegate';
import TreeViewRow from './TreeViewRow';

export const onKeyDownItem = (
  e,
  state,
  key,
  tree,
  isSelected,
  isExpanded,
  focusManager,
  flatKeyArray,
  refArray,
  pageLength,
) => {
  switch (e.which) {
    case 32:
      itemPressHandlers.onSpacePress(e, tree, key, isSelected);
      break;
    case 38:
      itemPressHandlers.onUpPress(e, key, refArray, flatKeyArray);
      e.preventDefault();
      e.stopPropagation();
      break;
    case 40:
      itemPressHandlers.onDownPress(e, key, refArray, flatKeyArray);
      e.preventDefault();
      e.stopPropagation();
      break;
    case 37:
    case 39:
      itemPressHandlers.onRightLeftItemPress(e);
      break;
    case 33:
      itemPressHandlers.onPageUpPress(e, key, flatKeyArray, refArray, pageLength);
      break;
    case 34:
      itemPressHandlers.onPageDownPress(e, key, flatKeyArray, refArray, pageLength);
      break;
    case 36:
      itemPressHandlers.onHomePress(key, flatKeyArray, refArray);
      e.preventDefault();
      e.stopPropagation();
      break;
    case 35:
      itemPressHandlers.onEndPress(key, flatKeyArray, refArray);
      e.preventDefault();
      e.stopPropagation();
      break;
    default:
      break;
  }
};

const TreeViewItem = forwardRef((props, ref) => {
  const {
    item,
    title,
    focusManager,
    onKeyDown,
    level,
    position,
    setSize,
  } = props;

  const { key } = item;

  const treeItemRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => treeItemRef.current);

  /* istanbul ignore next */
  const {
    state,
    tree,
    refArray,
    flatKeyArray,
    dragState,
    dropState,
    pageLength,
  } = useTreeViewContext();

  const { isSelected, isDisabled } = useOption({ key }, state, treeItemRef);

  const isExpanded = state.expandedKeys.has(key);
  const isDragging = dragState.isDragging(item.key);

  const onKeyDownFunction = e => {
    onKeyDownItem(
      e,
      state,
      key,
      tree,
      isSelected,
      isExpanded,
      focusManager,
      flatKeyArray,
      refArray,
      pageLength,
    );
    if (onKeyDown) {
      onKeyDown(e, key);
    }
  };

  return (
    <>
      <InsertionIndicator
        target={{ type: 'item', key: item.key, dropPosition: 'before' }}
        dropState={dropState}
      />
      <Box
        isRow
        ref={treeItemRef}
        aria-disabled={isDisabled}
        role="row"
        variant="treeView.wrapper"
        aria-selected={isSelected}
        aria-level={level}
        aria-posinset={position + 1}
        aria-setsize={setSize}
      >
        <TreeViewRow
          item={item}
          title={title}
          mainIcon={FileIcon}
          isSelected={isSelected}
          isExpanded={isExpanded}
          isDisabled={isDisabled}
          isDragging={isDragging}
          onKeyDown={e => onKeyDownFunction(e)}
        />
      </Box>
      <InsertionIndicator
        target={{ type: 'item', key: item.key, dropPosition: 'after' }}
        dropState={dropState}
      />
    </>
  );
});

TreeViewItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
  }),
  focusManager: PropTypes.shape({}),
  name: PropTypes.string,
  title: PropTypes.string,
  onKeyDown: PropTypes.func,
  level: PropTypes.number,
  position: PropTypes.number,
  setSize: PropTypes.number,
};

export default TreeViewItem;
