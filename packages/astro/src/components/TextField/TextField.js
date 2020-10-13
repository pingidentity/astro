import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import Field from '../Field';
import Input from '../Input';

/**
 * General wrapper for a label + text input. Alternative interface for `Field` with an `Input`.
 */
const TextField = forwardRef((props, ref) => (
  <Field
    ref={ref}
    render={renderProps => (
      <Box variant="boxes.inputContainer">
        <Input {...renderProps} />
      </Box>
    )}
    {...props}
  />
));

TextField.propTypes = {
  /** The content to display as the label */
  label: PropTypes.node.isRequired,
  /** The props passed along to the label */
  labelProps: PropTypes.shape({}),
  /** The props passed along to the control */
  controlProps: PropTypes.shape({}),
};

export default TextField;
