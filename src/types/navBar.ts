import React, { Key } from 'react';
import { ThemeUICSSObject } from 'theme-ui';

import { IconTypeExtended } from './icon';
import { DOMAttributes, StyleProps } from './shared';

// export type Key = string | number;

export interface NavBarProps extends StyleProps, DOMAttributes {
  /** Allows only one item to be expanded. */
  isAutoСollapsible?: boolean;
  /** This applies a style to the entire nav tree. the options are default and popup. */
  variant?: 'default' | 'popupNav';
  /** Whether or not the focus will return to the previously focused element upon unmount. */
  hasRestoreFocus?: boolean;
  /** The initial selected key in the collection (uncontrolled). */
  defaultSelectedKey?: string;
  /** The initial expanded keys in the collection (uncontrolled). */
  defaultExpandedKeys?: Iterable<Key>;
  /** The selected key in the collection (controlled). */
  selectedKey?: Iterable<Key>;
  /**
   * Callback function that fires when the selected key changes.
   *
   * `(selectedKey: String) => void`
   */
  setSelectedKey?: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
}

export interface NavBarItemProps extends StyleProps, DOMAttributes {
  /**  Handler that is called when the press is released over the target. */
  onPress?: () => void;
  /** The icon to render in between each node. */
  icon?: IconTypeExtended;
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string;
  /** Text that will render within the component */
  text?: string;
  className?: string;
}

export interface NavBarItemBodyProps {
  item?: {
    children?: string[] | object[];
    key?: string;
    itemHeight?: number
  };
  isTransitioning: boolean;
  isExpanded: boolean;
  className?: string;
  onKeyDown?: (...args: unknown[]) => void;
}

export interface ChildItemWrapperProps {
  children?: {
    [key: string]: string[] | object[] | React.ReactNode;
  };

  onKeyDown?: (...args: unknown[]) => void;
}

export interface NavBarItemButtonProps {
  /**  Handler that is called when the press is released over the target. */
  onPress?: () => void;
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: string;
  className?: string;
  sx?: ThemeUICSSObject;
  children?: React.ReactNode;
}

export interface NavBarItemHeaderProps {
  item: {
    children?: string[] | object[];
    href?: string;
  };
}

export interface NavBarSectionItemHeaderProps {
  item: {
    heading?: string;
    icon?: IconTypeExtended;
    className?: string;
    children?: string[] | object[];
    key?: string;
    href?: string;
  };
}

export interface NavBarPrimaryItemHeaderProps {
  item: {
    heading?: string;
    icon?: IconTypeExtended;
    className?: string;
    customIcon?: IconTypeExtended;
    children?: string[] | object[] | undefined;
    href?: string | undefined;
  };
}

export interface NavBarItemLinkProps {
  /**  Specifies the location of the URL */
  href?: string;
  /**  Handler that is called when the press is released over the target. */
  onPress?: () => void;
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: string;
  className?: string;
  sx?: ThemeUICSSObject;
  children?: React.ReactNode | string;
  variant?: string;
  onClick?: (e: Event) => void;
}

export interface NavBarSectionProps<T> {
  /** If true, a separator will render at the end of the section */
  hasSeparator?: boolean;
  /** callback that runs on key down */
  onKeyDown?: () => void;
  /** If present, this string will render at the top of the section */
  title?: string;
  /**
   * *For performance reasons, use this prop instead of Array.map when iteratively rendering Items*.
   * For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections).
   */
  items?: Iterable<T>;
}

export interface ChildrenProps {
  key?: string;
}

export interface SectionItemProps<T> {
  onKeyDown?: (...arg: unknown[]) => void;
  item?: {
    key?: string;
    children?: Array<ChildrenProps>;
    'aria-label'?: string;
  };

  state?: {
    collection?: Iterable<T>;
    selectedKey?: string;
    setSelectedKey?: () => void;
    selectionManager?: {
      focusedKey?: string;
      setFocusedKey?: () => void;
    };
  };
  menuProps?: StyleProps;
}

export interface PrimaryItemProps {
  item: {
    href?: string;
  };
}
