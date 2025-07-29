import React, { useState } from 'react';
import { Collection, Node } from 'react-stately';
import { ListDropTargetDelegate, useDraggableCollection, useDroppableCollection } from '@react-aria/dnd';
import { ListKeyboardDelegate } from '@react-aria/selection';
import { DraggableCollectionStateOptions, useDraggableCollectionState, useDroppableCollectionState } from '@react-stately/dnd';

import { UseReorderableCollectionProps } from '../../types/dnd';

const useReorderableCollection = (props: UseReorderableCollectionProps) => {
  const [draggingKey, setDraggingKey] = useState('');

  const {
    draggableCollectionStateOptions,
    droppableCollectionStateOptions,
    isReorderable,
    list,
    useDroppableCollectionOptions,
    ref,
    state,
  } = props;

  const { onReorder } = useDroppableCollectionOptions;

  const onDropFunction = e => {
    if (e.target.dropPosition === 'before') {
      list.moveBefore(e.target.key, [draggingKey]);
    } else if (e.target.dropPosition === 'after') {
      list.moveAfter(e.target.key, [draggingKey]);
    }
  };

  const draggableStateOptions = {
    ...draggableCollectionStateOptions,
    onDragStart: e => {
      setDraggingKey(e.keys.values().next().value);
    },

    collection: state.collection,
    selectionManager: state.selectionManager,

    getItems: () => {
      return Array.from(state.collection).map(_item => {
        return {
          'text/plain': _item.key,
        };
      });
    },
  } as DraggableCollectionStateOptions;

  // Setup drag state for the collection.
  const dragState = useDraggableCollectionState({
    // Pass through events from props.
    ...draggableStateOptions,
  });

  const dropState = useDroppableCollectionState({
    ...droppableCollectionStateOptions,
    ...(isReorderable && { onReorder: onDropFunction }),
    collection: state.collection,
    selectionManager: state.selectionManager,
  });

  // not having this be an any would require bumping the react-aria global version.
  // not sure we want to do that at this time.
  const keyboardDelegate = new ListKeyboardDelegate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state.collection as Collection<Node<object>>,
    state.disabledKeys,
    ref);


  const { collectionProps } = useDroppableCollection(
    {
      ...useDroppableCollectionOptions,
      onReorder: e => {
        onDropFunction(e);
        if (onReorder) {
          onReorder(e);
        }
      },
      dropTargetDelegate: new ListDropTargetDelegate(state.collection, ref),
      keyboardDelegate,
    },
    dropState,
    ref,
  );

  useDraggableCollection(props, dragState, ref);
  return {
    collectionProps,
    dragState,
    dropState,
    state,
  };
};

export default useReorderableCollection;
