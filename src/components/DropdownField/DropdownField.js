import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

// TODO: Deprecate this component in Astro-UI 1.0.0
import useDeprecationWarning from '../../hooks/useDeprecationWarning';
import useField from '../../hooks/useField';
import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import Dropdown from '../Dropdown';
import FieldHelperText from '../FieldHelperText';
import Label from '../Label';

/**
 * **WARNING: Will be deprecated in Astro 1.0.0, use `SelectField` instead.**
 *
 * Combines a dropdown, label, and helper text for a complete, form-ready solution.
 */
const DropdownField = forwardRef((props, ref) => {
  const { hasAutoFocus, children, helperText, status } = props;
  const {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  } = useField({
    autoFocus: hasAutoFocus,
    ...props,
  });
  const dropdownRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => dropdownRef.current);

  useDeprecationWarning('`DropdownField` will be deprecated in Astro-UI 1.0.0, use `SelectField` instead.');

  return (
    <Box {...fieldContainerProps}>
      <Label {...fieldLabelProps} />
      <Box variant="forms.input.container" className={fieldControlProps.className}>
        <Dropdown ref={dropdownRef} {...fieldControlProps}>
          {children}
        </Dropdown>
      </Box>
      {
        helperText &&
        <FieldHelperText status={status}>
          {helperText}
        </FieldHelperText>
      }
    </Box>
  );
});

DropdownField.propTypes = {
  /** The default value of the select field (uncontrolled). */
  defaultValue: PropTypes.string,
  /** The value of the select field (controlled). */
  value: PropTypes.string,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Whether the Dropdown is required. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required). */
  isRequired: PropTypes.bool,
  /** Whether the Dropdown can be interacted with but cannot have its selection state changed. */
  isReadOnly: PropTypes.bool,
  /** Whether the element should receive focus on render. */
  hasAutoFocus: PropTypes.bool,
  /** Text to display after the radio group label. Useful for errors or other info. */
  helperText: PropTypes.node,
  /** Determines the helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
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
};
DropdownField.displayName = 'DropdownField';

export default DropdownField;
