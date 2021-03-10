import { useState } from 'react';
import omit from 'lodash/omit';
import noop from 'lodash/noop';
import { useLabel } from '@react-aria/label';
import { useFocusWithin } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import statuses from '../../utils/devUtils/constants/statuses';
import useStatusClasses from '../../hooks/useStatusClasses';
import { modes as labelModes } from '../../components/Label/constants';

/**
 * Generates the necessary props to be used in field components.
 * @param {{}} props Props for the field
 * @returns {{}} Prop objects to be spread into field components.
 */
const useField = (props = {}) => {
  const {
    autocomplete,
    children,
    className,
    containerProps,
    controlProps,
    defaultText,
    defaultValue,
    disabledKeys,
    hasAutoFocus,
    helperText,
    id,
    isDefaultSelected,
    isDisabled,
    isReadOnly,
    isRequired,
    isSelected,
    label,
    labelMode,
    labelProps,
    name,
    onBlur,
    onChange = noop,
    onClear,
    onFocus,
    onFocusChange,
    onOpenChange,
    onSelectionChange,
    placeholder,
    role,
    selectedKey,
    status = statuses.DEFAULT,
    statusClasses,
    type,
    value,
    ...others
  } = props;

  const [, setControlValue] = useState(value);
  // 0 could be a valid input for fields, but null, undefined, and '' are not
  const [hasValue, setHasValue] = useState(!!value || value === 0);
  const [hasFocusWithin, setFocusWithin] = useState(false);

  // Capture value changes so we can apply the has-value class to the container
  const fieldOnChange = (e) => {
    const eventValue = e?.target?.value;
    setControlValue(eventValue);
    if (!!eventValue || eventValue === 0) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }

    // Make sure to call the original onChange event
    return onChange(e);
  };

  const {
    labelProps: raLabelProps,
    fieldProps: raFieldProps,
  } = useLabel({ ...props, ...controlProps });
  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
    isDisabled,
    [`is-${status}`]: true, // Will generate 'is-default', 'is-error', etc.
    ...statusClasses,
  });
  const ariaProps = Object.entries(others).reduce((acc, [key, val]) => {
    if (key.match(/^aria-.*/)) return { ...acc, [key]: val };
    return { ...acc };
  }, {});

  // Handle focus within and value state for the container. These are needed for float labels.
  const { focusWithinProps } = useFocusWithin({ onFocusWithinChange: setFocusWithin });
  const isFloatLabel = labelMode === labelModes.FLOAT;
  const isFloatLabelActive = isFloatLabel && (
    hasValue || hasFocusWithin || containerProps?.isFloatLabelActive
  );
  const { classNames: containerClasses } = useStatusClasses(containerProps?.className, {
    'field-container': true, // generates 'field-container' class
    hasValue,
    hasFocusWithin,
    isFloatLabel,
    isFloatLabelActive,
  });
  const nonAriaOthers = { ...omit(others, Object.keys(ariaProps)) };
  const fieldContainerProps = {
    ...nonAriaOthers,
    ...mergeProps(containerProps, focusWithinProps),
    className: containerClasses,
    sx: {
      position: 'relative',
      ...containerProps?.sx,
    },
  };

  const fieldControlProps = {
    autocomplete,
    autoFocus: hasAutoFocus,
    className: classNames,
    defaultSelected: isDefaultSelected,
    defaultValue,
    disabled: isDisabled,
    id,
    name,
    onChange: fieldOnChange,
    placeholder,
    readOnly: isReadOnly,
    required: isRequired,
    role,
    type,
    value,
    ...ariaProps,
    ...controlProps,
    ...raFieldProps,
    ...mergeProps({ onBlur, onFocus }, focusProps),
  };

  const fieldLabelProps = {
    children: label,
    className: classNames,
    isRequired,
    mode: labelMode,
    ...raLabelProps,
    ...labelProps,
  };

  return {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  };
};

export default useField;
