import React, { forwardRef, useContext, useEffect, useMemo, useRef } from 'react';
import { mergeProps, useCheckboxGroupItem } from 'react-aria';
import { v4 as uuid } from 'uuid';

import { Box, Checkbox, FieldHelperText, Label } from '../..';
import { CheckboxFieldGroupContext } from '../../context/CheckboxFieldGroupContext';
import { useField, useLocalOrForwardRef, usePropWarning } from '../../hooks';
import { UseFieldProps } from '../../hooks/useField/useField';
import { CheckboxFieldGroupItemProps } from '../../types/checkboxFieldGroup';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';

const displayName = 'CheckboxFieldGroupItem';

const CheckboxFieldGroupItem = forwardRef<
  HTMLInputElement,
  CheckboxFieldGroupItemProps
>((props, ref) => {
  const {
    checkBoxProps,
    controlProps = {},
    hasAutoFocus,
    helperText,
    isIndeterminate,
    label,
    status = statuses.DEFAULT,
  } = props;
  const state = useContext(CheckboxFieldGroupContext);

  if (!state) {
    throw new Error(`${displayName} must be rendered inside CheckboxFieldGroup`);
  }

  usePropWarning(props, 'disabled', 'isDisabled');
  const checkboxRef = useLocalOrForwardRef<HTMLInputElement>(ref);
  const helperTextId = useMemo(() => uuid(), []);
  const previousIndeterminate = useRef(isIndeterminate);

  const checkboxGroupItemProps = {
    ...props,
    children: label,
    autoFocus: hasAutoFocus || (controlProps as { hasAutoFocus?: boolean }).hasAutoFocus,
    isIndeterminate,
    // The hook combines this item-level value with the group's disabled/read-only state.
    isDisabled: props.isDisabled,
    ...controlProps,
  };
  const {
    labelProps: checkboxLabelProps,
    inputProps,
  } = useCheckboxGroupItem(
    checkboxGroupItemProps,
    state,
    checkboxRef,
  );
  const itemIsDisabled = !!props.isDisabled || state.isDisabled;
  const itemIsReadOnly = !!props.isReadOnly || state.isReadOnly;

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldLabelProps,
  } = useField({
    ...props,
    // React Aria combines item and group state in the hook result. Pass those
    // effective values to useField as well so its status classes and visual
    // control/label state match the native input attributes.
    isDisabled: itemIsDisabled,
    isReadOnly: itemIsReadOnly,
    controlProps: {
      ...controlProps,
      ...inputProps,
    },
    statusClasses: {
      isDisabled: itemIsDisabled,
      isReadOnly: itemIsReadOnly,
      isIndeterminate,
      isChecked: inputProps.checked,
    },
  } as UseFieldProps<object>);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = !!isIndeterminate;
      // Retain focus when the visual state changes and the browser has moved focus to body.
      if (
        !isIndeterminate
        && previousIndeterminate.current
        && document.activeElement === document.body
      ) {
        checkboxRef.current.focus();
      }
    }
    previousIndeterminate.current = isIndeterminate;
  }, [checkboxRef, isIndeterminate]);

  return (
    <Box
      variant="forms.checkboxFieldGroup.item"
      {...getPendoID(displayName)}
      {...fieldContainerProps}
    >
      <Box isRow>
        <Label
          variant="forms.label.checkboxFieldGroupItem"
          {...fieldLabelProps}
          {...checkboxLabelProps}
        >
          <Checkbox
            ref={checkboxRef}
            {...mergeProps(fieldControlInputProps, inputProps, checkBoxProps || {})}
            aria-describedby={[
              inputProps['aria-describedby'],
              helperText ? helperTextId : undefined,
            ].filter(Boolean).join(' ') || undefined}
            aria-checked={isIndeterminate ? 'mixed' : inputProps.checked}
            isIndeterminate={isIndeterminate}
          />
          {label}
        </Label>
      </Box>
      {helperText && (
        <FieldHelperText status={status} id={helperTextId}>
          {helperText}
        </FieldHelperText>
      )}
    </Box>
  );
});

CheckboxFieldGroupItem.displayName = displayName;

export default CheckboxFieldGroupItem;
