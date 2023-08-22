import React from 'react';
import { SxProp, ThemeUICSSObject, ThemeUICSSProperties } from 'theme-ui';

export type SxObject = {
  [styleKey: string]: ThemeUICSSObject
}

export interface StyleProps extends ThemeUICSSProperties, SxProp {
  /** The styling variation of the element. */
  variant?: string,
  /** The base HTML tag name or React component type to render */
  as?: string | React.ReactNode | React.ElementType,
}
