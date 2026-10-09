import type { DragAndDropHooks, DropTarget } from 'react-aria-components';
import { useDragAndDrop } from 'react-aria-components';
import type { Key } from '@react-types/shared';

/** A drag payload item: a map of MIME type to string data, per React Aria's DragItem shape. */
export type TreeDragItem = Record<string, string>;

export interface TreeReorderEvent {
  keys: Set<Key>;
  targetKey: Key;
  dropPosition: 'before' | 'after';
}

export interface TreeItemDropEvent {
  keys: Set<Key>;
  targetKey: Key;
}

export interface UseTreeDragAndDropOptions<T> {
  /** Returns the drag payload for the given keys/items, as required by React Aria. */
  getItems: (keys: Set<Key>, items: T[]) => TreeDragItem[];
  /**
   * Called when items are dropped "on" a target, i.e. the target becomes their new parent.
   */
  onItemDrop?: (event: TreeItemDropEvent) => void;
  /**
   * Called when items are dropped before/after a sibling. Performs the actual data
   * update for the reorder.
   */
  onReorder?: (event: TreeReorderEvent) => void;
  /**
   * Returns true if `key` is a descendant of (or equal to) `ofKey`. Used to reject
   * dropping an item onto itself or onto one of its own descendants (a cycle).
   */
  isDescendant?: (key: Key, ofKey: Key) => boolean;
  /** Returns true if `key` is not a valid drop target under the consumer's own policy. */
  isDisabledDropTarget?: (key: Key) => boolean;
}

/**
 * Layers tree-specific drop validation on top of React Aria Components' `useDragAndDrop`:
 * - Rejects self-drops and descendant/cycle drops.
 * - Rejects drops on disabled or policy-disallowed targets.
 * - Supports dropping "on" a target (re-parenting) via `onItemDrop` and sibling
 *   before/after reordering via `onReorder`.
 *
 * This hook does not own or mutate any data itself — all actual state updates are performed
 * by the consumer-supplied `onItemDrop`/`onReorder` callbacks.
 */
export default function useTreeDragAndDrop<T>(
  options: UseTreeDragAndDropOptions<T>,
): { dragAndDropHooks: DragAndDropHooks } {
  const {
    getItems,
    onItemDrop,
    onReorder,
    isDescendant,
    isDisabledDropTarget,
  } = options;

  const validateTarget = (
    targetKey: Key,
    draggedKeys: Set<Key>,
  ): boolean => {
    if (draggedKeys.has(targetKey)) return false;

    // Target may not be inside any dragged item's subtree (a cycle)
    if (isDescendant && Array.from(draggedKeys).some(key => isDescendant(targetKey, key))) {
      return false;
    }

    if (isDisabledDropTarget?.(targetKey)) return false;

    return true;
  };

  return useDragAndDrop<T>({
    getItems,

    // RAC routes internal 'on' drops to onMove and internal before/after drops to
    // onReorder — both handlers must be forwarded for keyboard reordering to work.
    // CAUTION: RAC's useDroppableCollection fires onMove for EVERY internal item
    // target, including before/after positions (the call sits outside its
    // dropPosition === 'on' guard). Without the explicit gate below, a pointer
    // sibling reorder would ALSO trigger onMove → onItemDrop, silently re-parenting
    // the dragged node while onReorder moves it — a data-corrupting double dispatch.
    onMove(e) {
      const target = e.target as DropTarget & { key: Key; dropPosition: string };
      const draggedKeys = e.keys as Set<Key>;
      if (target.type !== 'item' || target.dropPosition !== 'on') return;
      if (!validateTarget(target.key, draggedKeys)) return;

      onItemDrop?.({ keys: draggedKeys, targetKey: target.key });
    },

    onReorder(e) {
      const target = e.target as DropTarget & { key: Key; dropPosition: string };
      const draggedKeys = e.keys as Set<Key>;
      // A root drop has no key.
      if (target.type !== 'item') return;
      if (!validateTarget(target.key, draggedKeys)) return;

      onReorder?.({
        keys: draggedKeys,
        targetKey: target.key,
        dropPosition: target.dropPosition as 'before' | 'after',
      });
    },
  });
}
