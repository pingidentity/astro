import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import EyeIcon from 'mdi-react/EyeOutlineIcon';
import EyeOffIcon from 'mdi-react/EyeOffOutlineIcon';

import useField from '../../hooks/useField';
import useProgressiveState from '../../hooks/useProgressiveState';
import statuses from '../../utils/devUtils/constants/statuses';
import Box from '../Box';
import Input from '../Input';
import Label from '../Label';
import Icon from '../Icon';
import IconButton from '../IconButton';

/**
  * Combines a text input, label, IconButton and helper text for a complete, form-ready solution.
 */
const PasswordField = forwardRef((props, ref) => {
  const {
    slots,
    isVisible: isVisibleProp,
    onVisibleChange: onVisibleChangeProp,
    viewHiddenIconTestId,
    viewIconTestId,
    ...others
  } = props;
  const {
    fieldContainerProps,
    fieldControlProps,
    fieldLabelProps,
  } = useField(others);

  const inputRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const [isVisible, setIsShown] = useProgressiveState(
    isVisibleProp,
    onVisibleChangeProp);
  const onVisibleChange = (...args) => {
    setIsShown(!isVisible);
    if (onVisibleChangeProp) {
      onVisibleChangeProp(!isVisible, ...args);
    }
  };

  return (
    <Box variant="forms.input.wrapper" {...fieldContainerProps}>
      <Label {...fieldLabelProps} />
      <Box variant="forms.input.container" isRow className={fieldControlProps.className}>
        <Input ref={inputRef} {...fieldControlProps} type={isVisible ? 'text' : 'password'} sx={{ pr: '43px' }} />
        <Box variant="forms.input.containedIcon">
          <IconButton isDisabled={fieldControlProps.disabled} size={28} onPress={onVisibleChange} >
            <Icon
              data-testid={isVisible ? viewIconTestId : viewHiddenIconTestId}
              icon={isVisible ? EyeIcon : EyeOffIcon}
            />
          </IconButton>
        </Box>
        {slots?.inContainer}
      </Box>
    </Box>
  );
});

PasswordField.propTypes = {
  /** The rendered label for the field. */
  label: PropTypes.node,
  /** Whether or not the password is visible. */
  isVisible: PropTypes.bool,
  /** Function that is passed into the IconButton within this component. */
  onVisibleChange: PropTypes.func,
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
  /** Prop that allows testing of the icon button. */
  viewHiddenIconTestId: PropTypes.string,
  /** Prop that allows testing of the icon button. */
  viewIconTestId: PropTypes.string,
};

PasswordField.defaultProps = {
  hasAutoFocus: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  type: 'password',
  status: statuses.DEFAULT,
};

PasswordField.displayName = 'PasswordField';

export default PasswordField;
