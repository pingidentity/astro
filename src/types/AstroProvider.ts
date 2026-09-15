import { Theme } from 'theme-ui';

import { BoxProps } from './box';

export interface AstroTheme extends Theme {
  /** Theme identifier used by theme-conditional logic; e.g. 'ASTRO', 'NEXT_GEN', 'End User'. */
  name?: string;
}

export interface GlobalStylesProps {
  /** Whether the End User (pingito) font should be preferred for the global font stack. */
  isEndUserTheme?: boolean;
}

export interface AstroProviderProps extends BoxProps {
  /** Array of theme objects which will be merged with the default theme.
   * In the case of clashes, these will take priority.
   * Useful for customizing the default variants, adding new ones,
   * or overriding other theme values. */
  themeOverrides?: AstroTheme[];
  /** The default theme applied to the Astro components.
   * Overriding this is an advanced use case so
   * please understand potential reprecussions before editing */
  defaultTheme?: AstroTheme;
}

export interface PageWrapperProps extends BoxProps {
  /** Array of theme objects which will be merged with the default theme.
   * In the case of clashes, these will take priority.
   * Useful for customizing the default variants, adding new ones,
   * or overriding other theme values. */
  themeOverrides?: AstroTheme[];
  /** The default theme applied to the Astro components.
   * Overriding this is an advanced use case so
   * please understand potential reprecussions before editing */
  defaultTheme?: AstroTheme;
}
