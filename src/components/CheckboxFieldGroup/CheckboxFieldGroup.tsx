import React, { forwardRef } from 'react';
import { useCheckboxGroup } from 'react-aria';
import { CheckboxGroupState, useCheckboxGroupState } from 'react-stately';

import { Box, FieldHelperText, Label } from '../..';
import { CheckboxFieldGroupContext } from '../../context/CheckboxFieldGroupContext';
import { usePropWarning, useStatusClasses } from '../../hooks';
import { CheckboxFieldGroupProps } from '../../types/checkboxFieldGroup';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';

const displayName = 'CheckboxFieldGroup';

const CheckboxFieldGroup = forwardRef<HTMLDivElement, CheckboxFieldGroupProps>((props, ref) => {
  const {
    children,
    className,
    errorMessage,
    helperText,
    hintText,
    helpHintProps,
    isDisabled,
    isRequired,
    label,
    orientation = 'vertical',
    status,
  } = props;

  const state = useCheckboxGroupState(props) as CheckboxGroupState;
  const checkboxGroupProps = {
    ...props,
    description: helperText,
  };
  const {
    groupProps,
    labelProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
  } = useCheckboxGroup(checkboxGroupProps, state);
  const { classNames } = useStatusClasses(className, {
    'is-horizontal': orientation === 'horizontal',
    'is-invalid': isInvalid,
  });
  usePropWarning(props, 'disabled', 'isDisabled');

  const renderedErrorMessage = typeof errorMessage === 'function'
    ? errorMessage({
      isInvalid,
      validationErrors: state.displayValidation.validationErrors,
      validationDetails: state.displayValidation.validationDetails,
    })
    : errorMessage;

  return (
    <Box
      ref={ref}
      className={classNames}
      variant="forms.checkboxFieldGroup.container"
      {...getPendoID(displayName)}
      {...groupProps}
    >
      {label && (
        <Label
          as="span"
          variant="forms.label.checkboxFieldGroup"
          isDisabled={isDisabled}
          isRequired={isRequired}
          hintText={hintText}
          helpHintProps={helpHintProps}
          {...labelProps}
        >
          {label}
        </Label>
      )}
      <Box
        variant="forms.checkboxFieldGroup.items"
        className={orientation === 'horizontal' ? 'is-horizontal' : undefined}
      >
        <CheckboxFieldGroupContext.Provider value={state}>
          {children}
        </CheckboxFieldGroupContext.Provider>
      </Box>
      {helperText && (
        <FieldHelperText status={status} {...descriptionProps}>
          {helperText}
        </FieldHelperText>
      )}
      {renderedErrorMessage && (
        <FieldHelperText status="error" {...errorMessageProps}>
          {renderedErrorMessage}
        </FieldHelperText>
      )}
    </Box>
  );
});

CheckboxFieldGroup.displayName = displayName;

export default CheckboxFieldGroup;
