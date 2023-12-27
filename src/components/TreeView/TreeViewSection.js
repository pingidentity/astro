import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useOption } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';
import PropTypes from 'prop-types';

import { useTreeViewContext } from '../../context/TreeViewContext';
import { useStatusClasses } from '../../hooks';
import {
  Box,
  TreeViewItem,
} from '../../index';

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
      sectionPressHandlers.onDownPress(e, key, refArray, flatKeyArray);
      e.preventDefault();
      e.stopPropagation();
      break;
    default:
      /* istanbul ignore next */
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
    state, tree, refArray, setRefs, flatKeyArray, pageLength, setLastFocusedItem, lastFocusedItem,
  } = useTreeViewContext();

  const { optionProps, isDisabled, isSelected } = useOption(
    { key },
    state,
    treeSectionRef,
  );

  const { focusProps, isFocused } = useFocusRing();

  const {
    focusProps: focusPropsWithin,
    isFocused: isFocusedWithin,
  } = useFocusRing({ within: true });

  const isExpanded = state.expandedKeys.has(key);

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
      isFocused,
    );
    if (onKeyDown) {
      onKeyDown(e, key);
    }
  };

  const addRefToArray = (thisKey, thisRef) => {
    setRefs(prev => {
      return addRefToArrayHelper(prev, thisKey, thisRef);
    });
  };

  const removeRefFromArray = () => {
    setRefs(prev => {
      return removeRefFromArrayHelper(prev, key);
    });
  };

  // adds and removes refs on mount and dismount
  useEffect(() => {
    // this  runs on mount
    addRefToArray(key, treeSectionRef);
    return () => {
      // this runs on cleanup
      removeRefFromArray(key, refArray);
    };
  }, []);

  const mergedProps = mergeProps(
    focusPropsWithin,
    focusProps,
    optionProps,
    { onFocus: () => setLastFocusedItem(key) },
  );

  const { classNames } = useStatusClasses('', {
    isFocused,
  });

  return (
    <Box
      ref={treeSectionRef}
      aria-expanded={isExpanded}
      aria-disabled={isDisabled}
      {...mergedProps}
      role="row"
      variant="treeView.wrapper"
      className={classNames}
      aria-selected={isSelected}
      aria-level={level}
      aria-setsize={setSize}
      aria-posinset={position + 1}
      onKeyDown={e => onKeyDownFunction(e)}
      tabIndex={lastFocusedItem === key ? 0 : -1}
    >
      <TreeViewRow
        item={item}
        title={title}
        items={items}
        isExpanded={isExpanded}
        isSelected={isSelected}
        isDisabled={isDisabled}
        isParentFocused={isFocusedWithin}
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
          { Array.from(items).map((_item, _index) => (
            SectionOrItemRender(
              _item.value.items?.length > 0,
              <TreeViewSection
                item={_item}
                items={_item.children}
                title={_item.value.title}
                key={_item.value.title}
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
          ))}
        </Box>
      )}
    </Box>
  );
});

TreeViewSection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  item: PropTypes.shape({
    key: PropTypes.string,
  }),
  title: PropTypes.string,
  focusManager: PropTypes.shape({}),
  onKeyDown: PropTypes.func,
  level: PropTypes.number,
  position: PropTypes.number,
  setSize: PropTypes.number,
};

export default TreeViewSection;
