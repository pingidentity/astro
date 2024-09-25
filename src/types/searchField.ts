import { ThemeUICSSObject } from 'theme-ui';

import { ControlProps } from '../hooks/useField/useField';

import { StyleProps } from './shared';
import { IconProps, IconTypeExtended, LabelProps } from '.';

export interface SearchFieldProps extends StyleProps {
  /**
     * @ignore
     * Identifies the currently active element when DOM focus is on a composite widget, textbox,
     * group, or application.
     */
  'aria-activedescendant'?: string;
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the
   * user's intended value for an input and specifies how predictions would be presented if they
   * are made.
   */
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  /**
   * @ignore
   * Indicates the availability and type of interactive popup element, such as menu or dialog, that
   * can be triggered by an element.
   */
  'aria-haspopup'?: true | false | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /** How the input should handle autocompletion according to the browser. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). The `autocomplete` prop is an alias for this. */
  autoComplete?: string;
  /** @ignore Alias for `autoComplete` prop. Exists for backwards-compatibility. */
  autocomplete?: string;
  /** The default value (uncontrolled). */
  defaultValue?: string;
  /** Whether the element should receive focus on render. */
  hasAutoFocus?: boolean;
  /** Whether to display the clear button or not. */
  hasNoClearButton?: boolean;
  /** The icon to display alongside the placeholder text. */
  icon?: IconTypeExtended;
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string;
  /** Whether the input is disabled. */
  isDisabled?: boolean;
  /** The content to display as the label. */
  label?: React.ReactNode;
  /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name?: string;
  /** Temporary text that occupies the text input when it is empty. */
  placeholder?: string;
  /** The current value (controlled). */
  value?: string;
  /**
   * Handler that is called when the SearchField is submitted.
   * (value: string) => void
   */
  onSubmit?: (value?: unknown) => void;
  /**
   * Handler that is called when the clear button is pressed.
   * () => void
   */
  onClear?: () => void;
  /**
   * Handler that is called when the element receives focus.
   * (e: FocusEvent) => void
   */
  onFocus?: (e: FocusEvent) => void;
  /**
   * Handler that is called when the element loses focus.
   * (e: FocusEvent) => void
   */
  onBlur?: (e: FocusEvent) => void;
  /**
   * Handler that is called when a key is pressed.
   * (e: KeyboardEvent) => void
   */
  onKeyDown?: (e: KeyboardEvent) => void;
  /**
   * Handler that is called when a key is released.
   * (e: KeyboardEvent) => void
   */
  onKeyUp?: (e: KeyboardEvent) => void;
  /**
   * Handler that is called when the value changes.
   * (value: string) => void
   */
  onChange?: (value: string) => void;
  /** Props object that is spread into the icon element. */
  iconProps?: IconProps;

  // NOTE: unsurfaced useSearchField / useSearchFieldState props listed below

  /** @ignore Whether the input can be selected but not changed by the user. */
  isReadOnly?: boolean;
  /**
   * @ignore
   * Whether user input is required on the input before form submission.
   * Often paired with the necessityIndicator prop to add a visual indicator to the input.
   */
  isRequired?: boolean;
  /**
   * @ignore
   * Handler that is called when the element's focus status changes.
   * (isFocused: boolean) => void
   */
  onFocusChange?: (isFocused: boolean) => void;
  /**
   * @ignore
   * Whether to exclude the element from the sequential tab order. If true, the element will not be
   * focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where
   * an alternative means of accessing the element or its functionality via the keyboard is
   * available.
   */
  isExcludedFromTabOrder?: boolean;
  /** The maximum number of characters supported by the input set by the user. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength). */
  maxLength?: number;
  /** @ignore The minimum number of characters required by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefminlength). */
  minLength?: number;
  /** @ignore Regex pattern that the value of the input must match to be valid. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern). */
  pattern?: string;
  /** @ignore The type of input to render. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). */
  type?: string;
  /**
   * @ignore
   * Hints at the type of data that might be entered by the user while editing the element or its
   * contents. See [MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute).
   */
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  /**
   * @ignore
   * Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy).
   */
  onCopy?: () => void;
  /** @ignore Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut). */
  onCut?: () => void;
  /** @ignore Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste). */
  onPaste?: () => void;
  /**
   * @ignore
   * Handler that is called when a text composition system starts a new text composition session.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event).
   */
  onCompositionStart?: () => void;
  /**
   * @ignore
   * Handler that is called when a text composition system completes or cancels the current text
   * composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event).
   */
  onCompositionEnd?: () => void;
  /**
   * @ignore
   * Handler that is called when a new character is received in the current text composition
   * session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event).
   */
  onCompositionUpdate?: () => void;
  /**
   * @ignore
   * Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event).
   */
  onSelect?: () => void;
  /**
   * @ignore
   * Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event).
   */
  onBeforeInput?: () => void;
  /**
   * @ignore
   * Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
   */
  onInput?: () => void;
  controlProps?: ControlProps;
  labelProps?: LabelProps;
  size?: string;
  sx?: ThemeUICSSObject;
}
