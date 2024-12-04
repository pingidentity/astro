import { UseFieldProps } from '../hooks/useField/useField';

import { TestingAttributes } from './shared/test';
import { Status } from './item';
import { Requirement, RequirementsListProps } from '.';

export interface PasswordFieldProps extends UseFieldProps<HTMLInputElement>, TestingAttributes {
  /** The rendered label for the field. */
  label?: string | React.ReactNode,
  /** Whether or not the password is visible. */
  isVisible?: boolean,
  /** Function that is passed into the IconButton within this component. */
  onVisibleChange?: (isVisible: boolean, args: unknown) => void,
  /** The unique identifier for the input element. */
  id?: string,
  /** The name for the input element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name?: string,
  /**
   * Callback fired when the value is changed on the input element.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: (e: React.ChangeEvent) => void,
  /** The value for the input element (controlled). */
  value?: string,
  /** How the input should handle autocompletion according to the browser. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). The `autocomplete` prop is an alias for this. */
  autoComplete?: string,
  /** @ignore Alias for `autoComplete` prop. Exists for backwards-compatibility. */
  autocomplete?: string,
  /** The default value for the input element. */
  defaultValue?: string,
  /** Whether the input element is automatically focused when loaded onto the page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus). */
  hasAutoFocus?: boolean,
  /** Whether the field is disabled. */
  isDisabled?: boolean,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly?: boolean,
  /** Whether the field is required. */
  isRequired?: boolean,
  /**
   * Callback fired when focus is lost on the input element.
   */
  onBlur?: () => void,
  /**
   * Callback fired when focus is lost on the input element.
   */
  onFocus?: () => void,
  /** The placeholder text to display in the input element. */
  placeholder?: string,
  /** Provides a way to insert markup in specified places. */
  slots?: {
    /** The given node will be inserted into the field container. */
    inContainer: React.ReactNode,
  },
  /** Determines the type of input to use. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). */
  type?: string,
  /** @ignore Prop that allows testing of the icon button. */
  viewHiddenIconTestId?: string,
  /** @ignore Prop that allows testing of the icon button. */
  viewIconTestId?: string,
  /** Array of Requirements and their status. */
  requirements?: Requirement[],
  /** Props object that is spread to the requirements list. */
  requirementsListProps?: RequirementsListProps,
  status?: Status
}

export interface RequirementMessageProps {
  requirement: Requirement
}
