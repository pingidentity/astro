import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import { Box, FieldHelperText, Input, Label } from '../..';
import { useField, useLabelHeight, usePropWarning } from '../../hooks';
import useColumnStyles from '../../hooks/useColumnStyles';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusDefaultProp, statusPropTypes } from '../../utils/docUtils/statusProp';

/**
 * Combines a text input, label, and helper text for a complete, form-ready solution.
 */
const TextField = forwardRef((props, ref) => {
  const { helperText, helpHintProps, slots, status } = props;
  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField(props);
  const inputRef = useRef();
  const labelRef = useRef();

  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const { isLabelHigher } = useLabelHeight({ labelRef, inputRef });
  const columnStyleProps = useColumnStyles({ labelMode: props.labelMode });

  const helperTextId = uuid();

  return (
    <Box variant="forms.input.fieldContainer" {...fieldContainerProps} sx={{ ...columnStyleProps?.sx, ...fieldContainerProps?.sx }}>
      <Label
        {...fieldLabelProps}
        ref={labelRef}
        sx={isLabelHigher && { gridRow: '1/5' }}
        helpHintProps={helpHintProps}
      />
      <Box variant="forms.input.fieldControlWrapper" {...fieldControlWrapperProps}>
        {slots?.beforeInput}
        <Input
          ref={inputRef}
          {...fieldControlInputProps}
          aria-invalid={status === 'error' && true}
          aria-describedby={helperText && helperTextId}
        />
        {slots?.inContainer}
      </Box>
      {
        helperText
        && (
        <FieldHelperText status={status} id={helperTextId}>
          {helperText}
        </FieldHelperText>
        )

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
  /** How the input should handle autocompletion according to the browser. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete). The `autocomplete` prop is an alias for this. */
  autoComplete: PropTypes.string,
  /** @ignore Alias for `autoComplete` prop. Exists for backwards-compatibility. */
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
  /** Props object that is spread directly into the helphint element. */
  helpHintProps: PropTypes.shape({}),
  /** Whether the field is disabled. */
  isDisabled: PropTypes.bool,
  /** Whether the input can be selected, but not changed by the user. */
  isReadOnly: PropTypes.bool,
  /** Whether the field is required. */
  isRequired: PropTypes.bool,
  /** Add max Length to input value */
  maxLength: PropTypes.number,
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
    /** The given node will be inserted before the input. */
    beforeInput: PropTypes.node,
    /** The given node will be inserted into the field container. */
    inContainer: PropTypes.node,
  }),
  /** Determines the type of input to use. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). */
  type: PropTypes.string,
  /** Props object that is spread directly into the input wrapper element. */
  wrapperProps: PropTypes.shape({}),
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
  ...inputFieldAttributesBasePropTypes,
};

TextField.defaultProps = {
  hasAutoFocus: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  ...statusDefaultProp,
};

TextField.displayName = 'TextField';

export default TextField;
