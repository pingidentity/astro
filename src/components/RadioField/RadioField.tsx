import React, {
  createContext,
  forwardRef,
  useContext,
} from 'react';
import { useRadio } from 'react-aria';
import { RadioGroupState } from 'react-stately';

import { useField, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { UseFieldProps } from '../../hooks/useField/useField';
import { RadioFieldProps } from '../../types/radioField';
import Box from '../Box';
import FieldHelperText from '../FieldHelperText';
import Label from '../Label';
import Radio from '../Radio';

const defaultValue = {} as RadioGroupState;

export const RadioContext = createContext<RadioGroupState>(defaultValue);

/**
 * Combines a radio, label, and helper text for a complete, form-ready solution.
 *
 * Utilizes [useRadio](https://react-spectrum.adobe.com/react-aria/useRadioGroup.html) from React
 * Aria.
 */
const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>((props, ref) => {
  const {
    checkedContent,
    controlProps,
    hasAutoFocus,
    helperText,
    isDisabled: radioDisabled,
    label,
    status,
  } = props;

  usePropWarning(props, 'disabled', 'isDisabled');
  const radioFieldRef = useLocalOrForwardRef<HTMLInputElement>(ref);

  const state = useContext(RadioContext);
  const { isDisabled: groupDisabled } = state;
  const isDisabled = radioDisabled || groupDisabled;
  const { inputProps } = useRadio(
    {
      children: label,
      autoFocus: hasAutoFocus,
      ...props,
      isDisabled,
      ...controlProps,
    },
    state,
    radioFieldRef,
  );
  const { checked: isChecked } = inputProps;
  const statusClasses = { isDisabled, isChecked };
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({
    statusClasses,
    ...props,
    controlProps: { ...controlProps, ...inputProps },
  } as UseFieldProps<object>);

  return (
    <Box variant="forms.radio.outerContainer" {...fieldContainerProps}>
      <Label variant="forms.label.radio" {...fieldLabelProps}>
        <Box {...fieldControlWrapperProps} variant="forms.radio.controlWrapper">
          <Radio
            ref={radioFieldRef}
            {...fieldControlInputProps}
            variant="forms.radio.base"
          />
        </Box>
        {label}
      </Label>
      {
        helperText
        && (
        <FieldHelperText status={status}>
          {helperText}
        </FieldHelperText>
        )
      }
      {
        isChecked && (
          checkedContent
        && (
        <Box variant="forms.radio.checkedContent">
          {checkedContent}
        </Box>
        )
        )
      }
    </Box>
  );
});

RadioField.displayName = 'RadioField';

export default RadioField;
