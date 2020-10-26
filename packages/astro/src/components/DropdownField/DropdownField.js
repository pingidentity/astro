import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Dropdown from '../Dropdown';
import Field from '../Field';


const DropdownField = forwardRef((props, ref) => {
  const { children, ...others } = props;
  return (
    <Field
      ref={ref}
      render={renderProps => (
        <Box variant="boxes.inputContainer">
          <Dropdown {...renderProps}>
            {children}
          </Dropdown>
        </Box>
      )}
      {...others}
    />
  );
});

DropdownField.propTypes = {
  controlProps: PropTypes.shape({
    /** The value of the select field, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select). */
    value: PropTypes.string,
    /** Whether the Dropdown is required. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required). */
    isRequired: PropTypes.bool,
    /** Whether the Dropdown can be interacted with but cannot have its selection state changed. */
    isReadOnly: PropTypes.bool,
    /** Whether the element should receive focus on render. */
    autoFocus: PropTypes.bool,
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
    /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
    id: PropTypes.string,
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
};
DropdownField.displayName = 'DropdownField';

export default DropdownField;
