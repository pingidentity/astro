import { ButtonProps as ThemeUIButtonProps } from 'theme-ui';

import { TestingAttributes } from './shared/test';
import { HoverProps, PressProps } from './shared';

export interface ButtonProps extends
  HoverProps,
  PressProps,
  ThemeUIButtonProps,
  TestingAttributes {
  isDisabled?: boolean,
  isLoading?: boolean,
  tabIndex?: number,
}
