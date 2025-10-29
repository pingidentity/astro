import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useOption } from '@react-aria/listbox';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import PropTypes from 'prop-types';

import { useTreeViewContext } from '../../context/TreeViewContext';
import {
  Box,
  Loader,
  TreeViewItem,
} from '../../index';

import InsertionIndicator from './InsertionIndicator';
import { SectionOrItemRender } from './TreeView';
import { sectionPressHandlers } from './TreeViewKeyboardDelegate';
import TreeViewRow from './TreeViewRow';

export const onKeyDownSection = (
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
  isFocused,
) => {
  switch (e.which) {
    case 9:
      if (isFocused) {
        sectionPressHandlers.onTabPress(e, refArray, focusManager, true, key);
      }
      break;
    case 13:
      sectionPressHandlers.onEnterPress(e, state, key);
      break;
    case 32:
      sectionPressHandlers.onSpacePress(e, tree, key, isSelected);
      break;
    case 33:
      sectionPressHandlers.onPageUpPress(e, key, flatKeyArray, refArray, pageLength);
      break;
    case 34:
      sectionPressHandlers.onPageDownPress(e, key, flatKeyArray, refArray, pageLength);
      break;
    case 36:
      sectionPressHandlers.onHomePress(key, flatKeyArray, refArray);
      e.preventDefault();
      e.stopPropagation();
      break;
    case 35:
      sectionPressHandlers.onEndPress(key, flatKeyArray, refArray);
      e.preventDefault();
      e.stopPropagation();
      break;
    case 37:
      sectionPressHandlers.onLeftPress(e, focusManager, state, key, isExpanded, refArray);
      break;
    case 38:
      sectionPressHandlers.onUpPress(e, key, refArray, flatKeyArray);
      e.preventDefault();
      e.stopPropagation();
      break;
    case 39:
      if (isFocused) {
        sectionPressHandlers.onRightPress(e, focusManager, state, key, isExpanded, refArray);
      }
      break;
    case 40:
      e.preventDefault();
      e.stopPropagation();
      sectionPressHandlers.onDownPress(e, key, refArray, flatKeyArray);
      break;
    default:
      break;
  }
};

export const removeRefFromArrayHelper = (prevState, keyToRemove) => {
  if (prevState.some(item => item.key === keyToRemove)) {
    const newArray = [...prevState.filter(_item => _item.key !== keyToRemove)];
    return newArray;
  }
  return prevState;
};

export const addRefToArrayHelper = (prevState, keyToAdd, refToAdd) => {
  if (!prevState.some(i => i.key === keyToAdd)) {
    const thisObj = {
      key: keyToAdd,
      thisRef: refToAdd,
    };

    return [
      ...prevState,
      thisObj,
    ];
  }
  return prevState;
};

const TreeViewSection = forwardRef((props, ref) => {
  const {
    item,
    items,
    title,
    hasChildren,
    loadingNodes,
    focusManager,
    onKeyDown,
    level,
    position,
    setSize,
  } = props;

  const { key } = item;

  const treeSectionRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => treeSectionRef.current);

  const {
    state,
    tree,
    refArray,
    flatKeyArray,
    dragState,
    dropState,
    pageLength,
  } = useTreeViewContext();

  const { isSelected, isDisabled } = useOption({ key }, state, treeSectionRef);

  const isExpanded = state.expandedKeys.has(key);
  const isDragging = dragState.isDragging(item.key);

  const [loaderState, setLoaderState] = useState();

  useEffect(() => {
    if (loadingNodes) {
      loadingNodes.forEach(loader => {
        if (loader.node === title) setLoaderState(loader.loadingState);
      });
    }
  }, [loadingNodes, title]);

  const onKeyDownFunction = e => {
    onKeyDownSection(e,
      state,
      key,
      tree,
      isSelected,
      isExpanded,
      focusManager,
      flatKeyArray,
      refArray,
      pageLength,
      true,
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
        ref={treeSectionRef}
        aria-expanded={isExpanded}
        aria-disabled={isDisabled}
        role="row"
        variant="treeView.wrapper"
        aria-selected={isSelected}
        tabIndex="-1"
        aria-level={level}
        aria-setsize={setSize}
        aria-posinset={position + 1}
      >
        <TreeViewRow
          item={item}
          title={title}
          items={items}
          isDragging={isDragging}
          isExpanded={isExpanded}
          onKeyDown={onKeyDownFunction}
          hasChildren={hasChildren}
        />
        { isExpanded && (
          <Box
            role="rowgroup"
            key={`${item.key} ul`}
            sx={{
              pl: 'md',
              '& :focus': { border: 'none' },
            }}
          >
            <VisuallyHidden aria-live="polite">{loaderState === false && (isExpanded && items.length > 0 ? ' Loading successful' : 'Loading unsuccessful')}</VisuallyHidden>
            { loaderState ? <Loader color="active" ml="31px" />
              : (Array.from(items).map((_item, _index) => (
                SectionOrItemRender(
                  // _item.value.items?.length > 0 || _item.value.items,
                  _item.children?.length > 0 || _item.value.items,
                  <TreeViewSection
                    item={_item}
                    items={_item.children}
                    title={_item.value.title}
                    key={_item.value.title}
                    hasChildren={_item.value.items && true}
                    loadingNodes={loadingNodes}
                    focusManager={focusManager}
                    level={level + 1}
                    position={_index}
                    setSize={items.length}
                  />,
                  <TreeViewItem
                    item={_item}
                    title={_item.value.title}
                    key={_item.value.title}
                    focusManager={focusManager}
                    level={level + 1}
                    position={_index}
                    setSize={items.length}
                  />,
                )
              )))}
          </Box>
        )}
      </Box>
      <InsertionIndicator
        target={{ type: 'item', key: item.key, dropPosition: 'after' }}
        dropState={dropState}
      />
    </>
  );
});

TreeViewSection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  item: PropTypes.shape({
    key: PropTypes.string,
  }),
  title: PropTypes.string,
  hasChildren: PropTypes.bool,
  loadingNodes: PropTypes.arrayOf(PropTypes.shape({})),
  focusManager: PropTypes.shape({}),
  onKeyDown: PropTypes.func,
  level: PropTypes.number,
  position: PropTypes.number,
  setSize: PropTypes.number,
};

export default TreeViewSection;
