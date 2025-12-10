import { Dispatch, ReactElement, SetStateAction } from 'react';
import type { CollectionChildren, Node } from '@react-types/shared';

import { TestingAttributes } from './shared/test';
import { DOMAttributes, StyleProps } from './shared';

export interface EnvironmentBreadcrumbProps<T> extends StyleProps, TestingAttributes {
    /** Callback function that fires when the selected key changes. */
    onSelectionChange?: (keys: Selection | unknown) => unknown,
    /** Current environment */
    selectedItem?: ReactElement | string ;
    /** Displayed name */
    name?: string;
    /** Callback function that fires when name pressed */
    onNamePress?: () => void;
    /** The list of environments. */
    items?: Iterable<T>; /// isIterableProp,
    /**
     * Filter function to generate a filtered list of nodes.
     *
     * `(nodes: Iterable<Node>) => Iterable<Node>`
     */
    itemsFilter?: (nodes: Iterable<Node<T>>) => Iterable<Node<T>>;
    /** Callback function that fires when the dropdown is opened. */
    onPopoverOpen?: () => void;
    /** Callback function that fires when the dropdown is closed. */
    onPopoverClose?: () => void;
    /** Props object that is spread directly into the popover container component. */
    popoverProps?: object;
    /** Props object that is spread directly into the SearchField element. */
    searchProps?: object;
    /** Array of keys to disable within the options list. */
    disabledKeys?: string[];
    /** Text that will be shown if no search results found. */
    emptySearchText?: string;
    /** Sets the default open state of the overlay. */
    isDefaultOpen?: boolean;
    /** Whether the overlay is currently open. */
    isOpen?: boolean;
    /**
     * Method that is called when the open state of the menu changes.
     *
     * `(isOpen: boolean, overlayTrigger: OverlayTriggerAction) => void`
     */
    onOpenChange?: Dispatch<SetStateAction<boolean>>;
    /** Callback function that returns number of filtered options. */
    onFilteredOptionsNumber?: Dispatch<SetStateAction<number | null>>;
    /** Message to announce number of available options by screen reader. */
    optionsCountMessage?: string;

    children?: CollectionChildren<T>;
}

export interface EnvironmentItemProps extends StyleProps, DOMAttributes, TestingAttributes {
    name: string,
    key?: string,
    isSandbox?: boolean,
    options?: Array<{
        name: string
        isSandbox?: boolean,
        options?: Array<object>
    }>,
    childNodes?: Iterable<Node<object>>,
}
