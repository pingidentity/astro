import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';
import { usePress } from '@react-aria/interactions';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import { Box, Checkbox, FieldHelperText, Label } from '../..';
import { useField, usePropWarning } from '../../hooks';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusPropTypes } from '../../utils/docUtils/statusProp';

const CheckboxField = forwardRef((props, ref) => {
  const {
    label,
    controlProps = {},
    hasAutoFocus,
    helperText,
    isDefaultSelected,
    isIndeterminate,
    status,
  } = props;
  const checkboxProps = {
    children: label,
    autoFocus: hasAutoFocus || controlProps.hasAutoFocus,
    defaultSelected: isDefaultSelected || controlProps.isDefaultSelected,
    ...props,
    ...controlProps,
  };

  const state = useToggleState(checkboxProps);
  const checkboxRef = useRef();
  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => checkboxRef.current);

  const { pressProps: containerPressProps } = usePress({ ...props, ref: checkboxRef });

  useEffect(() => {
    if (checkboxRef.current && isIndeterminate) {
      checkboxRef.current.indeterminate = true;
    } else if (checkboxRef.current && !isIndeterminate) {
      checkboxRef.current.indeterminate = false;
    }
  }, [isIndeterminate]);

  const { inputProps } = useCheckbox(checkboxProps, state, checkboxRef);
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldLabelProps,
  } = useField({
    ...containerPressProps,
    ...props,
    statusClasses: { isIndeterminate },
    controlProps: { ...controlProps, ...inputProps },
  });

  const helperTextId = useMemo(() => uuid(), []);

  return (
    <Box {...fieldContainerProps}>
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

CheckboxField.propTypes = {
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText: PropTypes.string,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Whether the element should be selected (uncontrolled). */
  isDefaultSelected: PropTypes.bool,
  /** Whether the input is disabled. */
  isDisabled: PropTypes.bool,
  /**
   * Indeterminism is presentational only. The indeterminate visual representation remains until
   * this prop is set to false regardless of user interaction.
  */
  isIndeterminate: PropTypes.bool,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether user input is required on the input before form submission. */
  isRequired: PropTypes.bool,
  /** Whether the element should be selected (controlled). */
  isSelected: PropTypes.bool,
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name: PropTypes.string,
  /** The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). */
  value: PropTypes.string,
  /** Handler that is called when the element's selection state changes. */
  onChange: PropTypes.func,
  /** Handler that is called when the element receives focus. */
  onFocus: PropTypes.func,
  /** Handler that is called when the element loses focus. */
  onBlur: PropTypes.func,
  /** Handler that is called when the element's focus status changes. */
  onFocusChange: PropTypes.func,
  /** Handler that is called when a key is pressed. */
  onKeyDown: PropTypes.func,
  /** Handler that is called when a key is released. */
  onKeyUp: PropTypes.func,
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
  ...inputFieldAttributesBasePropTypes,
};

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;
