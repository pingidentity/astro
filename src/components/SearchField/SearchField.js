import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import SearchIcon from 'mdi-react/SearchIcon';
import CloseIcon from 'mdi-react/CloseIcon';

import Box from '../Box';
import Button from '../Button';
import Icon from '../Icon';
import Input from '../Input';
import Field from '../Field';

/**
 * Renders a search field with associated controls including visual elements and keyboard
 * interaction handlers.
 *
 * Built with [useSearchField](https://react-spectrum.adobe.com/react-aria/useSearchField.html)
 * from React Aria and
 * [useSearchFieldState](https://react-spectrum.adobe.com/react-stately/useSearchFieldState.html)
 * from React Stately.
 */
const SearchField = forwardRef((props, ref) => {
  const {
    hasClearButton,
    icon,
    iconProps,
    onSubmit,
    onClear,
    onChange,
    onFocusChange,
    ...others
  } = props;
  const searchRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => searchRef.current);
  const state = useSearchFieldState(props);
  const {
    labelProps: raLabelProps,
    inputProps: raInputProps,
    clearButtonProps,
  } = useSearchField(props, state, searchRef);

  return (
    <Field
      ref={searchRef}
      labelProps={raLabelProps}
      controlProps={raInputProps}
      render={renderProps => (
        <Box variant="forms.search.container">
          <Input pl={40} {...renderProps} />
          {
            icon &&
            <Icon
              icon={icon}
              variant="forms.search.icon"
              size={22}
              {...iconProps}
            />
          }
          {
            hasClearButton &&
            state.value !== '' &&
            <Button
              variant="icon"
              sx={{ position: 'absolute', top: 8, right: 10 }}
              {...clearButtonProps}
            >
              <Icon
                icon={CloseIcon}
                variant="forms.search.clearButtonIcon"
                size={22}
              />
            </Button>
          }
        </Box>
      )}
      {...others}
    />
  );
});

SearchField.propTypes = {
  /** Whether to display the clear button or not. */
  hasClearButton: PropTypes.bool,
  /** The icon to display alongside the placeholder text. */
  icon: PropTypes.elementType,
  /** Props object that is spread into the rendered icon component. */
  iconProps: PropTypes.shape({}),


  // NOTE: useSearchField / useSearchFieldState props listed below

  /**
   * Handler that is called when the SearchField is submitted.
   * (value: string) => void
   */
  onSubmit: PropTypes.func,
  /**
   * Handler that is called when the clear button is pressed.
   * () => void
   */
  onClear: PropTypes.func,
  /** Whether the input is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the input can be selected but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether the input should display its "valid" or "invalid" visual styling. */
  validationState: PropTypes.oneOf(['valid', 'invalid']),
  /**
   * Whether user input is required on the input before form submission.
   * Often paired with the necessityIndicator prop to add a visual indicator to the input.
   */
  isRequired: PropTypes.bool,
  /** Whether the element should receive focus on render. */
  autoFocus: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
  /**
   * Handler that is called when the element receives focus.
   * (e: FocusEvent) => void
   */
  onFocus: PropTypes.func,
  /**
   * Handler that is called when the element loses focus.
   * (e: FocusEvent) => void
   */
  onBlur: PropTypes.func,
  /**
   * Handler that is called when the element's focus status changes.
   * (isFocused: boolean) => void
   */
  onFocusChange: PropTypes.func,
  /**
   * Handler that is called when a key is pressed.
   * (e: KeyboardEvent) => void
   */
  onKeyDown: PropTypes.func,
  /**
   * Handler that is called when a key is released.
   * (e: KeyboardEvent) => void
   */
  onKeyUp: PropTypes.func,
  /** Temporary text that occupies the text input when it is empty. */
  placeholder: PropTypes.string,
  /** The current value (controlled). */
  value: PropTypes.string,
  /** The default value (uncontrolled). */
  defaultValue: PropTypes.string,
  /**
   * Handler that is called when the value changes.
   * (value: string) => void
   */
  onChange: PropTypes.func,
  /** The content to display as the label. */
  label: PropTypes.node,
  /**
   * Identifies the currently active element when DOM focus is on a composite widget, textbox,
   * group, or application.
   */
  'aria-activedescendant': PropTypes.string,
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the
   * user's intended value for an input and specifies how predictions would be presented if they
   * are made.
   */
  'aria-autocomplete': PropTypes.oneOf(['none', 'inline', 'list', 'both']),
  /**
   * Indicates the availability and type of interactive popup element, such as menu or dialog, that
   * can be triggered by an element.
   */
  'aria-haspopup': PropTypes.oneOf([true, false, 'menu', 'listbox', 'tree', 'grid', 'dialog']),
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /** Identifies the element (or elements) that labels the current element. */
  'aria-labelledby': PropTypes.string,
  /** Identifies the element (or elements) that describes the object. */
  'aria-describedby': PropTypes.string,
  /**
   * Identifies the element (or elements) that provide a detailed, extended description for the
   * object.
   */
  'aria-details': PropTypes.string,
  /**
   * Whether to exclude the element from the sequential tab order. If true, the element will not be
   * focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where
   * an alternative means of accessing the element or its functionality via the keyboard is
   * available.
   */
  excludeFromTabOrder: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). */
  autoComplete: PropTypes.string,
  /** The maximum number of characters supported by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength). */
  maxLength: PropTypes.number,
  /** The minimum number of characters required by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefminlength). */
  minLength: PropTypes.number,
  /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name: PropTypes.string,
  /** Regex pattern that the value of the input must match to be valid. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern). */
  pattern: PropTypes.string,
  /** The type of input to render. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). */
  type: PropTypes.string,
  /**
   * Hints at the type of data that might be entered by the user while editing the element or its
   * contents. See [MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute).
   */
  inputMode: PropTypes.oneOf(['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search']),
  /**
   * Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy).
   */
  onCopy: PropTypes.func,
  /** Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut). */
  onCut: PropTypes.func,
  /** Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste). */
  onPaste: PropTypes.func,
  /**
   * Handler that is called when a text composition system starts a new text composition session.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event).
   */
  onCompositionStart: PropTypes.func,
  /**
   * Handler that is called when a text composition system completes or cancels the current text
   * composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event).
   */
  onCompositionEnd: PropTypes.func,
  /**
   * Handler that is called when a new character is received in the current text composition
   * session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event).
   */
  onCompositionUpdate: PropTypes.func,
  /** Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event). */
  onSelect: PropTypes.func,
  /** Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event). */
  onBeforeInput: PropTypes.func,
  /** Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event). */
  onInput: PropTypes.func,
  /** Identifies the element that provides an error message for the object. */
  'aria-errormessage': PropTypes.string,
};

SearchField.defaultProps = {
  hasClearButton: true,
  icon: SearchIcon,
};

SearchField.displayName = 'SearchField';

export default SearchField;
