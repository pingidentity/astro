import { ElementType } from 'react';

import { TestingAttributes } from './shared/test';
import { ButtonProps } from './button';
import { IconProps } from './icon';

export interface IconButtonToggleProps extends TestingAttributes {
  /** Props object that is spread into the icon element. */
  iconProps?: IconProps,
  /** Props object that is spread into the button element. */
  buttonProps?: ButtonProps,
  /** The icon that will render by default. */
  defaultIcon: ElementType,
  /** The icon that will render after toggling the icon. */
  toggledIcon: ElementType,
  /** Whether or not the icon is toggled. (use only when controlled) */
  isToggled?: boolean,
  /** Function that is passed into the IconButton within this component. */
  onToggle?: () => void,
  /** Content will be displayed in a tooltip on hover or focus. */
  title?: string,
}
