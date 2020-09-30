import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { mergeProps } from '@react-aria/utils';
import Input from '../Input';
import Field from '../Field';

/**
 * General wrapper for a label + text input. Alternative interface for `Field` with an `Input`.
 */
const TextField = forwardRef((props, ref) => {
  const {
    controlProps,
    ...others
  } = props;

  return (
    <Field
      ref={ref}
      render={renderProps => (
        <Input
          {...mergeProps(controlProps, renderProps)}
        />
      )}
      {...others}
    />
  );
});

TextField.propTypes = {
  /** The content to display as the label */
  label: PropTypes.node.isRequired,
  /** The props passed along to the label */
  labelProps: PropTypes.shape({}),
  /** The props passed along to the control */
  controlProps: PropTypes.shape({}),
};

export default TextField;
