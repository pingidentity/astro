import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import TextArea from '../TextArea';
import Field from '../Field';
import Box from '../Box/Box';

/**
 * Basic TextArea input wrapped in a label.
 * Built on top of the [Textarea from Rebass Forms](https://rebassjs.org/forms/Textarea) and
 * uses the available [props from Rebass](https://rebassjs.org/props/).
 */
const TextAreaField = forwardRef((props, ref) => {
  const textAreaRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => textAreaRef.current);

  return (
    <Field
      ref={textAreaRef}
      render={renderProps => (
        <Box variant="boxes.inputContainer">
          <TextArea {...renderProps} />
        </Box>
      )}
      {...props}
    />
  );
});

TextAreaField.propTypes = {
  /** The content to display as the label */
  label: PropTypes.node,
  /** The props passed along to the label */
  labelProps: PropTypes.shape({
    variant: PropTypes.string,
  }),
  /** The props passed along to the control */
  controlProps: PropTypes.shape({}),
  /** ID associated with TextArea */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Disables input field  */
  isDisabled: PropTypes.bool,
  /** Handler that is called when the input changes. */
  onChange: PropTypes.func,
  /** Placeholder text for within the TextArea field */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Value of the option input */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Number of rows of text the component should initally display. */
  rows: PropTypes.number,
};

TextAreaField.defaultProps = {
  label: '',
  controlProps: {},
};

TextAreaField.displayName = 'TextAreaField';
export default TextAreaField;
