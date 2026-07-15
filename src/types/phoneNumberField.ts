import { UseFieldProps } from '../hooks/useField/useField';

import { TestingAttributes } from './shared/test';
import { Status } from './item';
import { HelpHintProps } from '.';

export interface PhoneNumberFieldProps extends UseFieldProps<HTMLInputElement>, TestingAttributes {
  /** The rendered label for the field. */
  label?: string | React.ReactNode,
  /** The value for the phone number input element (controlled). */
  value?: string,
  /** The default value for the phone number input element (uncontrolled). */
  defaultValue?: string,
  /**
   * Callback fired when the phone number value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange?: (e: React.ChangeEvent) => void,
  /** The controlled selected country key (ISO2 code). */
  countryValue?: string,
  /** The uncontrolled initial selected country key (ISO2 code). */
  defaultCountryValue?: string,
  /** Callback fired when the country selection changes. */
  onCountryChange?: (key: string) => void,
  /** Helper text content to display below the field. */
  helperText?: string,
  /** The status of the field (controls visual styling). */
  status?: Status,
  /** Whether the field is disabled. */
  isDisabled?: boolean,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly?: boolean,
  /** Whether the field is required. */
  isRequired?: boolean,
  /** The name for the input element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name?: string,
  /** The unique identifier for the input element. */
  id?: string,
  /** Props object that is spread directly into the helphint element. */
  helpHintProps?: HelpHintProps,
  /** Hint text to display in the help hint tooltip. */
  hintText?: string,
  /** The placeholder text to display in the input element. */
  placeholder?: string,
}
