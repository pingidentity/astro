import { ReactNode } from 'react';

import { Status } from './item';
import { DOMAttributes } from './shared';

export interface RadioFieldProps extends DOMAttributes {
  /** Content to display when the radio is checked. */
  checkedContent?: ReactNode,
  /** props spread into the input element */
  controlProps?: object,
  /** The rendered label for the field. */
  label?: ReactNode,
  /** Whether the element should receive focus on render. */
  hasAutoFocus?: boolean,
  /** Text rendered below the input. */
  helperText?: ReactNode,
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText?: string,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string,
  /**
   * Whether the radio button is disabled or not. Shows that a selection exists, but is not
   * available in that circumstance.
  */
  isDisabled?: boolean,
  /** Whether the Radio can be interacted with but cannot have its selection state changed. */
  isReadOnly?: boolean,
  /** Whether the Radio is required. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required). */
  isRequired?: boolean,
  /** the status of the radio field */
  status?: Status
  /** The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). */
  value: string,
  /** Handler that is called when the element receives focus. */
  onFocus?: () => void,
  /** Handler that is called when the element loses focus. */
  onBlur?: () => void,
  /** Handler that is called when the element's focus status changes. */
  onFocusChange?: () => void,
  /** Handler that is called when a key is pressed. */
  onKeyDown?: () => void,
  /** Handler that is called when a key is released. */
  onKeyUp?: () => void,
}
