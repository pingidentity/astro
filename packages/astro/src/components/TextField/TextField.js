import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';
import Field from '../Field';
import Input from '../Input';

/**
 * General wrapper for a label + text input. Alternative interface for `Field` with an `Input`.
 *
 * **See `Field` for a complete list of props.**
 */
const TextField = forwardRef((props, ref) => (
  <Field
    ref={ref}
    render={renderProps => (
      <Box variant="forms.input.container" className={renderProps.className}>
        <Input {...renderProps} />
      </Box>
    )}
    {...props}
  />
));

TextField.propTypes = {
  /** The props passed along to the control */
  controlProps: PropTypes.shape({}),
  /** The content to display as the label */
  label: PropTypes.node.isRequired,
  /** The props passed along to the label */
  labelProps: PropTypes.shape({}),
};

TextField.displayName = 'TextField';

export * from '../Field';
export default TextField;
