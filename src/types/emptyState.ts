import React from 'react';

import { BoxProps } from './box';
import { ButtonProps } from './button';
import { IconProps, IconTypeExtended } from './icon';
import { TextProps } from './text';

export interface EmptyStateProps extends BoxProps {
  /** The icon rendered above the heading. */
  icon?: IconTypeExtended;
  /** Props spread onto the underlying Icon (spread after defaults, so they win). */
  iconProps?: IconProps;
  /** The empty-state heading. */
  heading?: React.ReactNode;
  /** Props spread onto the underlying heading Text (spread after defaults, so they win). */
  headerProps?: TextProps;
  /** Optional supporting description. Renders nothing when omitted. */
  description?: React.ReactNode;
  /** Fully custom node for the call-to-action area. Takes priority over the
   *  built-in button. */
  children?: React.ReactNode;
  /** Label for the call-to-action button. The button renders only when BOTH
   *  buttonLabel and onButtonPress are supplied (and children is not). */
  buttonLabel?: string;
  /** Press handler for the call-to-action button. */
  onButtonPress?: () => void;
  /** Props spread onto the underlying Button (spread after defaults, so they win). */
  buttonProps?: ButtonProps;
}
