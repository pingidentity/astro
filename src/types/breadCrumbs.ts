import { type ElementType } from 'react';

import { TestingAttributes } from './shared/test';
import { BoxProps } from './box';
import { IconProps } from './icon';


export interface breadCrumbsProps extends BoxProps, TestingAttributes {
  /** The icon to render in between each node. */
  icon?: ElementType;
  /** Props object passed along to the Icon component. */
  iconProps?: IconProps;
  /** Whether the Breadcrumbs are disabled. */
  isDisabled?: boolean;
  /** Defines a string value that labels the current element. */
  'aria-label'?: string;
  /** Called when an item is acted upon (usually selection via press). */
  /** (key: Key) => void. */
  onAction?: (key: unknown) => void;
}

export interface breadCrumbItemProps extends BoxProps, TestingAttributes {
  actionKey?: string;
  /** Whether the breadcrumb item represents the current page. */
  isCurrent?: boolean;
  /** The HTML element used to render the breadcrumb link, e.g. 'a', or 'span'.
   * Also can be passed 'Button', 'Icon', 'IconButton', 'Text' - will be used
   * appropriate component from Astro library.
   * */
  elementType?: string | ElementType;
  /** Whether the breadcrumb item is disabled. */
  isDisabled?: boolean;
  onAction?: (key: unknown) => void;
  onPress?: () => void;
}
