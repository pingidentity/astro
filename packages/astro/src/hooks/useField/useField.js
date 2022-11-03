import { useEffect, useState } from 'react';
import omit from 'lodash/omit';
import noop from 'lodash/noop';
import { mergeProps, useFocusRing, useLabel } from 'react-aria';
import { useFocusWithin } from '@react-aria/interactions';

import { getAriaAttributeProps } from '../../utils/devUtils/props/ariaAttributes';
import statuses from '../../utils/devUtils/constants/statuses';
import { useStatusClasses } from '../../hooks';
import { modes as labelModes } from '../../components/Label/constants';


/**
 * Generates the necessary props to be used in field components.
 * @param {{}} props Props for the field
 * @returns {{}} Prop objects to be spread into field components.
 */
const useField = (props = {}) => {
  const {
    autocomplete,
    autoComplete,
    autoCorrect,
    children,
    className,
    containerProps = {},
    controlProps = {},
    defaultText,
    defaultValue,
    direction,
    disabledKeys,
    hasAutoFocus,
    hasNoStatusIndicator,
    helperText,
    hintText,
    id,
    isDefaultSelected,
    isDisabled,
    isReadOnly,
    isRequired,
    isSelected,
    label,
    labelMode,
    labelProps = {},
    maxLength,
    name,
    onBlur,
    onChange = noop,
    onClear,
    onFocus,
    onFocusChange,
    onLoadMore,
    onOpenChange,
    onSelectionChange,
    placeholder,
    role,
    selectedKey,
    spellCheck,
    status = statuses.DEFAULT,
    statusClasses,
    type,
    value,
    wrapperProps,
    ...others
  } = props;

  // 0 could be a valid input for fields, but null, undefined, and '' are not
  const [hasValue, setHasValue] = useState(!!value || value === 0);
  const [hasFocusWithin, setFocusWithin] = useState(false);

  useEffect(() => {
    if (
      !!defaultValue ||
      defaultValue === 0 ||
      !!value ||
      value === 0 ||
      !!placeholder ||
      placeholder === 0
    ) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  }, [defaultValue, value, placeholder]);

  // Capture value changes so we can apply the has-value class to the container
  const fieldOnChange = (e) => {
    const eventValue = e?.target?.value;
    if (!!eventValue || eventValue === 0 || !!placeholder || placeholder === 0) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
    // adding this function resolves the error brought up in UIP-5116
    if (e.persist) {
      e.persist();
    }
    // Make sure to call the original onChange event
    return onChange(e);
  };

  const { labelProps: raLabelProps, fieldProps: raFieldProps } = useLabel({
    ...props,
    ...controlProps,
  });
  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames: wrapperClasses } = useStatusClasses(className, {
    'field-control__wrapper': true, // generates 'field-control__wrapper' class
    hasNoStatusIndicator,
    isFocused: isFocusVisible,
    isDisabled,
    isReadOnly,
    [`is-${status}`]: true, // Will generate 'is-default', 'is-error', etc.
    ...statusClasses,
    ...wrapperProps?.statusClasses,
  });

  const { classNames: inputClasses } = useStatusClasses(className, {
    'field-control__input': true, // generates 'field-control__input' class
    hasNoStatusIndicator,
    isFocused: isFocusVisible,
    isDisabled,
    isReadOnly,
    [`is-${status}`]: true, // Will generate 'is-default', 'is-error', etc.
    ...statusClasses,
    ...controlProps?.statusClasses,
  });

  const { classNames: labelClasses } = useStatusClasses(className, {
    'field-label': true,
    hasNoStatusIndicator,
    isFocused: isFocusVisible,
    isDisabled,
    isReadOnly,
    [`is-${status}`]: true, // Will generate 'is-default', 'is-error', etc.
    ...statusClasses,
    ...labelProps?.statusClasses,
  });


  const { ariaProps, nonAriaProps } = getAriaAttributeProps(others);

  // Handle focus within and value state for the container. These are needed for float labels.
  const { focusWithinProps } = useFocusWithin({ onFocusWithinChange: setFocusWithin });
  const isFloatLabel = labelMode === labelModes.FLOAT || labelProps?.labelMode === labelModes.FLOAT;
  const isLeftLabel = labelMode === labelModes.LEFT || labelProps?.labelMode === labelModes.LEFT;
  const isFloatLabelActive = isFloatLabel && (hasValue || containerProps?.isFloatLabelActive);
  const { classNames: containerClasses } = useStatusClasses(containerProps?.className, {
    'field-container': true, // generates 'field-container' class
    hasValue,
    hasFocusWithin,
    isLeftLabel,
    isFloatLabel,
    isFloatLabelActive,
    ...statusClasses,
    ...containerProps?.statusClasses,
  });

  const fieldContainerProps = {
    ...nonAriaProps,
    ...mergeProps(containerProps, focusWithinProps),
    className: containerClasses,
    sx: {
      position: 'relative',
      ...containerProps?.sx,
    },
  };

  const fieldControlInputProps = {
    autoComplete: autocomplete || autoComplete,
    autoCorrect,
    autoFocus: hasAutoFocus,
    className: inputClasses,
    defaultSelected: isDefaultSelected,
    defaultValue,
    disabled: isDisabled,
    id,
    isFocused: hasFocusWithin,
    maxLength,
    name,
    onChange: fieldOnChange,
    placeholder,
    readOnly: isReadOnly,
    required: isRequired,
    role,
    spellCheck,
    type,
    value,
    ...ariaProps,
    ...raFieldProps,
    ...mergeProps({ onBlur, onFocus }, omit(controlProps, 'data-testid'), focusProps),
  };

  const fieldLabelProps = {
    children: label,
    className: labelClasses,
    hintText,
    isRequired,
    mode: labelMode,
    ...raLabelProps,
    ...labelProps,
  };

  const fieldControlWrapperProps = {
    className: wrapperClasses,
    ...wrapperProps,
  };

  return {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  };
};


export default useField;
