import React, { forwardRef } from 'react';
import { Input as ThemeUIInput } from 'theme-ui';
import PropTypes from 'prop-types';
import { useAriaLabelWarning } from '../../hooks';
import isValidPositiveInt from '../../utils/devUtils/props/isValidPositiveInt';
/**
 * Base input component.
 *
 * Accepts relevant styling props from [styled-system](https://styled-system.com/table).
 * Built on top of [Input from Theme-UI](https://theme-ui.com/components/input/).
 *
 * **Note**: It's recommended to use a more specific field component when possible.
 */

const Input = forwardRef((props, ref) => {
  const { name, placeholder, maxLength, ...others } = props;

  let ariaLabel = props['aria-label'] || name;
  useAriaLabelWarning('Input', ariaLabel || placeholder);
  if (!ariaLabel && !placeholder) {
    ariaLabel = 'Input';
  }

  return (
    <ThemeUIInput
      aria-label={ariaLabel}
      ref={ref}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength === 0 ? 'null' : maxLength}
      {...others}
    />
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /** Id of input. */
  id: PropTypes.string,
  /** Name of input. */
  name: PropTypes.string,
  /** Max length of input value */
  maxLength: isValidPositiveInt,
  /** Type of input. Accepts most [HTML input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) */
  type: PropTypes.string,
  /** Placeholder for the input */
  placeholder: PropTypes.string,
};

export default Input;
