import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import FolderIcon from '@pingux/mdi-react/FolderIcon';
import LockIcon from '@pingux/mdi-react/LockIcon';
import MenuDownIcon from '@pingux/mdi-react/MenuDownIcon';
import MenuRight from '@pingux/mdi-react/MenuRightIcon';
import { useDraggableItem, useDroppableItem } from '@react-aria/dnd';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { useOption } from '@react-aria/listbox';
import { mergeProps } from '@react-aria/utils';
import PropTypes from 'prop-types';

import { useTreeViewContext } from '../../context/TreeViewContext';
import { useStatusClasses } from '../../hooks';
import {
  Box,
  Icon,
  IconButtonToggle,
  Text,
} from '../../index';

import { addRefToArrayHelper, removeRefFromArrayHelper } from './TreeViewSection';

const TreeViewRow = forwardRef((props, ref) => {
  const {
    title,
    mainIcon = FolderIcon,
    lastIcon = LockIcon,
    item,
    items,
    isExpanded,
    hasChildren,
    isDragging,
    onKeyDown,
    ...others
  } = props;

  const treeRowRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => treeRowRef.current);

  const {
    key,
  } = item;

  const {
    state,
    dragState,
    dropState,
    refArray,
    setRefs,
    tree,
    setLastFocusedItem,
    lastFocusedItem,
    flatKeyArray,
    targetKey,
    keyBeingDragged,
  } = useTreeViewContext();

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

  // this runs on mount
  useEffect(() => {
    addRefToArray(key, treeRowRef);
  }, []);

  // cleanup, that runs on dismount.
  useEffect(() => () => {
    return removeRefFromArray(key, refArray);
  }, []);

  const { hoverProps, isHovered } = useHover({});

  const pressIcon = () => {
    state.toggleKey(item.key);
  };

  const { optionProps, isDisabled, isSelected } = useOption(
    { key },
    state,
    treeRowRef,
  );

  const pressRow = () => {
    if (isSelected) {
      tree.setSelectedKeys([]);
      return;
    }
    tree.setSelectedKeys([item.key]);
  };


  const { dropProps, isDropTarget } = useDroppableItem(
    {
      target: { type: 'item', key: item.key, dropPosition: 'on' },
    },
    dropState,
    treeRowRef,
  );

  const { dragProps } = useDraggableItem({
    hasDragButton: true,
    key: item.key,
  }, dragState);

  const { focusProps, isFocused } = useFocusRing();

  const {
    focusProps: focusWithinProps,
    isFocused: isFocusedWithin,
  } = useFocusRing({ within: true });

  // we do not allow for items to be dropped on themselves, or on their children
  const validateDropTarget = () => {
    const foundTargetItem = flatKeyArray.find(_item => _item.key === targetKey);
    if (
      !isDropTarget
      || foundTargetItem?.parentKeys?.includes(keyBeingDragged)
      || foundTargetItem.key === keyBeingDragged
      || Array.from(state.disabledKeys).includes(foundTargetItem.key)
    ) {
      return false;
    }
    if (isDropTarget) {
      return true;
    }
    return false;
  };

  const isValidDropTarget = useMemo(() => {
    return validateDropTarget();
  }, [targetKey, isDropTarget]);

  const { classNames } = useStatusClasses('', {
    isHovered,
    isSelected,
    isExpanded,
    isDisabled,
    isDragging,
    isDropTarget: isValidDropTarget,
    isFocused,
  });

  const mergedProps = mergeProps(
    hoverProps,
    others,
    optionProps,
    dragProps,
    dropProps,
    focusProps,
    focusWithinProps,
    { onFocus: () => {
      setLastFocusedItem(key);
    } },
  );

  return (
    <Box
      ref={treeRowRef}
      isRow
      alignItems="center"
      gap="xs"
      sx={{
        flexGrow: 1,
        '& :focus': { border: 'none' },
      }}
      variant="treeView.rowWrapper"
      className={classNames}
      key={`${key} box`}
      data-droptarget={isDropTarget}
      {...mergedProps}
      role="gridcell"
      tabIndex="-1"
      {...(lastFocusedItem === key && {
        tabIndex: 0,
      })}
      onKeyDown={e => {
        onKeyDown(e);
      }}
    >
      { (items?.length > 0 || hasChildren) && (
        <IconButtonToggle
          onToggle={pressIcon}
          isToggled={isExpanded}
          defaultIcon={MenuRight}
          toggledIcon={MenuDownIcon}
          iconProps={{ size: 25, title: { name: `${title} expand or collapse button` } }}
          buttonProps={{
            'aria-label': `${title} expand or collapse button`,
            tabIndex: '-1',
            ...((lastFocusedItem === key && isFocusedWithin) && {
              tabIndex: 0,
            }),
          }}
        />
      )}
      <Box
        isRow
        className={classNames}
        alignItems="center"
        gap="xs"
        variant="treeView.treeRow"
        sx={!items && {
          ml: '36px',
        }}
        onClick={pressRow}
      >
        <Icon color="focus" icon={mainIcon} size={25} title={{ name: 'folder icon' }} alt="folder icon" />
        <Text className={classNames}>
          {title}
        </Text>
        <Icon icon={lastIcon} size={15} color="accent.80" title={{ name: 'lock icon' }} alt="lock icon" />
      </Box>
    </Box>
  );
});

TreeViewRow.propTypes = {
  isSelected: PropTypes.bool,
  isDragging: PropTypes.bool,
  onKeyDown: PropTypes.func,
  isDisabled: PropTypes.bool,
  isExpanded: PropTypes.bool,
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  item: PropTypes.shape({
    key: PropTypes.string,
  }),
  mainIcon: PropTypes.elementType,
  lastIcon: PropTypes.elementType,
  hasChildren: PropTypes.bool,
};

export default TreeViewRow;
