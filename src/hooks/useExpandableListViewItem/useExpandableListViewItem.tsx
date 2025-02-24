import { useState } from 'react';
import { mergeProps, useFocusRing, useGridListItem } from 'react-aria';
import { useHover } from '@react-aria/interactions';

import { ExpandableItemState, ExpandableListViewItemProps } from '../../types/listView';
import { useStatusClasses } from '..';

interface UseExpandableListViewItemResult {
  expandableRowProps: object,
  cellProps: object,
  expandableContainerProps: object,
  expandableItemState: ExpandableItemState,
}

interface UseExpandableListViewItem<T> {
  /**
   * This hook wraps the useListItem hook, and modifies it,
   * providing expansion capabilities and the option for
   * escaping the focus of the ListView grid.
   *
   * Returns four objects, three of which are spread into subcomponents,
   * the fourth provides state handing props.
   * @param {Object} [props] Properties provided to the underlying hooks
   * @param {Boolean} [props.isFocusable] whether or not the option is focusable
   * @param {Boolean} [props.isHoverable] whether or not the option is hoverable
   * @param {ReactRef} [props.expandableChildrenRef] the container of all of the expandable content
   * @param {ReactRef} [props.expandableItemRowRef] the container of for the entire item
   * @param {String} [props.className] custom css classname applied to the row
   * @param {Object} [props.state] state prop passed from useTreeState. handles expansion
   * @param {Object} [props.item] item object.
   *
   * @returns {Object} {expandableRowProps}: props spread into the entire row container
   * @returns {Object} {cellProps}: props spread into the non-expanded content cell
   * @returns {Object} {expandableContainerProps}: spread into the expanded content cell
   * @returns {Object} {state}: expansion, focus, and additonal cell props
   */
  (props: ExpandableListViewItemProps<T>): UseExpandableListViewItemResult
}

const useExpandableListViewItem: UseExpandableListViewItem<object> = <T extends object, >(
  props: ExpandableListViewItemProps<T>): UseExpandableListViewItemResult => {
  const {
    item,
    item: {
      props: { listItemProps, rowProps, hasSeparator = true },
    },
    state,
    expandableItemRowRef,
    expandableChildrenRef,
    className,
  } = props;

  // convenience extractions from props
  const { key } = item;
  const dataId = item.props['data-id'];
  const isDisabled = state.disabledKeys.has(key);
  const isSelectable = state.selectionManager.selectionMode !== 'none';
  const isExpanded = state.expandedKeys.has(key);
  const isSelected = state.selectionManager.isSelected(key);

  // initialize state
  const [isFocusEscaped, setIsFocusEscaped] = useState(false);

  // call spectrum hooks
  const {
    isFocusVisible: isFocusVisibleWithin,
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const {
    isFocusVisible: isFocusVisibleContainer,
    focusProps: containerFocusProps,
  } = useFocusRing();

  const {
    isFocusVisible: isFocusWithinVisibleContainer,
    focusProps: containerWithinFocusProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const { hoverProps } = useHover({
    onHoverStart:
      /* istanbul ignore next */
      () => {
        state.hover.setHoveredItem(item.key);
      },
    onHoverEnd:
      /* istanbul ignore next */
      () => {
        state.hover.setHoveredItem('');
      },
  });

  const {
    rowProps: raRowProps,
    gridCellProps,
  } = useGridListItem({
    node: item,
    isVirtualized: true,
    shouldSelectOnPressUp: true,
  }, state, expandableItemRowRef);

  // remove row mouse event props
  // delete raRowProps.onClick;
  delete raRowProps.onMouseDown;
  delete raRowProps.onPointerDown;

  // declare custom functions
  const expandItem = () => {
    const newSet = new Set([...Array.from(state.expandedKeys), key]);
    state.setExpandedKeys(newSet);
  };

  const toggleExpanded = () => {
    if (isExpanded) {
      const set = new Set([...Array.from(state.expandedKeys)]);
      set.delete(key);
      state.setExpandedKeys(set);
    } else {
      expandItem();
    }
  };

  // overrides the row navigation.
  // if escape is pressed, focus is returned to the expanded content container

  const onKeyDownEscapeFocusRowOverride = e => {
    if (e.keyCode === 27) {
      /* istanbul ignore next */
      setIsFocusEscaped(false);
      /* istanbul ignore next */
      expandableChildrenRef?.current?.focus();
    }
  };

  // if the row is expanded, and key left is pressed:
  // return focus to the expanded content container
  const listenOnRowForLeft = e => {
    if (e.keyCode === 37 && e.target === expandableItemRowRef.current && isExpanded) {
      expandableChildrenRef?.current?.focus();
    } else if (
      (e.keyCode === 13 || e.keyCode === 32) && e.target === expandableItemRowRef.current) {
      toggleExpanded();
    } else if (raRowProps.onKeyDownCapture) {
      raRowProps.onKeyDownCapture(e);
    }
  };

  // if the expanded content container is focused, this function will call
  // it returns focus to the row on right press, and calls the native left press
  /* istanbul ignore next */
  const expandedChildrenKeyCaptureOverride = e => {
    // if left go back ie dont stifle
    // if right, stifle, but then send back to row, using ref.
    switch (e.keyCode) {
      case 37:
        if (!isFocusEscaped) {
          if (raRowProps.onKeyDownCapture) {
            raRowProps.onKeyDownCapture(e);
          }
          break;
        }
        break;
      case 39:
        expandableItemRowRef?.current?.focus();
        break;
      default:
        break;
    }
  };

  // merge props and create status css classes
  const mergedProps = mergeProps(
    raRowProps,
    focusProps,
    focusWithinProps,
  );

  const { classNames } = useStatusClasses(className, {
    isHovered: isSelectable && (item.key === state.hover.hoveredItem),
    isSelected,
    isExpanded,
    isFocused: isDisabled ? false
      : isFocusVisible
      || (isFocusVisibleWithin && (!isFocusEscaped && !isFocusVisibleContainer)),
  });

  const { classNames: focusContainerClassName } = useStatusClasses('', {
    isFocused: isFocusVisibleContainer,
  });

  const { classNames: rowClassName } = useStatusClasses('', {
    hasSeparator,
  });

  const expandableRowProps = {
    isDisabled,
    ref: expandableItemRowRef,
    ...mergedProps,
    ...rowProps,
    onKeyDownCapture: listenOnRowForLeft,
    ...(isFocusEscaped && {
      onKeyDown: onKeyDownEscapeFocusRowOverride,
    }),
    sx: { outline: 'none' },
    ...((isFocusVisibleContainer || isFocusEscaped) && {
      onKeyDownCapture: e => expandedChildrenKeyCaptureOverride(e),
    }),
    className: rowClassName,
    variant: 'listViewItem.expandableRow',
  };
  const cellProps = {
    ...hoverProps,
    variant: 'listViewItem.expandableStyledListItem',
    ...gridCellProps,
    isFocused: isDisabled ? false : isFocusVisible,
    isDisabled,
    isSelected,
    className: classNames,
    'data-id': dataId,
    ...listItemProps,
    'aria-expanded': isExpanded,
    'aria-controls': expandableChildrenRef.current?.id,
  };
  const expandableContainerProps = {
    ref: expandableChildrenRef,
    isFocusEscaped,
    setIsFocusEscaped,
    className: focusContainerClassName,
    isFocused: isFocusVisibleContainer,
    focusProps: containerFocusProps,
    focusWithinProps: containerWithinFocusProps,
    isFocusWithin: isFocusWithinVisibleContainer,
    'data-testid': 'focuscontainer',
    variant: 'listViewItem.expandableFocusContainer',
  };

  const expandableItemState = {
    isExpanded,
    isFocusEscaped,
    toggleExpanded,
    gridCellProps,
  };

  return {
    expandableRowProps,
    cellProps,
    expandableContainerProps,
    expandableItemState,
  };
};

export default useExpandableListViewItem;
