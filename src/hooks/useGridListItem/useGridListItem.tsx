import { mergeProps } from 'react-aria';
import { useDraggableItem } from '@react-aria/dnd';
import { useFocusRing } from '@react-aria/focus';
import { AriaGridListItemOptions, useGridListItem as raUseGridListItem } from '@react-aria/gridlist';

import { UseGridListItemProps } from '../../types/gridList';
import { useStatusClasses } from '..';

const useGridListItem = (props: UseGridListItemProps) => {
  const {
    dragState,
    isReorderable,
    item,
    ref,
    state,
  } = props;

  const { rowProps, gridCellProps } = raUseGridListItem(
    { node: item, hasChildItems: true } as AriaGridListItemOptions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state as any,
    ref,
  );

  // Register the item as a drag source.
  const { dragProps, dragButtonProps } = useDraggableItem({
    hasDragButton: true,
    key: item.key,
  }, dragState);

  const { focusProps, isFocusVisible } = useFocusRing();

  const isDragging = dragState.draggedKey === item.key;

  const { classNames } = useStatusClasses('', {
    isFocused: isFocusVisible,
    isDragging,
  });

  const mergedRowProps = {
    ...mergeProps(
      rowProps,
      focusProps,
      { ...(isReorderable && dragProps) },
      { className: classNames }),
  };

  const buttonProps = { ...mergeProps(dragButtonProps) };

  return {
    buttonProps,
    gridCellProps,
    isDragging,
    rowProps: mergedRowProps,
  };
};

export default useGridListItem;
