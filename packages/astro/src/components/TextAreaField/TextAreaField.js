import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import useField from '../../hooks/useField';
import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import FieldHelperText from '../FieldHelperText';
import Label from '../Label';
import TextArea from '../TextArea';

/**
 * Combines a textarea, label, and helper text for a complete, form-ready solution.
 */
const TextAreaField = forwardRef((props, ref) => {
  const { helperText, isUnresizable, rows, status } = props;
  const statusClasses = { isUnresizable };
  const {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  } = useField({ statusClasses, ...props });
  const textAreaRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => textAreaRef.current);

  return (
    <Box {...fieldContainerProps} variant="forms.input.wrapper">
      <Label {...fieldLabelProps} />
      <Box variant="forms.input.container" className={fieldControlProps.className}>
        <TextArea ref={textAreaRef} rows={rows} {...fieldControlProps} />
      </Box>
      {
        helperText &&
        <FieldHelperText status={status}>
          {helperText}
        </FieldHelperText>
      }
    </Box>
  );
});

TextAreaField.propTypes = {
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** Text rendered below the textarea. */
  helperText: PropTypes.node,
  /** The unique identifier for the textarea element. */
  id: PropTypes.string,
  /** Whether the textarea is unable to be resized. */
  isUnresizable: PropTypes.bool,
  /** The name for the textarea element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-name). */
  name: PropTypes.string,
  /**
   * Callback fired when the value is changed on the textarea element.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /** The value for the textarea element (controlled). */
  value: PropTypes.string,
  /** How the textarea element should handle autocompletion according to the browser. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-autocomplete). */
  autocomplete: PropTypes.string,
  /** A list of class names to apply to the textarea element. */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /** The default value for the textarea element. */
  defaultValue: PropTypes.string,
  /** Whether the textarea element is automatically focused when loaded onto the page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-autofocus). */
  hasAutoFocus: PropTypes.bool,
  /** Whether the field is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether the field is required. */
  isRequired: PropTypes.bool,
  /**
   * Callback fired when focus is lost on the textarea element.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when focus is lost on the textarea element.
   */
  onFocus: PropTypes.func,
  /** The placeholder text to display in the textarea element. */
  placeholder: PropTypes.string,
  /** The number of rows to display for the textarea. Controls the default height. */
  rows: PropTypes.number,
  /** Determines the textarea status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /** Props object that is spread directly into the root (top-level) element. */
  containerProps: PropTypes.shape({}),
  /** Props object that is spread directly into the input element. */
  controlProps: PropTypes.shape({}),
  /** Props object that is spread directly into the label element. */
  labelProps: PropTypes.shape({}),
};

TextAreaField.defaultProps = {
  hasAutoFocus: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  isUnresizable: false,
  rows: 2,
  status: statuses.DEFAULT,
};

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
