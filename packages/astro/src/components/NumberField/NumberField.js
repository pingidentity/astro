import React, { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import ArrowDropUpIcon from 'mdi-react/ArrowDropUpIcon';
import ArrowDropDownIcon from 'mdi-react/ArrowDropDownIcon';
import { useNumberField } from '@react-aria/numberfield';
import { useNumberFieldState } from '@react-stately/numberfield';
import { useLocale } from '@react-aria/i18n';
import { mergeProps } from '@react-aria/utils';
import statuses from '../../utils/devUtils/constants/statuses';
import {
  Box,
  FieldHelperText,
  Icon,
  IconButton,
  Input,
  Label,
} from '../../index';
import { useField, usePropWarning } from '../../hooks';

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
    <Box variant="numberField.arrows">
      <IconButton {...incrementButtonProps} ref={decRef}>
        <Icon icon={ArrowDropUpIcon} size={12} />
      </IconButton>
      <IconButton {...decrementButtonProps} ref={incrRef}>
        <Icon icon={ArrowDropDownIcon} size={12} />
      </IconButton>
    </Box>
  );

  return (
    <Box {...fieldContainerProps}>
      <Label {...mergeProps(fieldLabelProps, labelProps)} />
      <Box variant="numberField.noDefaultArrows" {...groupProps}>
        <Box variant="numberField.arrowsWrapper" className={fieldControlProps.className}>
          <Input
            variant="forms.input.numberField"
            ref={inputRef}
            // we don't want to merge this props, we want to
            // overwrite them like defaultValue, value, ect.
            {...fieldControlProps}
            {...inputProps}
          />
          {ControlArrows}
        </Box>
        {helperText && (
          <FieldHelperText status={status}>{helperText}</FieldHelperText>
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
};
