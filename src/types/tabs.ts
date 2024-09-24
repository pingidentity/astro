import { Dispatch, ReactNode, SetStateAction } from 'react';
import { AriaTabListProps } from '@react-aria/tabs';
import { TabListState } from '@react-stately/tabs';
import type { CollectionChildren } from '@react-types/shared';

import { TestingAttributes } from './shared/test';
import { DOMAttributes, OrientationProps, StyleProps } from './shared';

export interface TabsProps extends StyleProps, TestingAttributes, OrientationProps {
     /** The default tab key to be selected. (uncontrolled) */
  defaultSelectedKey?: string;
  /** Array of keys to disable within the tab list. */
  disabledKeys?: string[];
  /** The tab key that is currently selected. (controlled) */
  selectedKey?: string;
  /** Determines the behavior model for the tabs. */
  mode?: 'default' | 'tooltip' | 'list';
  /**
   * *For performance reasons, use this prop instead of Array.map when iteratively rendering Items*.
   * For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections).
  */
  items?: Array<TabListItemProps>,
  /** Whether the entire tablist is disabled. */
  isDisabled?: boolean;
  /** Handler that is called when the selected tab has changed. */
  onSelectionChange?: Dispatch<SetStateAction<string | undefined>>;
  /** A props object that is subsequently spread into the rendered tablist. */
  tabListProps?: object;
  /** Props object that is spread directly into all of the tab panel wrapper elements. */
  tabPanelProps?: object;
  /** Whether tabs are activated automatically on focus or manually¸ */
  keyboardActivation?: 'automatic' |'manual';
  children?: CollectionChildren<object>
}

export interface AriaTabListOptions<T> extends Omit<AriaTabListProps<T>, 'children'> {
    children : CollectionChildren<T>;
}

export interface TabPanelProps extends StyleProps, DOMAttributes{
    state?: TabListState<object>;
    tabPanelProps?: object;
    children? : ReactNode | string;
}

export interface TabListItemProps {
    name?: string;
    children?: ReactNode | string;
    list?: Array<{
        key?: string | number;
        name: string;
        children: string;
        role?:string;
    }>;
    props?: object;
    index?: number,
}
