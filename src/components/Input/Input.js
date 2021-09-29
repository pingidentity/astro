import React, { forwardRef } from 'react';
import { Input as ThemeUIInput } from 'theme-ui';
import PropTypes from 'prop-types';
import { useAriaLabelWarning } from '../../hooks';

/**
 * Base input component.
 *
 * Accepts relevant styling props from [styled-system](https://styled-system.com/table).
 * Built on top of [Input from Theme-UI](https://theme-ui.com/components/input/).
 *
 * **Note**: It's recommended to use a more specific field component when possible.
 */

const Input = forwardRef((props, ref) => {
  const { name, placeholder } = props;

  let ariaLabel = props['aria-label'] || name;
  if (!ariaLabel && !placeholder) {
    useAriaLabelWarning('Input', ariaLabel);
    ariaLabel = 'Input';
  }

  return (
    <ThemeUIInput
      aria-label={ariaLabel}
      ref={ref}
      {...props}
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
  /** Type of input. Accepts most [HTML input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) */
  type: PropTypes.string,
  /** Placeholder for the input */
  placeholder: PropTypes.string,
};

export default Input;
