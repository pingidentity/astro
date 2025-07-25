import { ListData, ListOptions, ListProps, ListState, useListState } from 'react-stately';
import { AriaGridListOptions, useGridList as raUseGridList } from '@react-aria/gridlist';
import { useListData } from '@react-stately/data';

import { UseGridListProps } from '../../types/gridList';
import useReorderableCollection from '../useReorderableCollection';


const useGridList = (props: UseGridListProps) => {
  const {
    acceptedDragTypes,
    allowDuplicateSelectionEvents,
    autoFocus,
    children,
    collection,
    defaultSelectedKeys,
    disabledBehavior,
    disabledKeys,
    disallowEmptySelection,
    disallowTypeAhead,
    escapeKeyBehavior,
    filter,
    getDropOperation,
    initialFilterText,
    initialSelectedKeys,
    isReorderable,
    items,
    keyboardDelegate,
    keyboardNavigationBehavior,
    linkBehavior,
    onDragEnd,
    onDragMove,
    onDragStart,
    onDrop,
    onDropActivate,
    onDropEnter,
    onDropExit,
    onInsert,
    onItemDrop,
    onReorder,
    onRootDrop,
    onSelectionChange,
    ref,
    selectionBehavior,
    selectionMode,
    selectedKeys,
    shouldAcceptItemDrop,
    shouldFocusWrap,
    shouldSelectOnPressUp,
  } = props;

  const draggableCollectionStateOptions = {
    isDisabled: !isReorderable,
    onDragEnd,
    onDragMove,
    onDragStart,
  };
  const droppableCollectionStateOptions = {
    acceptedDragTypes,
    getDropOperation,
    isDisabled: isReorderable,
    onDrop,
    onDropEnter,
    onDropExit,
    onInsert,
    onItemDrop,
    onReorder,
    onRootDrop,
    shouldAcceptItemDrop,
  };

  const useDroppableCollectionOptions = {
    acceptedDragTypes,
    onInsert,
    onRootDrop,
    onItemDrop,
    onReorder,
    shouldAcceptItemDrop,
    onDropEnter,
    onDropActivate,
    onDropExit,
    onDrop,
    getDropOperation,
  };

  const listOptions = {
    filter,
    initialFilterText,
    initialItems: items,
    initialSelectedKeys,
  } as ListOptions<object>;

  const listStateOptions = {
    allowDuplicateSelectionEvents,
    children,
    collection,
    defaultSelectedKeys,
    disabledBehavior,
    disabledKeys,
    disallowEmptySelection,
    filter,
    onSelectionChange,
    selectedKeys,
    selectionBehavior,
    selectionMode,
  } as ListProps<object>;

  const list = useListData({ ...listOptions }) as ListData<object>;
  const state = useListState({ ...listStateOptions, items: list.items }) as ListState<object>;

  const gridOptions = {
    autoFocus,
    defaultSelectedKeys,
    disabledBehavior,
    disabledKeys,
    disallowEmptySelection,
    disallowTypeAhead,
    escapeKeyBehavior,
    items: list.items,
    keyboardDelegate,
    keyboardNavigationBehavior,
    linkBehavior,
    onSelectionChange,
    selectedKeys,
    selectionMode,
    shouldFocusWrap,
    shouldSelectOnPressUp,
  } as AriaGridListOptions<object>;

  const { gridProps } = raUseGridList({
    ...gridOptions,
    'aria-label': 'Reorderable list',
    disabledBehavior,
    shouldFocusWrap: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, state as any, ref);

  const dndOptions = {
    draggableCollectionStateOptions,
    droppableCollectionStateOptions,
    isReorderable,
    list,
    ref,
    state,
    useDroppableCollectionOptions,
  };

  const { dragState, dropState, collectionProps } = useReorderableCollection({
    ...dndOptions,
  });

  const gridListItemProps = {
    dragState,
    dropState,
    isReorderable,
    shouldSelectOnPressUp,
    state,
  };

  return {
    collectionProps,
    dragState,
    dropState,
    gridListItemProps,
    gridProps,
    state,
  };
};

export default useGridList;
