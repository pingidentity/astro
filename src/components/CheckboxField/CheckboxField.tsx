import React, { forwardRef, useEffect, useMemo } from 'react';
import { useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';
import { usePress } from '@react-aria/interactions';
import type { ToggleState, ToggleStateOptions } from '@react-stately/toggle';
import type { AriaCheckboxProps } from '@react-types/checkbox';
import { v4 as uuid } from 'uuid';

import { Box, Checkbox, FieldHelperText, Label } from '../..';
import { useField, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { UseFieldProps } from '../../hooks/useField/useField';
import { CheckboxFieldProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';

const displayName = 'CheckboxField';

const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>((props, ref) => {
  const {
    label,
    controlProps = {},
    hasAutoFocus,
    helperText,
    isDefaultSelected,
    isIndeterminate,
    status = statuses.DEFAULT,
  } = props;

  const checkboxProps = {
    children: label,
    autoFocus: hasAutoFocus || controlProps.hasAutoFocus,
    defaultSelected: isDefaultSelected || controlProps.isDefaultSelected,
    ...props,
    ...controlProps,
  };

  const state = useToggleState(checkboxProps as ToggleStateOptions) as ToggleState;
  usePropWarning(props, 'disabled', 'isDisabled');

  /* istanbul ignore next */
  const checkboxRef = useLocalOrForwardRef<HTMLInputElement>(ref);

  const { pressProps: containerPressProps } = usePress({ ...props, ref: checkboxRef });

  useEffect(() => {
    if (checkboxRef.current && isIndeterminate) {
      checkboxRef.current.indeterminate = true;
    } else if (checkboxRef.current && !isIndeterminate) {
      checkboxRef.current.indeterminate = false;
    }
  }, [isIndeterminate]);

  const { inputProps } = useCheckbox(checkboxProps as AriaCheckboxProps, state, checkboxRef);

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldLabelProps,
  } = useField({
    ...containerPressProps,
    ...props,
    statusClasses: { isIndeterminate },
    controlProps: { ...controlProps, ...inputProps },
  } as UseFieldProps<CheckboxFieldProps>);

  const helperTextId = useMemo(() => uuid(), []);

  return (
    <Box {...getPendoID(displayName)} {...fieldContainerProps}>
      <Label variant="forms.label.checkbox" {...fieldLabelProps}>
        <Checkbox
          ref={checkboxRef}
          aria-describedby={helperText && helperTextId}
          {...fieldControlInputProps}
        />
        {label}
      </Label>
      {
        helperText && (
          <FieldHelperText status={status} sx={{ pt: 7 }} id={helperTextId}>
            {helperText}
          </FieldHelperText>
        )
      }
    </Box>
  );
});

CheckboxField.displayName = displayName;

export default CheckboxField;
