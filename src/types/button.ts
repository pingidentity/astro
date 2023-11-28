import { ButtonProps as ThemeUIButtonProps } from 'theme-ui';

import { HoverProps, PressProps } from './shared';

export interface ButtonProps extends
  HoverProps,
  PressProps,
  ThemeUIButtonProps {
  isDisabled?: boolean,
  isLoading?: boolean,
  tabIndex?: number,
}
