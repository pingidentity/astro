import React from 'react';
import { ThemeUICSSObject } from 'theme-ui';

import { TestingAttributes } from './shared/test';

type AS = Extract<keyof JSX.IntrinsicElements, 'a' | 'span'> | undefined;

export interface LinkProps extends TestingAttributes {
  /** Whether the link is disabled. */
  isDisabled?: boolean;
  /**  Handler that is called when the press is released over the target. */
  onPress?: () => void;
  /**  Specifies the HTML Element */
  as?: AS;
  /**  Specifies the location of the URL */
  href?: string;
  /**  Specifies the window where the linked page is loaded */
  target?: string;
  /** The styling variation of the link. */
  variant?: string;
  /** Whether the link is clickable inside a popover in safari */
  isSafariCompatible?: boolean;
  className?: string;
  children?: React.ReactNode;
  sx?: ThemeUICSSObject;
  id?: string;
  color?: string;
  isSelected?: boolean;
  'aria-label'?: string;
}
