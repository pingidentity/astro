import { useEffect, useState } from 'react';
import { mergeProps, useFocusRing, useLabel } from 'react-aria';
import { useFocusWithin } from '@react-aria/interactions';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import { LabelProps as ThemeUILabelProps } from 'theme-ui';

import { modes as labelModes } from '../../components/Label/constants';
import { BoxProps } from '../../types';
import statuses from '../../utils/devUtils/constants/statuses';
import { getAriaAttributeProps } from '../../utils/docUtils/ariaAttributes';
import { useStatusClasses } from '..';

/**
 * Generates the necessary props to be used in field components.
 * @param {{}} props Props for the field
 * @returns {{}} Prop objects to be spread into field components.
 */

interface WrapperProps extends BoxProps {
  id?: string;
  statusClasses?: { [className: string]: boolean };
}

interface ContainerProps extends WrapperProps {
  isFloatLabelActive?: boolean;
}

// TODO: replace with LabelProps instead of ThemeUILabelProps
// once Label component is rewritten to ts
interface LabelProps extends ThemeUILabelProps {
  labelMode?: 'default' | 'float' | 'left';
  statusClasses?: { [className: string]: boolean };
}

interface ControlProps<T> extends React.HTMLAttributes<T> {
  statusClasses?: { [className: string]: boolean };
}

export interface UseFieldProps<T> {
  autocomplete?: string;
  autoComplete?: string;
  autoCorrect?: string;
  children?: React.ReactNode;
  className?: string;
  containerProps?: ContainerProps;
  controlProps?: ControlProps<T>;
  defaultText?: string;
  defaultValue?: string | number;
  direction?: string;
  disabledKeys?: string[];
  hasAutoFocus?: boolean;
  hasNoStatusIndicator?: boolean;
  helperText?: string;
  hintText?: string;
  id?: string;
  isDefaultSelected?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isRestrictiveMultivalues?: boolean;
  isSelected?: boolean;
  label?: string;
  labelMode?: string;
  labelProps?: LabelProps;
  maxLength?: number;
  name?: string;
  onBlur?: (e: React.FocusEvent) => void;
  onChange?: (e: React.ChangeEvent) => void;
  onClear?: () => void;
  onFocus?: (e: React.FocusEvent) => void;
  onFocusChange?: (isFocused: boolean) => void;
  onLoadMore?: () => void;
  onOpenChange?: () => void;
  onSelectionChange?: (key: string) => void;
  placeholder?: string | number;
  role?: string;
  selectedKey?: string;
  spellCheck?: string;
  status?: string;
  statusClasses?: { [className: string]: boolean };
  type?: string;
  value?: string | number;
  wrapperProps?: WrapperProps;
}

type CustomChangeEventType = {
  target?: {
    value: string | number | undefined
  },
  persist?(): void;
}

const useField = <T>(props: UseFieldProps<T>) => {
  const {
    autocomplete,
    autoComplete,
    autoCorrect,
    className,
    containerProps = {},
    controlProps = {},
    defaultValue,
    hasAutoFocus,
    hasNoStatusIndicator,
    hintText,
    id,
    isDefaultSelected,
    isDisabled,
    isIndeterminate,
    isReadOnly,
    isRequired,
    isRestrictiveMultivalues,
    label,
    labelMode,
    labelProps = {},
    maxLength,
    name,
    onBlur,
    onChange = noop,
    onFocus,
    placeholder,
    role,
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
      !!defaultValue
      || defaultValue === 0
      || !!value
      || value === 0
      || !!placeholder
      || placeholder === 0
    ) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  }, [defaultValue, value, placeholder]);

  // Capture value changes so we can apply the has-value class to the container
  const fieldOnChange = (e: CustomChangeEventType) => {
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

  const { ariaProps, nonAriaProps } = getAriaAttributeProps(
    omit(others, [
      'children',
      'defaultText',
      'direction',
      'disabledKeys',
      'helperText',
      'isSelected',
      'onClear',
      'onFocusChange',
      'onLoadMore',
      'onOpenChange',
      'onRemove',
      'onSelectionChange',
      'selectedKey',
    ]),
  );

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
    isIndeterminate,
    maxLength,
    name,
    onChange: fieldOnChange,
    placeholder,
    readOnly: isRestrictiveMultivalues ? true : isReadOnly,
    required: isRequired,
    role,
    spellCheck,
    type,
    value,
    ...ariaProps,
    ...raFieldProps,
    ...mergeProps({ onBlur, onFocus }, omit(controlProps, 'data-testid'), focusProps) as object,
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
