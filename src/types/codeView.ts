import type { PrismTheme } from 'prism-react-renderer';
import { Language, Prism as PrismRR } from 'prism-react-renderer';
import Prism from 'prismjs';
import { ThemeUICSSObject } from 'theme-ui';

import { HoverProps } from './shared';

export type PrismProps = typeof PrismRR & typeof Prism;
export type PrismThemeProps = PrismTheme;

export interface CodeViewProps extends HoverProps {
  children?: string;
  className?: string;
  hasLineNumbers?: boolean;
  hasNoCopyButton?: boolean;
  language?: Language;
  Prism?: PrismProps;
  sx?: ThemeUICSSObject
}
