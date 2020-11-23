import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { useToggleState } from '@react-stately/toggle';
import { useCheckbox } from '@react-aria/checkbox';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import Checkbox from '../Checkbox';
import Field from '../Field';

/**
 * Basic checkbox input wrapped in a label.
 * Built on top of the [Checkbox from Rebass Forms](https://rebassjs.org/forms/checkbox) and
 * uses the available [props from Rebass](https://rebassjs.org/props/).
 * Utilizes [React Aria](https://react-spectrum.adobe.com/react-aria/useCheckbox.html) and
 * [React Stately](https://react-spectrum.adobe.com/react-stately/useToggleState.html).
 */
const CheckboxField = forwardRef((props, ref) => {
  const {
    children,
    controlProps,
    isDisabled,
    labelProps,
    ...others
  } = props;
  const {
    isDefaultSelected,
    hasAutoFocus,
    sx, // eslint-disable-line
  } = controlProps;
  const checkboxProps = {
    children,
    isDisabled,
    defaultSelected: isDefaultSelected,
    autoFocus: hasAutoFocus,
    ...controlProps,
  };
  const state = useToggleState(checkboxProps);
  const checkboxRef = useRef(null);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => checkboxRef.current);
  const { inputProps: raInputProps } = useCheckbox({
    isDisabled,
    ...checkboxProps,
  }, state, checkboxRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  const dynamicStyles = {
    'input:focus ~ &': {
      bg: isFocusVisible ? 'highlight' : 'transparent',
    },
  };

  return (
    <Field
      ref={checkboxRef}
      hasWrappedLabel
      label={children}
      labelProps={{
        variant: 'checkboxLabel',
        ...labelProps,
      }}
      isDisabled={isDisabled}
      controlProps={controlProps}
      render={renderProps => (
        <Checkbox
          {...renderProps} // Don't put in mergeProps or else events from here will be chained
          {...mergeProps(focusProps, raInputProps)}
          sx={{
            ...dynamicStyles,
            ...sx,
          }}
        />
      )}
      {...others}
    />
  );
});

CheckboxField.propTypes = {
  /**
   * Props object passed directly to the checkbox control. See the [Checkbox](/?path=/docs/checkbox)
   * component for a complete list of available props.
  */
  controlProps: PropTypes.shape({
    /**
     * Indeterminism is presentational only. The indeterminate visual representation remains
     * regardless of user interaction.
    */
    isIndeterminate: PropTypes.bool,
    /** Whether the element should be selected (uncontrolled). */
    isDefaultSelected: PropTypes.bool,
    /** Whether the element should be selected (controlled). */
    isSelected: PropTypes.bool,
    /** Handler that is called when the element's selection state changes. */
    onChange: PropTypes.func,
    /** The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue). */
    value: PropTypes.string,
    /** The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
    name: PropTypes.string,
    /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
    id: PropTypes.string,
    /** Whether the input is disabled. */
    isDisabled: PropTypes.bool,
    /** Whether the input can be selected, but not changed by the user. */
    isReadOnly: PropTypes.bool,
    /** Whether user input is required on the input before form submission. */
    isRequired: PropTypes.bool,
    /** Whether the element should receive focus on render. */
    hasAutoFocus: PropTypes.bool,
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
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current
     * element.
    */
    'aria-controls': PropTypes.string,
    /** Defines a string value that labels the current element. */
    'aria-label': PropTypes.string,
    /** Identifies the element (or elements) that labels the current element. */
    'aria-labelledby': PropTypes.string,
    /** Identifies the element (or elements) that describes the object. */
    'aria-describedby': PropTypes.string,
    /**
     * Identifies the element (or elements) that provide a detailed, extended description for the
     * object.
    */
    'aria-details': PropTypes.string,
    /** Identifies the element that provides an error message for the object. */
    'aria-errormessage': PropTypes.string,
  }),
  /** Props object passed directly to the checkbox label. */
  labelProps: PropTypes.shape({
    variant: PropTypes.string,
  }),
  /** The label for the element. */
  children: PropTypes.node,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Whether the control and label are disabled. */
  isDisabled: PropTypes.bool,
};

CheckboxField.defaultProps = {
  controlProps: {},
  labelProps: {},
};

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;
