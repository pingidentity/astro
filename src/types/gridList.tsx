import { Key, RefObject } from 'react';
import {
  Collection,
  DisabledBehavior,
  ListState,
  SelectionBehavior,
} from 'react-stately';
import {
  DraggableCollectionState,
  DroppableCollectionState,
} from '@react-stately/dnd';
import type { FocusStrategy, KeyboardDelegate, Node } from '@react-types/shared';

import {
  DraggableCollectionStateOptions,
  DroppableCollectionOptions,
  DroppableCollectionStateOptions,
} from './dnd';

export interface GridListProps {
    isReorderable?: boolean;
    rowProps?: object,
    cellProps?: object,
    containerProps?: object,
    items: Iterable<object>;
    children?: React.ReactNode;
    keyboardNavigationBehavior?: 'arrow' | 'tab';
    onAction?: (key: Key) => void;
    onSelectionChange?: (keys: Selection) => void;
    collection?: Collection<Node<object>>;
}

export type GridListRowProps = SharedGridListItemProps;

export interface GridRowProps {
    isReorderable?: boolean;
}

export interface ReorderableProps extends
    DraggableCollectionStateOptions,
    DroppableCollectionOptions,
    DroppableCollectionStateOptions {
}

interface SharedGridListItemProps {
    dragState: DraggableCollectionState;
    dropState: DroppableCollectionState;
    isFocusEscaped?: boolean;
    isReorderable?: boolean;
    item: Node<object>;
    state: ListState<object>;
}

export interface UseGridListItemProps extends SharedGridListItemProps {
    cellRef: React.Ref<HTMLDivElement>;
    ref: RefObject<HTMLElement>;
}

export interface UseGridListProps extends ReorderableProps {
    shouldAllowDuplicateSelectionEvents?: boolean;
    hasAutoFocus?: boolean | FocusStrategy;
    children?: React.ReactNode;
    collection?: Collection<Node<object>>;
    defaultSelectedKeys?: Iterable<Key> | 'all';
    disabledBehavior?: DisabledBehavior;
    disabledKeys?: Iterable<Key>;
    shouldDisallowEmptySelection?: boolean;
    shouldDisallowTypeAhead?: boolean;
    escapeKeyBehavior?: 'clearSelection' | 'none';
    filter?: (item: object, filterText: string) => boolean;
    getKey?: (item: object) => Key;
    initialFilterText?: string;
    initialSelectedKeys?: 'all' | Iterable<Key>;
    isReorderable?: boolean;
    items: Iterable<object>;
    keyboardDelegate?: KeyboardDelegate;
    keyboardNavigationBehavior?: 'arrow' | 'tab';
    linkBehavior?: 'action' | 'selection' | 'overridde';
    onAction?: (key: Key) => void;
    onSelectionChange?: (keys: Selection) => void;
    ref: React.RefObject<HTMLUListElement>;
    selectedKeys?: Iterable<Key> | 'all';
    selectionBehavior?: SelectionBehavior;
    selectionMode?: 'none' | 'single' | 'multiple';
    shouldFocusWrap?: boolean;
    shouldSelectOnPressUp?: boolean;
}
