import { ThemeUICSSObject } from 'theme-ui';

import { ControlProps } from '../hooks/useField/useField';

import { Status } from './item';
import { LabelProps } from './label';
import { DOMAttributes } from './shared';

export interface SwitchFieldProps extends DOMAttributes {
  className?: string;
  label?: React.ReactNode;
  helperText?: string;
  isDefaultSelected?: boolean;
  isDisabled?: boolean;
  status?: Status;
  controlProps?: ControlProps;
  isSelected?: boolean;
  onChange?: () => void;
  value?: string;
  isRequired?: boolean;
  hintText?: string;
  labelProps?: LabelProps;
  hasAutoFocus?: boolean;
  id?: string;
  isReadOnly?: boolean;
  name?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onFocusChange?: () => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
  sx?: ThemeUICSSObject;
}
