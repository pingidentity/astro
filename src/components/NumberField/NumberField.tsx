import React, { forwardRef } from 'react';
import { mergeProps, useNumberField } from 'react-aria';
import { useNumberFieldState } from 'react-stately';
import { useLocale } from '@react-aria/i18n';
import omit from 'lodash/omit';
import { v4 as uuid } from 'uuid';

import {
  Box,
  FieldHelperText,
  Icon,
  IconButton,
  Input,
  Label,
} from '../..';
import { useField, useGetTheme, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { FieldControlInputProps, UseFieldProps } from '../../hooks/useField/useField';
import { NumberFieldProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';

const displayName = 'NumberField';

const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>((props, ref) => {
  const { helperText, status } = props;
  const { locale } = useLocale();
  const { icons, numberFieldArrowSize, themeState: { isOnyx } } = useGetTheme();
  const { MenuDown, MenuUp } = icons;

  const state = useNumberFieldState(
    { ...props, locale } as Parameters<typeof useNumberFieldState>[0],
  );

  const inputRef = useLocalOrForwardRef<HTMLInputElement>(ref);
  const incrRef = React.useRef<HTMLButtonElement>(null);
  const decRef = React.useRef<HTMLButtonElement>(null);
  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props as Parameters<typeof useNumberField>[0], state, inputRef);
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField(
    props as UseFieldProps<HTMLInputElement>,
  );

  usePropWarning(props, 'disabled', 'isDisabled');

  const ControlArrows = (
    <Box variant="forms.numberField.arrows">
      <IconButton {...incrementButtonProps} ref={incrRef} tabIndex={0} p={!isOnyx ? 0 : undefined}>
        <Icon icon={MenuUp} size={numberFieldArrowSize} title={{ name: '' }} aria-hidden="true" />
      </IconButton>
      <IconButton {...decrementButtonProps} ref={decRef} tabIndex={0} p={!isOnyx ? 0 : undefined}>
        <Icon icon={MenuDown} size={numberFieldArrowSize} title={{ name: '' }} aria-hidden="true" />
      </IconButton>
    </Box>
  );

  const typedFieldControlInputProps = fieldControlInputProps as FieldControlInputProps & {
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    typedFieldControlInputProps.onFocus?.(e);
    inputProps.onFocus?.(e);
  };
  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    typedFieldControlInputProps.onBlur?.(e);
    inputProps.onBlur?.(e);
  };
  const updatedFieldControlInputProps = {
    ...fieldControlInputProps,
    onFocus: onInputFocus,
    onBlur: onInputBlur,
  };

  const helperTextId = uuid();

  const updatedLabelProps = { ...mergeProps(fieldLabelProps, labelProps) };

  const inputPropsValue = inputProps.value || 0;

  const inputPropsNumericValue = state.numberValue;

  return (
    <Box {...getPendoID(displayName)} {...fieldContainerProps}>
      <Label {...updatedLabelProps} />
      <Box
        variant="forms.numberField.noDefaultArrows"
        {...groupProps}
      >
        <Box
          variant="forms.numberField.arrowsWrapper"
          {...fieldControlWrapperProps}
          role="spinbutton"
          aria-valuetext={String(inputPropsValue)}
          aria-valuenow={inputPropsNumericValue}
          aria-labelledby={updatedLabelProps.id}
        >
          <Input
            variant="forms.input.numberField"
            ref={inputRef}
            // we don't want to merge this props, we want to
            // overwrite them like defaultValue, value, ect.
            {...updatedFieldControlInputProps as Omit<FieldControlInputProps, 'onChange'>}
            {...omit(inputProps, ['name', 'onFocus', 'onBlur', 'aria-roledescription']) as object}
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

NumberField.displayName = displayName;

export default NumberField;
