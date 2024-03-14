import React from 'react';
import { SxProp, ThemeUICSSObject, ThemeUICSSProperties } from 'theme-ui';

export type SxObject = {
  [styleKey: string]: ThemeUICSSObject,
}

export interface StyleProps extends ThemeUICSSProperties, SxProp {
  /** The styling variation of the element. */
  variant?: string,
  /** The base HTML tag name or React component type to render */
  as?: string | React.ReactNode | React.ElementType,
  /** Inline style object that allows you to directly apply CSS styles to the element. */
  style?: React.CSSProperties | string
}

export type Placement = 'bottom' | 'bottom left' | 'bottom right' | 'bottom start' | 'bottom end' |
  'top' | 'top left' | 'top right' | 'top start' | 'top end' |
  'left' | 'left top' | 'left bottom' | 'start' | 'start top' | 'start bottom' |
  'right' | 'right top' | 'right bottom' | 'end' | 'end top' | 'end bottom';

export type Axis = 'top' | 'bottom' | 'left' | 'right';
export type Alignment = 'start' | 'end' | 'middle';
export type SizeAxis = 'width' | 'height';
export type PlacementAxis = Axis | 'center';

export type PanelSize = 'small' | 'medium' | 'large' | 'full' | 'custom';

type IconTShirtSize = 'xs' | 'sm' | 'md';
type pixelSize = 'em' | 'px' | 'rem'

export type IconSize = IconTShirtSize | number | `${number}${pixelSize}`;

export type overflowWrap = 'normal' | 'break-word' | 'anywhere' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';
export type wordBreak = 'normal' | 'break-all' | 'keep-all' | 'break-word' | 'initial' | 'inherit';
export type wordWrap = 'normal' | 'break-word' | 'initial' | 'inherit';
