import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useToggleState } from '@react-stately/toggle';
import { useSwitch } from '@react-aria/switch';

import useStatusClasses from '../../hooks/useStatusClasses';
import Switch from '../Switch/Switch';
import Field from '../Field';

/**
 * Basic switch input wrapped in a label.
 * Built on top of the [Box from Rebass](https://rebassjs.org/box) and
 * uses the available [props from Rebass](https://rebassjs.org/props/).
 *
 * Utilizes [React Aria](https://react-spectrum.adobe.com/react-aria/useSwitch.html) and
 * [React Stately](https://react-spectrum.adobe.com/react-stately/useToggleState.html).
 *
 * **NOTE: Must provide a label via children or use `controlProps={{ 'aria-label': ... }}`**
 * **to pass accessibility checks.**
 */
const SwitchField = forwardRef((props, ref) => {
  const {
    className,
    children,
    controlProps,
    isDisabled,
    labelProps,
    ...others
  } = props;
  const {
    isDefaultSelected,
    hasAutoFocus,
  } = controlProps;
  const switchProps = {
    children,
    isDisabled,
    defaultSelected: isDefaultSelected,
    autoFocus: hasAutoFocus,
    ...controlProps,
  };
  const state = useToggleState(switchProps);
  const switchRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => switchRef.current);

  const { inputProps: raInputProps } = useSwitch({
    isDisabled,
    ...switchProps,
  }, state, switchRef);
  const { classNames } = useStatusClasses(className, {
    isSelected: raInputProps.checked,
  });

  return (
    <Field
      className={classNames}
      ref={switchRef}
      hasWrappedLabel
      label={children}
      labelProps={{
        variant: 'forms.switch.label',
        ...labelProps,
      }}
      controlProps={{
        ...controlProps,
        ...raInputProps,
      }}
      isDisabled={isDisabled}
      render={renderProps => <Switch inputProps={renderProps} />}
      {...others}
    />
  );
});

SwitchField.propTypes = {
  /**
   * Props object passed directly to the switch control. See the [Switch](/?path=/docs/switch)
   * component for a complete list of available props.
  */
  controlProps: PropTypes.shape({
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
  }),
  /** Props object passed directly to the switch label. */
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

SwitchField.defaultProps = {
  controlProps: {},
  labelProps: {},
};

SwitchField.displayName = 'SwitchField';

export default SwitchField;
