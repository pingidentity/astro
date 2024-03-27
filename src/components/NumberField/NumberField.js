import React, { forwardRef, useImperativeHandle } from 'react';
import { mergeProps, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';
import MenuDown from '@pingux/mdi-react/MenuDownIcon';
import MenuUp from '@pingux/mdi-react/MenuUpIcon';
import { useLocale } from '@react-aria/i18n';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import {
  Box,
  FieldHelperText,
  Icon,
  IconButton,
  Input,
  Label,
} from '../..';
import { useField, usePropWarning } from '../../hooks';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusPropTypes } from '../../utils/docUtils/statusProp';

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
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField(
    props,
  );

  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const ControlArrows = (
    <Box variant="forms.numberField.arrows">
      <IconButton {...incrementButtonProps} ref={decRef} tabIndex="0" p={0}>
        <Icon icon={MenuUp} size={18} title={{ name: 'Menu Up Icon' }} />
      </IconButton>
      <IconButton {...decrementButtonProps} ref={incrRef} tabIndex="0" p={0}>
        <Icon icon={MenuDown} size={18} title={{ name: 'Menu Down Icon' }} />
      </IconButton>
    </Box>
  );

  // this needed to remove console warning in React 16
  // I believe once we update to 17 - we can remove this
  const onInputFocus = e => {
    e.persist();
    fieldControlInputProps.onFocus(e);
    inputProps.onFocus(e);
  };
  const onInputBlur = e => {
    e.persist();
    fieldControlInputProps.onBlur(e);
    inputProps.onBlur(e);
  };
  const updatedFieldControlInputProps = {
    ...fieldControlInputProps,
    onFocus: onInputFocus,
    onBlur: onInputBlur,
  };

  const helperTextId = uuid();

  const updatedLabelProps = { ...mergeProps(fieldLabelProps, labelProps) };

  const inputPropsValue = inputProps.value || 0;

  // extract numeric value in case input value use units like '4 inches' or 'USD 45.00'
  // aria-valuenow accept only number value type
  const inputPropsNumericValue = typeof inputPropsValue === 'string'
    ? inputPropsValue.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g)[0] : inputPropsValue;

  return (
    <Box {...getPendoID('NumberField')} {...fieldContainerProps}>
      <Label {...updatedLabelProps} />
      <Box
        variant="forms.numberField.noDefaultArrows"
        {...groupProps}
      >
        <Box
          variant="forms.numberField.arrowsWrapper"
          {...fieldControlWrapperProps}
          role="spinbutton"
          aria-valuetext={inputPropsValue}
          aria-valuenow={inputPropsNumericValue}
          aria-labelledby={updatedLabelProps.id}
        >
          <Input
            variant="forms.input.numberField"
            ref={inputRef}
            // we don't want to merge this props, we want to
            // overwrite them like defaultValue, value, ect.
            {...updatedFieldControlInputProps}
            {...omit(inputProps, ['name', 'onFocus', 'onBlur', 'aria-roledescription'])}
            aria-describedby={helperText && helperTextId}
          />
          {ControlArrows}
        </Box>
        {helperText && (
          <FieldHelperText
            status={status}
            id={helperTextId}
          >
            {helperText}
          </FieldHelperText>
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
  /** The default value (uncontrolled). */
  defaultValue: PropTypes.number,
  /** The current value (controlled). */
  value: PropTypes.number,
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
  ...inputFieldAttributesBasePropTypes,
};
