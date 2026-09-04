import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { mergeProps, useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';
import { usePress } from '@react-aria/interactions';
import type { ToggleState, ToggleStateOptions } from '@react-stately/toggle';
import type { AriaCheckboxProps } from '@react-types/checkbox';
import { v4 as uuid } from 'uuid';

import { Box, Checkbox, FieldHelperText, Label } from '../..';
import { useField, useGetTheme, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { UseFieldProps } from '../../hooks/useField/useField';
import { CheckboxFieldProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';

const displayName = 'CheckboxField';

const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>((props, ref) => {
  const {
    label,
    checkBoxProps,
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
  // usePress onKeyDown registers a global keyup listener and when isIndeterminate changes during
  // a press, usePress creates a new state machine instance but old global keyup
  // listener never fires cleanly and the state machine gets out of sync, causing
  // subsequent Space presses to be ignored. The checkbox input already handles Space natively.
  const { onKeyDown: _kd, onKeyUp: _ku, ...safeContainerPressProps } = containerPressProps;

  const prevIsIndeterminate = useRef(isIndeterminate);

  useEffect(() => {
    if (checkboxRef.current && isIndeterminate) {
      checkboxRef.current.indeterminate = true;
    } else if (checkboxRef.current && !isIndeterminate) {
      checkboxRef.current.indeterminate = false;

      // Restore focus to the new input when the transition  from indeterminate to default
      // occurs and focus has landed on <body> (meaning it was on the old input before the swap).
      if (prevIsIndeterminate.current && document.activeElement === document.body) {
        checkboxRef.current.focus();
      }
    }
    prevIsIndeterminate.current = isIndeterminate;
  }, [isIndeterminate]);

  const { inputProps } = useCheckbox(checkboxProps as AriaCheckboxProps, state, checkboxRef);

  const { themeState: { isOnyx } } = useGetTheme();

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldLabelProps,
  } = useField({
    ...safeContainerPressProps,
    ...props,
    statusClasses: { isIndeterminate },
    controlProps: { ...controlProps, ...inputProps },
  } as UseFieldProps<CheckboxFieldProps>);

  const helperTextId = useMemo(() => uuid(), []);

  return (
    <Box
      {...getPendoID(displayName)}
      {...fieldContainerProps}
      variant={(isOnyx && 'forms.checkboxField.container') || undefined}
    >
      <Box isRow>
        <Label variant="forms.label.checkbox" {...fieldLabelProps}>
          <Checkbox
            ref={checkboxRef}
            aria-describedby={helperText && helperTextId}
            aria-checked={isIndeterminate ? 'mixed' : state.isSelected}
            {...mergeProps(fieldControlInputProps, checkBoxProps)}
          />
          {label}
        </Label>
      </Box>
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
