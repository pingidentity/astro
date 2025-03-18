import { ThemeUICSSObject } from 'theme-ui';

import { ContainerProps, ControlProps } from '../hooks/useField/useField';

import { SharedFieldProps } from './shared/fieldProps';
import { HelpHintProps } from './helpHint';
import { AriaRole, StyleProps, ValidPositiveInteger } from './shared';

export interface TextFieldProps extends StyleProps, SharedFieldProps{
  /** The unique identifier for the input element. */
  id?: string;
  /** The name for the input element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name?: string;
  /** How the input should handle autocompletion according to the browser. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). The `autocomplete` prop is an alias for this. */
  autoComplete?: string;
  /** The default value for the input element. */
  defaultValue?: string;
  /** Whether the input element is automatically focused when loaded onto the page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus). */
  hasAutoFocus?: boolean;
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator?: boolean;
  helpHintProps?: HelpHintProps;
  /** Whether the field is disabled. */
  isDisabled?: boolean;
  /** Whether the input can be selected; but not changed by the user. */
  isReadOnly?: boolean;
  /** Whether the field is required. */
  isRequired?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Callback fired when focus is lost on the input element.
   */
  onBlur?: () => void;
  /**
   * Callback fired when focus is lost on the input element.
   */
  onFocus?: () => void;
  /** The placeholder text to display in the input element. */
  placeholder?: string;
  /** Provides a way to insert markup in specified places. */
  slots?: {
    /** The given node will be inserted before the input. */
    beforeInput?: React.ReactNode;
    /** The given node will be inserted into the field container. */
    inContainer?: React.ReactNode;
  };
  /** Determines the type of input to use. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). */
  type?: string;
  /** Props object that is spread directly into the input wrapper element. */
  wrapperProps?: Record<string, unknown>
  variant?: string
  controlProps?: ControlProps;
  containerProps?: ContainerProps;
  value?: string;
  maxLength?: ValidPositiveInteger;
  role?: AriaRole;
  sx?: ThemeUICSSObject;
}
