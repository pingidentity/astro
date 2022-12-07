import React, { forwardRef, useCallback, useImperativeHandle, useMemo } from 'react';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import MenuDown from 'mdi-react/MenuDownIcon';
import MenuUp from 'mdi-react/MenuUpIcon';
import { mergeProps, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';
import { useLocale } from '@react-aria/i18n';
import { v4 as uuid } from 'uuid';

import {
  Box,
  FieldHelperText,
  Icon,
  IconButton,
  Input,
  Label,
} from '../../';
import { ariaAttributesBasePropTypes } from '../../utils/devUtils/props/ariaAttributes';
import { useField, usePropWarning } from '../../hooks';
import statuses from '../../utils/devUtils/constants/statuses';

/**
 * Number fields allow users to enter a number, and increment or
 * decrement the value using stepper buttons.
 *
 * Utilizes [useNumberField](https://react-spectrum.adobe.com/react-aria/useNumberField.html) from React Aria
 * and [useNumberFieldState](https://react-spectrum.adobe.com/react-stately/useNumberFieldState.html) from
 * React Stately.
 */

const NumberField = forwardRef((props, ref) => {
  const { helperText, status } = props;
  const { locale } = useLocale();

  const state = useNumberFieldState({ ...props, locale });

  const inputRef = React.useRef();
  const incrRef = React.useRef();
  const decRef = React.useRef();
  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);
  const { fieldContainerProps, fieldControlProps, fieldLabelProps } = useField(
    props,
  );

  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const ControlArrows = (
    <Box variant="forms.numberField.arrows">
      <IconButton {...incrementButtonProps} ref={decRef} tabIndex="-1" p={0}>
        <Icon icon={MenuUp} size={18} />
      </IconButton>
      <IconButton {...decrementButtonProps} ref={incrRef} tabIndex="-1" p={0}>
        <Icon icon={MenuDown} size={18} />
      </IconButton>
    </Box>
  );

  // this needed to remove console warning in React 16
  // I believe once we update to 17 - we can remove this
  const onInputFocus = useCallback(
    (e) => {
      e.persist();
      fieldControlProps.onFocus(e);
      inputProps.onFocus(e);
    },
    [fieldControlProps, inputProps],
  );
  const onInputBlur = useCallback(
    (e) => {
      e.persist();
      fieldControlProps.onBlur(e);
      inputProps.onBlur(e);
    },
    [fieldControlProps, inputProps],
  );

  const updatedFieldControlProps = useMemo(
    () => ({
      ...fieldControlProps,
      onFocus: onInputFocus,
      onBlur: onInputBlur,
    }),
    [fieldControlProps, onInputBlur, onInputFocus],
  );

  const onInputChange = (e) => {
    const { minValue } = props;
    const trimmedInputValue = e.target.value.trim();
    const trimmedValueEvent = {
      ...e,
      target: {
        ...e.target,
        value: trimmedInputValue,
      },
    };
    if (!trimmedInputValue && typeof minValue !== 'undefined') {
      const minValueEvent = {
        ...e,
        target: {
          ...e.target,
          value: minValue.toString(),
        },
      };
      inputProps.onChange(minValueEvent);
    } else {
      inputProps.onChange(trimmedValueEvent);
    }
  };
  inputProps['aria-roledescription'] = null;

  const helperTextId = useMemo(() => uuid(), []);

  return (
    <Box {...fieldContainerProps}>
      <Label {...mergeProps(fieldLabelProps, labelProps)} />
      <Box variant="forms.numberField.noDefaultArrows" {...groupProps}>
        <Box
          variant="forms.numberField.arrowsWrapper"
          className={fieldControlProps.className}
        >
          <Input
            variant="forms.input.numberField"
            ref={inputRef}
            // we don't want to merge this props, we want to
            // overwrite them like defaultValue, value, ect.
            {...updatedFieldControlProps}
            {...omit(inputProps, ['name', 'onFocus', 'onBlur'])}
            onChange={onInputChange}
            aria-describedby={helperText && helperTextId}
            role="textbox"
          />
          {ControlArrows}
        </Box>
        {helperText && (
          <FieldHelperText status={status} id={helperTextId}>{helperText}</FieldHelperText>
        )}
      </Box>
    </Box>
  );
});

export default NumberField;

NumberField.propTypes = {
  /** A custom aria-label for the decrement button.
   * If not provided, the localized string "Decrement" is used. */
  decrementAriaLabel: PropTypes.string,
  /** A custom aria-label for the increment button.
   * If not provided, the localized string "Increment" is used. */
  incrementAriaLabel: PropTypes.string,
  /** Formatting options for the value displayed in the number field.
   * This also affects what characters are allowed to be typed by the user.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat)
   * */
  formatOptions: PropTypes.shape({}),
  /** Whether the input is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the input can be selected but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /**
   * Callback fired when focus is lost on the input element.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when focus is lost on the input element.
   */
  onFocus: PropTypes.func,
  /** Handler that is called when the element's focus status changes. */
  onFocusChange: PropTypes.func,
  /** Handler that is called when a key is pressed. */
  onKeyDown: PropTypes.func,
  /** Handler that is called when a key is released. */
  onKeyUp: PropTypes.func,
  /** Temporary text that occupies the text input when it is empty. */
  placeholder: PropTypes.string,
  /** The amount that the input value changes with each increment or decrement "tick".
   * The step prop can be used to snap the value to certain increments.
   * You can read more about this prop here
   * [Step values](https://react-spectrum.adobe.com/react-aria/useNumberField.html#step-values)
   * */
  step: PropTypes.number,
  /** The smallest value allowed for the input. */
  minValue: PropTypes.number,
  /** The largest value allowed for the input. */
  maxValue: PropTypes.number,
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText: PropTypes.string,
  /**
   * Handler that is called when the value changes.
   * (value: number) => void
   */
  onChange: PropTypes.func,
  /** Determines the input status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /** The default value (uncontrolled). */
  defaultValue: PropTypes.number,
  /** The current value (controlled). */
  value: PropTypes.number,
  ...ariaAttributesBasePropTypes,
};
