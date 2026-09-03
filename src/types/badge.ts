import { StylePropertyValue, ThemeUICSSObject } from 'theme-ui';

import { HelpHintProps } from './helpHint';
import { DOMAttributes } from './shared';
import { TextProps } from './text';

export type BadgeHelpHintProps = Pick<HelpHintProps,
  'align'
  | 'arrowCrossOffset'
  | 'closeDelay'
  | 'crossOffset'
  | 'direction'
  | 'hasNoArrow'
  | 'isDarkMode'
  | 'isNotFlippable'
  | 'offset'
  | 'popoverProps'
  | 'width'
>;

export interface BadgeProps extends DOMAttributes {
  /** The text color of the badge. */
  textColor?: string | object;
  /** The background color of the box. */
  bg?: StylePropertyValue<string | undefined>,
  /** Provides a way to insert markup in specified places. */
  slots?: {
    /** The given node will be inserted into left side of the badge. */
    leftIcon?: React.ReactNode;
  };
  /** The label of the badge. */
  label?: React.ReactNode;
  /** Hint text shown in a tooltip. When provided, the badge itself is the tooltip trigger. */
  helpHint?: string;
  /** Props object used to customize the help hint tooltip. */
  helpHintProps?: BadgeHelpHintProps;
  /** Props object that is spread directly into the text. */
  textProps?: TextProps;
  /** When true, display badge label as uppercase. */
  isUppercase?: boolean;
  /** Alignment of badge relative to parent container. */
  align?: 'top' | 'right' | 'bottom' | 'left';
  /** The styling variation of the element. */
  variant?: string,
  /** Inline styling prop for item */
  sx?: ThemeUICSSObject
}
