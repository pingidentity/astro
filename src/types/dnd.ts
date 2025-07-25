import { Key, RefObject } from 'react';
import {
  Collection,
  ListData,
  ListState,
  MultipleSelectionManager,
} from 'react-stately';
import {
  DraggableCollectionEndEvent,
  DraggableCollectionMoveEvent,
  DraggableCollectionStartEvent,
  DragItem,
  DragPreviewRenderer,
  DragTypes,
  DropOperation,
  DroppableCollectionDropEvent,
  DroppableCollectionEnterEvent,
  DroppableCollectionExitEvent,
  DroppableCollectionInsertDropEvent,
  DroppableCollectionOnItemDropEvent,
  DroppableCollectionReorderEvent,
  DroppableCollectionRootDropEvent,
  DropTarget,
  DropTargetDelegate,
  ItemDropTarget,
} from '@react-aria/dnd';
import {
  DraggableCollectionState,
  DroppableCollectionState,
} from '@react-stately/dnd';
import type { DroppableCollectionActivateEvent, Node } from '@react-types/shared';

export interface DraggableCollectionStateOptions {
  collection?: Collection<Node<object>>;
  getAllowedDropOperations?: () => DropOperation[];
  getItems?: (keys: Iterable<Key | string | number>) => DragItem[];
  isDisabled?: boolean;
  onDragEnd?: (e: DraggableCollectionEndEvent) => void;
  onDragMove?: (e: DraggableCollectionMoveEvent) => void;
  onDragStart?: (e: DraggableCollectionStartEvent) => void;
  preview?: RefObject<DragPreviewRenderer | null>;
  selectionManager?: MultipleSelectionManager;
}

export interface DroppableCollectionOptions {
  acceptedDragTypes?: 'all' | Array<string | symbol>;
  dropTargetDelegate?: DropTargetDelegate;
  getDropOperation?: ((
      target: DropTarget,
      types: DragTypes,
      allowedOperations: DropOperation[]
  ) => DropOperation);
  onDrop?: (e: DroppableCollectionDropEvent) => void;
  onDropActivate?: (e: DroppableCollectionActivateEvent) => void;
  onDropEnter?: (e: DroppableCollectionEnterEvent) => void;
  onDropEvent?: (e: DroppableCollectionEnterEvent) => void;
  onDropExit?: (e: DroppableCollectionExitEvent) => void;
  onInsert?: (e: DroppableCollectionInsertDropEvent) => void;
  onItemDrop?: (e: DroppableCollectionOnItemDropEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onMove?: (e: DroppableCollectionReorderEvent) => void;
  onReorder?: (e: DroppableCollectionReorderEvent) => void;
  onRootDrop?: (e: DroppableCollectionRootDropEvent) => void;
  shouldAcceptItemDrop?: (target: ItemDropTarget, types: DragTypes) => boolean;
}

export interface DroppableCollectionStateOptions {
  collection?: Collection<Node<object>>;
  getDropOperation?: ((
      target: DropTarget,
      types: DragTypes,
      allowedOperations: DropOperation[]
  ) => DropOperation);
  isDisabled?: boolean;
  onDrop?: (e: DroppableCollectionDropEvent) => void;
  onDropActivate?: (e: DroppableCollectionActivateEvent) => void;
  onDropEnter?: (e: DroppableCollectionEnterEvent) => void;
  onDropEvent?: (e: DroppableCollectionEnterEvent) => void;
  onDropExit?: (e: DroppableCollectionExitEvent) => void;
  onInsert?: (e: DroppableCollectionInsertDropEvent) => void;
  onItemDrop?: (e: DroppableCollectionOnItemDropEvent) => void;
  onMove?: (e: DroppableCollectionReorderEvent) => void;
  onReorder?: (e: DroppableCollectionReorderEvent) => void;
  onRootDrop?: (e: DroppableCollectionRootDropEvent) => void;
  selectionManager?: MultipleSelectionManager;
  shouldAcceptItemDrop?: (target: ItemDropTarget, types: DragTypes) => boolean;
}

export interface GridListRowProps {
  dragState: DraggableCollectionState;
  dropState: DroppableCollectionState;
  isReorderable?: boolean;
  item: Node<object>;
  state: ListState<object>;
}

export interface UseReorderableCollectionProps {
  draggableCollectionStateOptions: DraggableCollectionStateOptions;
  droppableCollectionStateOptions: DroppableCollectionStateOptions;
  isReorderable?: boolean;
  list: ListData<object>;
  ref: React.RefObject<HTMLUListElement>;
  state: ListState<object>;
  useDroppableCollectionOptions: DroppableCollectionOptions;
}
