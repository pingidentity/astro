import React, { forwardRef } from 'react';
import { Input as ThemeUIInput } from 'theme-ui';
import PropTypes from 'prop-types';

/**
 * Base input component.
 *
 * Accepts relevant styling props from [styled-system](https://styled-system.com/table).
 * Built on top of [Input from Theme-UI](https://theme-ui.com/components/input/).
 *
 * **Note**: It's recommended to use a more specific field component when possible.
 */

const Input = forwardRef((props, ref) => (
  <ThemeUIInput
    ref={ref}
    {...props}
  />
));

Input.displayName = 'Input';

Input.propTypes = {
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
