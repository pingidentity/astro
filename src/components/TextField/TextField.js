import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { useField, useLabelHeight } from '../../hooks';
import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import FieldHelperText from '../FieldHelperText';
import Input from '../Input';
import Label from '../Label';
import useColumnStyles from '../../hooks/useColumnStyles';

/**
 * Combines a text input, label, and helper text for a complete, form-ready solution.
 */
const TextField = forwardRef((props, ref) => {
  const { helperText, slots, status } = props;
  const {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  } = useField(props);
  const inputRef = useRef();
  const labelRef = useRef();

  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const { isLabelHigher } = useLabelHeight({ labelRef, inputRef });
  const columnStyleProps = useColumnStyles({ labelMode: props.labelMode });

  return (
    <Box variant="forms.input.wrapper" {...fieldContainerProps} sx={{ ...columnStyleProps?.sx, ...fieldContainerProps?.sx }}>
      <Label {...fieldLabelProps} ref={labelRef} sx={isLabelHigher && { gridRow: '1/5' }} />
      <Box variant="forms.input.container" className={fieldControlProps.className}>
        <Input ref={inputRef} {...fieldControlProps} />
        {slots?.inContainer}
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

TextField.propTypes = {
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** A string designating whether or not the label is a float label. */
  labelMode: PropTypes.string,
  /** Text rendered below the input. */
  helperText: PropTypes.node,
  /** The unique identifier for the input element. */
  id: PropTypes.string,
  /** The name for the input element. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname). */
  name: PropTypes.string,
  /**
   * Callback fired when the value is changed on the input element.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /** The value for the input element (controlled). */
  value: PropTypes.string,
  /** How the input element should handle autocompletion according to the browser. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). */
  autocomplete: PropTypes.string,
  /** A list of class names to apply to the input element. */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /** The default value for the input element. */
  defaultValue: PropTypes.string,
  /** Whether the input element is automatically focused when loaded onto the page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus). */
  hasAutoFocus: PropTypes.bool,
  /** If present this prop will cause a help hint to render in the label of the field. */
  hintText: PropTypes.string,
  /** Whether the field has a status indicator. */
  hasNoStatusIndicator: PropTypes.bool,
  /** Whether the field is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether the field is required. */
  isRequired: PropTypes.bool,
  /**
   * Callback fired when focus is lost on the input element.
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when focus is lost on the input element.
   */
  onFocus: PropTypes.func,
  /** The placeholder text to display in the input element. */
  placeholder: PropTypes.string,
  /** Provides a way to insert markup in specified places. */
  slots: PropTypes.shape({
    /** The given node will be inserted into the field container. */
    inContainer: PropTypes.node,
  }),
  /** Determines the input status indicator and helper text styling. */
  status: PropTypes.oneOf(Object.values(statuses)),
  /** Determines the type of input to use. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). */
  type: PropTypes.string,
  /** Props object that is spread directly into the root (top-level) element. */
  containerProps: PropTypes.shape({}),
  /** Props object that is spread directly into the input element. */
  controlProps: PropTypes.shape({}),
  /** Props object that is spread directly into the label element. */
  labelProps: PropTypes.shape({}),
};

TextField.defaultProps = {
  hasAutoFocus: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  status: statuses.DEFAULT,
};

TextField.displayName = 'TextField';

export default TextField;
