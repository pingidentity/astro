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
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string;
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

export type BadgeConvenienceProps = Omit<BadgeProps, 'variant' | 'slots'>;

export type CalloutBadgeProps = BadgeConvenienceProps;

export type DefaultBadgeProps = BadgeConvenienceProps;

export interface RemovableBadgeProps extends BadgeConvenienceProps {
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string;
  /** Defines style of RemovableBadge */
  isInverted?: boolean;
  /** The label of the RemovableBadge. */
  label?: string;
  /** The function to close the RemovableBadge */
  onClose?: (id: string) => void;
}
