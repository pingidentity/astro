import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import CloseIcon from 'mdi-react/CloseIcon';
import SearchIcon from 'mdi-react/SearchIcon';
import PropTypes from 'prop-types';

import { Box, Icon, IconButton, Input, Label } from '../../';
import { ariaAttributesBasePropTypes } from '../../utils/devUtils/props/ariaAttributes';
import { useField, usePropWarning } from '../../hooks';


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
    autocomplete,
    hasAutoFocus,
    hasNoClearButton,
    icon,
    isExcludedFromTabOrder,
    label,
    controlProps,
    iconProps,
    labelProps,
  } = props;
  const searchRef = useRef();
  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => searchRef.current);
  const state = useSearchFieldState(props);
  const {
    labelProps: raLabelProps,
    inputProps: raInputProps,
    clearButtonProps,
  } = useSearchField({
    autoComplete: autocomplete,
    autoFocus: hasAutoFocus,
    excludeFromTabOrder: isExcludedFromTabOrder,
    ...props,
  }, state, searchRef);
  const {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  } = useField({
    ...props,
    labelProps: {
      ...labelProps,
      ...raLabelProps,
    },
    controlProps: {
      ...controlProps,
      ...raInputProps,
    },
  });

  const handleKeyDownEvent = (e) => {
    const key = e.key;
    if (key === 'Enter' || key === ' ') {
      state.setValue('');
    }
  };

  return (
    <Box {...fieldContainerProps}>
      {label && <Label {...fieldLabelProps} />}
      <Box variant="forms.search.container">
        <Input ref={searchRef} pl={40} pr={40} {...fieldControlProps} variant="forms.input.search" />
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
          !hasNoClearButton &&
          state.value !== '' &&
          <IconButton
            tabIndex={0}
            onKeyDown={handleKeyDownEvent}
            sx={{
              position: 'absolute',
              top: 8,
              right: 10,
              path: {
                fill: 'text.secondary',
              },
            }}
            {...clearButtonProps}
          >
            <Icon icon={CloseIcon} />
          </IconButton>
        }
      </Box>
    </Box>
  );
});

SearchField.propTypes = {
  /**
   * @ignore
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
   * @ignore
   * Indicates the availability and type of interactive popup element, such as menu or dialog, that
   * can be triggered by an element.
   */
  'aria-haspopup': PropTypes.oneOf([true, false, 'menu', 'listbox', 'tree', 'grid', 'dialog']),
  /** How the input should handle autocompletion according to the browser. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). The `autocomplete` prop is an alias for this. */
  autoComplete: PropTypes.string,
  /** @ignore Alias for `autoComplete` prop. Exists for backwards-compatibility. */
  autocomplete: PropTypes.string,
  /** The default value (uncontrolled). */
  defaultValue: PropTypes.string,
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /** Whether to display the clear button or not. */
  hasNoClearButton: PropTypes.bool,
  /** The icon to display alongside the placeholder text. */
  icon: PropTypes.elementType,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Whether the input is disabled. */
  isDisabled: PropTypes.bool,
  /** The content to display as the label. */
  label: PropTypes.node,
  /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name: PropTypes.string,
  /** Temporary text that occupies the text input when it is empty. */
  placeholder: PropTypes.string,
  /** The current value (controlled). */
  value: PropTypes.string,
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
   * Handler that is called when a key is pressed.
   * (e: KeyboardEvent) => void
   */
  onKeyDown: PropTypes.func,
  /**
   * Handler that is called when a key is released.
   * (e: KeyboardEvent) => void
   */
  onKeyUp: PropTypes.func,
  /**
   * Handler that is called when the value changes.
   * (value: string) => void
   */
  onChange: PropTypes.func,
  containerProps: PropTypes.shape({}),
  /** Props object that is spread into the input element. */
  controlProps: PropTypes.shape({}),
  /** Props object that is spread into the icon element. */
  iconProps: PropTypes.shape({}),
  /** Props object that is spread into the label element. */
  labelProps: PropTypes.shape({}),


  // NOTE: unsurfaced useSearchField / useSearchFieldState props listed below

  /** @ignore Whether the input can be selected but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /**
   * @ignore
   * Whether user input is required on the input before form submission.
   * Often paired with the necessityIndicator prop to add a visual indicator to the input.
   */
  isRequired: PropTypes.bool,
  /**
   * @ignore
   * Handler that is called when the element's focus status changes.
   * (isFocused: boolean) => void
   */
  onFocusChange: PropTypes.func,
  /**
   * @ignore
   * Whether to exclude the element from the sequential tab order. If true, the element will not be
   * focusable via the keyboard by tabbing. This should be avoided except in rare scenarios where
   * an alternative means of accessing the element or its functionality via the keyboard is
   * available.
   */
  isExcludedFromTabOrder: PropTypes.bool,
  /** The maximum number of characters supported by the input set by the user. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefmaxlength). */
  maxLength: PropTypes.number,
  /** @ignore The minimum number of characters required by the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefminlength). */
  minLength: PropTypes.number,
  /** @ignore Regex pattern that the value of the input must match to be valid. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern). */
  pattern: PropTypes.string,
  /** @ignore The type of input to render. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). */
  type: PropTypes.string,
  /**
   * @ignore
   * Hints at the type of data that might be entered by the user while editing the element or its
   * contents. See [MDN](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute).
   */
  inputMode: PropTypes.oneOf(['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search']),
  /**
   * @ignore
   * Handler that is called when the user copies text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncopy).
   */
  onCopy: PropTypes.func,
  /** @ignore Handler that is called when the user cuts text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/oncut). */
  onCut: PropTypes.func,
  /** @ignore Handler that is called when the user pastes text. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/onpaste). */
  onPaste: PropTypes.func,
  /**
   * @ignore
   * Handler that is called when a text composition system starts a new text composition session.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event).
   */
  onCompositionStart: PropTypes.func,
  /**
   * @ignore
   * Handler that is called when a text composition system completes or cancels the current text
   * composition session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event).
   */
  onCompositionEnd: PropTypes.func,
  /**
   * @ignore
   * Handler that is called when a new character is received in the current text composition
   * session. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event).
   */
  onCompositionUpdate: PropTypes.func,
  /**
   * @ignore
   * Handler that is called when text in the input is selected. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/select_event).
   */
  onSelect: PropTypes.func,
  /**
   * @ignore
   * Handler that is called when the input value is about to be modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event).
   */
  onBeforeInput: PropTypes.func,
  /**
   * @ignore
   * Handler that is called when the input value is modified. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
   */
  onInput: PropTypes.func,
  ...ariaAttributesBasePropTypes,
};

SearchField.defaultProps = {
  hasNoClearButton: false,
  icon: SearchIcon,
};

SearchField.displayName = 'SearchField';

export default SearchField;
