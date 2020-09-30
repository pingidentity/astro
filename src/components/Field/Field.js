import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useLabel } from '@react-aria/label';
import { mergeProps } from '@react-aria/utils';
import Box from '../Box';
import Label from '../Label';

/**
 * General wrapper for a label + control. A control is any form element that is supported by
 * a label. This may include an `input`, `select`, 'textarea', etc.
 */
const Field = forwardRef((props, ref) => {
  const {
    label,
    labelProps,
    controlProps,
    render,
    ...others
  } = props;
  const {
    labelProps: raLabelProps,
    fieldProps: raFieldProps,
  } = useLabel({ ...props, ...controlProps });

  return (
    <Box ref={ref} {...others}>
      <Label {...mergeProps(labelProps, raLabelProps)}>{label}</Label>
      {render(raFieldProps)}
    </Box>
  );
});

Field.propTypes = {
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** The content to display as the label */
  label: PropTypes.node.isRequired,
  /** The props passed along to the label */
  labelProps: PropTypes.shape({}),
  /** The props passed along to the control */
  controlProps: PropTypes.shape({
    id: PropTypes.string,
  }),
  /** Render prop function to handle displaying the associated control for the label */
  render: PropTypes.func.isRequired,
};

Field.defaultProps = {
  controlProps: {
    id: null, // Set to override the top-level `id` prop when passed to `useLabel`
  },
};

export default Field;
