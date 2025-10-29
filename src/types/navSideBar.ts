import { Key } from 'react';
import { ThemeUICSSObject } from 'theme-ui';

import { IconTypeExtended } from './icon';
import { DOMAttributes, StyleProps } from './shared';
import { IconProps, LinkProps } from '.';

export interface NavSideBarProps extends StyleProps, DOMAttributes {
  /** Allows only one item to be expanded. */
  isAutoСollapsible?: boolean;
  /** This applies a style to the entire nav tree. the options are default and popupNav. */
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

export interface NavSideBarHeaderProps {
  logo: React.ReactNode;
  linkProps?: LinkProps;
}

export type NavSideBarItemProps = {
  children: React.ReactNode;
  linkProps?: LinkProps;
  icon?: IconTypeExtended;
  className?: string;
  id?: string;
  onPress?: () => void;
  onClick?: (e: Event) => void;
  customIcon?: IconTypeExtended;
  iconProps?: IconProps;
  customIconProps?: IconProps;
};

export interface NavSideBarSectionProps {
  children: React.ReactNode;
  title?: string;
  icon: IconTypeExtended;
  id: string;
  key: Key;
  onKeyDown?: (...args: unknown[]) => void;
  headerProps?: Record<string, unknown>;
}

export interface NavSideBarSectionHeaderProps {
  children: React.ReactNode;
  icon?: IconTypeExtended;
  id: string;
  className?: string;
  items?: React.ReactNode;
  onExpandedChange: (...args: unknown[]) => void;
}

export interface NavSideBarSectionItemProps {
  children?: React.ReactNode;
  className?: string;
  onPress?: () => void;
  onKeyDown?: (...args: unknown[]) => void;
  key?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  item?: React.ReactElement;
  sx?: ThemeUICSSObject;
  linkProps?: LinkProps;
  id?: string;
}

export type NavSideBarSubTitleProps = {
  children?: React.ReactNode;
  sx?: ThemeUICSSObject;
};
