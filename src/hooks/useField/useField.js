import omit from 'lodash/omit';
import { useLabel } from '@react-aria/label';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import statuses from '../../utils/devUtils/constants/statuses';
import useStatusClasses from '../../hooks/useStatusClasses';

/**
 * Generates the necessary props to be used in field components.
 * @param {{}} props Props for the field
 * @returns {{}} Prop objects to be spread into field components.
 */
const useField = (props = {}) => {
  const {
    autocomplete,
    className,
    containerProps,
    controlProps,
    defaultValue,
    hasAutoFocus,
    id,
    isDefaultSelected,
    isDisabled,
    isReadOnly,
    isRequired,
    isSelected,
    label,
    labelProps,
    name,
    onBlur,
    onChange,
    onClear,
    onFocus,
    onFocusChange,
    placeholder,
    role,
    status = statuses.DEFAULT,
    statusClasses,
    type,
    value,
    ...others
  } = props;

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

  const fieldContainerProps = {
    ...omit(others, Object.keys(ariaProps)),
    ...containerProps,
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
    onChange,
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
    ...labelProps,
    ...raLabelProps,
  };

  return {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  };
};

export default useField;
