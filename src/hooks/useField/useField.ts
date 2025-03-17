import React, { ChangeEvent, Key, useEffect, useState } from 'react';
import { mergeProps, useFocusRing, useLabel } from 'react-aria';
import { useFocusWithin } from '@react-aria/interactions';
import type { AriaLabelingProps, CollectionChildren, DOMProps } from '@react-types/shared';
import noop from 'lodash/noop';
import omit from 'lodash/omit';
import { ThemeUICSSObject } from 'theme-ui';

import { AriaRole, BoxProps, LabelModeProps, LabelProps, Status, ValidPositiveInteger } from '../../types';
import { modes as labelModes } from '../../utils/devUtils/constants/labelModes';
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

export interface ContainerProps extends WrapperProps {
  isFloatLabelActive?: boolean;
  'data-testid'?: string;
}

export interface FieldControlInputProps extends AriaLabelingProps, DOMProps {
  autoComplete?: string;
  autoCorrect?: string;
  autoFocus?: boolean;
  className?: string;
  defaultSelected?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  id?: string;
  isFocused?: boolean;
  isIndeterminate?: boolean;
  maxLength?: ValidPositiveInteger;
  name?: string;
  onChange: (event: CustomChangeEventType | React.FormEvent<Element>) => void | undefined;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  role?: AriaRole;
  spellCheck?: boolean;
  type?: string;
  value?: string | number;
}

export interface ControlProps extends React.HTMLAttributes<Element> {
  statusClasses?: { [className: string]: boolean };
  hasAutoFocus?: boolean;
  isDefaultSelected?: boolean;
  variant?: string;
  sx?: ThemeUICSSObject;
}

export interface UseFieldProps<T> {
  autocomplete?: string;
  autoComplete?: string;
  autoCorrect?: string;
  children?: React.ReactNode | CollectionChildren<T>;
  className?: string;
  containerProps?: ContainerProps;
  controlProps?: ControlProps;
  defaultText?: string;
  defaultValue?: string | number;
  direction?: string;
  disabledKeys?: string[] | Iterable<Key>;
  /** Whether the element should receive focus on render. */
  hasAutoFocus?: boolean;
  hasNoStatusIndicator?: boolean;
  /** Text rendered below the input. */
  helperText?: string;
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText?: string;
  /** The element's unique identifier.
   * See [MDN](https?://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id?: string;
  /** Whether the element should be selected (uncontrolled). */
  isDefaultSelected?: boolean;
  /** Whether the input is disabled. */
  isDisabled?: boolean;
  /**
   * Indeterminism is presentational only. The indeterminate visual representation remains until
   * this prop is set to false regardless of user interaction.
  */
  isIndeterminate?: boolean;
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly?: boolean;
  /** Whether user input is required on the input before form submission. */
  isRequired?: boolean;
  isRestrictiveMultivalues?: boolean;
  /** Whether the element should be selected (controlled). */
  isSelected?: boolean;
  /** The rendered label for the field. */
  label?: string | React.ReactNode;
  labelMode?: LabelModeProps;
  labelProps?: LabelProps;
  maxLength?: ValidPositiveInteger;
  /** The name of the input element, used when submitting an HTML form.
   * See [MDN](https?://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name?: string;
  /** Handler that is called when the element loses focus. */
  onBlur?: (e: React.FocusEvent) => void;
  /** Handler that is called when the element's selection state changes. */
  onChange?: (e: React.ChangeEvent) => void;
  onClear?: () => void;
  /** Handler that is called when a file is added or removed. */
  onFileChange?: (files: File[]) => void;
  /** Handler that is called when the element receives focus. */
  onFocus?: (e: React.FocusEvent) => void;
  /** Handler that is called when the element's focus status changes. */
  onFocusChange?: (isFocused: boolean) => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  onLoadMore?: () => void;
  onOpenChange?: (isOpen: boolean) => unknown;
  onSelectionChange?: (key: string) => void;
  /** Handler that is called when the element's toggle state changes. */
  onToggle?: () => void;
  placeholder?: string | number;
  role?: AriaRole;
  selectedKey?: string;
  spellCheck?: string;
  status?: Status;
  statusClasses?: { [className: string]: boolean };
  type?: string;
  /** The value of the input element, used when submitting an HTML form.
   * See [MDN](https?://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue).
   * */
  value?: string | number;
  wrapperProps?: WrapperProps;
}

export type CustomChangeEventType = {
  currentTarget?: {
    value?: string | number
  },
  target?: {
    value?: string | number
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
  const fieldOnChange = (e: (CustomChangeEventType | React.ChangeEvent<Element>)) => {
    const eventValue = (e.currentTarget as HTMLInputElement).value;
    const isZero = !Number.isNaN(Number(eventValue)) && Number(eventValue) === 0;
    if (!!eventValue || !!placeholder || isZero || !!placeholder || placeholder === 0) {
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
  } as FieldControlInputProps;

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
