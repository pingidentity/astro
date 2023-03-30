import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Input as ThemeUIInput } from 'theme-ui';

import isValidPositiveInt from '../../utils/devUtils/props/isValidPositiveInt';
/**
 * Base input component.
 *
 * Accepts relevant styling props from [styled-system](https://styled-system.com/table).
 * Built on top of [Input from Theme-UI](https://theme-ui.com/components/input/).
 *
 * **Note**: This component does not supply all of the accessibility assistance on its own.
 * We instead encourage developers to utilize our Field components wherever possible.
 * If this component is used, accessibility is left to the developer.
 */

const Input = forwardRef((props, ref) => {
  const { name, placeholder, maxLength, ...others } = props;

  return (
    <ThemeUIInput
      ref={ref}
      name={name}
      placeholder={placeholder}
      maxLength={(Number.isInteger(maxLength) && maxLength > 0) ? maxLength : undefined}
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
