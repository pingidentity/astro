import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import FileIcon from '@pingux/mdi-react/FileIcon';
import { useFocusRing } from '@react-aria/focus';
import { useOption } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';
import PropTypes from 'prop-types';

import { useTreeViewContext } from '../../context/TreeViewContext';
import { useStatusClasses } from '../../hooks';
import { Box } from '../../index';

import { itemPressHandlers } from './TreeViewKeyboardDelegate';
import TreeViewRow from './TreeViewRow';
import { addRefToArrayHelper, removeRefFromArrayHelper } from './TreeViewSection';

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
    setRefs,
    flatKeyArray,
    pageLength,
    setLastFocusedItem,
  } = useTreeViewContext();

  const { optionProps, isSelected, isDisabled } = useOption({ key }, state, treeItemRef);

  const isExpanded = state.expandedKeys.has(key);

  const onKeyDownFunction = e => {
    /* istanbul ignore next */
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

  // ignoring from tests, but this is actually being unit tested
  /* istanbul ignore next */
  const removeRefFromArray = () => {
    setRefs(prev => {
      return removeRefFromArrayHelper(prev, key);
    });
  };

  const addRefToArray = () => {
    setRefs(prev => {
      return addRefToArrayHelper(prev, key, treeItemRef);
    });
  };

  // adds and removes refs on mount and dismount
  /* istanbul ignore next */
  useEffect(() => {
    // this  runs on mount
    addRefToArray();
    return () => {
      // this runs on cleanup
      removeRefFromArray(key, refArray);
    };
  }, []);

  const { isFocusVisible, focusProps } = useFocusRing();

  const mergedProps = mergeProps(
    focusProps,
    optionProps,
    { onFocus: () => setLastFocusedItem(key) },
  );

  const { classNames } = useStatusClasses('', {
    isFocused: isFocusVisible,
  });

  return (
    <Box
      as="li"
      isRow
      ref={treeItemRef}
      aria-disabled={isDisabled}
      {...mergedProps}
      role="treeitem"
      variant="treeView.wrapper"
      className={classNames}
      aria-selected={isSelected}
      aria-level={level}
      aria-posinset={position + 1}
      aria-setsize={setSize}
      onKeyDown={e => onKeyDownFunction(e)}
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
  focusManager: PropTypes.shape({}),
  name: PropTypes.string,
  title: PropTypes.string,
  onKeyDown: PropTypes.func,
  level: PropTypes.number,
  position: PropTypes.number,
  setSize: PropTypes.number,
};

export default TreeViewItem;
