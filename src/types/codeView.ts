import type { PrismTheme } from 'prism-react-renderer';
import { Language, Prism as PrismRR } from 'prism-react-renderer';
import Prism from 'prismjs';
import { ThemeUICSSObject } from 'theme-ui';

import { IconButtonProps } from './iconButton';
import { HoverProps, StyleProps } from './shared';

export type PrismProps = typeof PrismRR & typeof Prism;
export type PrismThemeProps = PrismTheme;

export interface PrismLib {
  highlight: typeof Prism.highlight;
  languages: typeof Prism.languages;
  hooks: typeof Prism.hooks;
}

export interface CodeViewProps extends HoverProps, StyleProps {
  children?: string;
  className?: string;
  hasLineNumbers?: boolean;
  hasNoCopyButton?: boolean;
  language?: keyof typeof Prism.languages | Language;
  Prism?: PrismLib | PrismProps;
  textToCopy?: string;
  sx?: ThemeUICSSObject;
  stylesProp?: ThemeUICSSObject;
  isOnyx?: boolean;
  iconButtonProps?: IconButtonProps;
}
