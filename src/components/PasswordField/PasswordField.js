import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useOverlayPosition } from 'react-aria';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import EyeOffIcon from 'mdi-react/EyeOffOutlineIcon';
import EyeIcon from 'mdi-react/EyeOutlineIcon';
import PropTypes from 'prop-types';

import {
  Box,
  FieldHelperText,
  Icon,
  IconButton,
  Input,
  Label,
  PopoverContainer,
  RequirementsList,
} from '../..';
import * as hooks from '../../hooks';
import statuses from '../../utils/devUtils/constants/statuses';
import { ariaAttributesBasePropTypes } from '../../utils/docUtils/ariaAttributes';
import { inputFieldAttributesBasePropTypes } from '../../utils/docUtils/fieldAttributes';
import { statusDefaultProp, statusPropTypes } from '../../utils/docUtils/statusProp';

const ARIA_LABELS_FOR_SHOW_PASSWORD_TOGGLE = {
  HIDE: 'hide password',
  SHOW: 'show password',
};

/**
  * Combines a text input, label, IconButton and helper text for a complete, form-ready solution.
 */
const PasswordField = forwardRef((props, ref) => {
  const {
    helperText,
    isVisible: isVisibleProp,
    onVisibleChange: onVisibleChangeProp,
    requirements,
    requirementsListProps,
    slots,
    status,
    viewHiddenIconTestId,
    viewIconTestId,
    ...others
  } = props;

  const checkRequirements = () => !requirements.filter(req => req.status === 'default').length > 0;

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = hooks.useField({ status, ...others });

  const { isFocused } = fieldControlInputProps;

  const inputRef = useRef();
  const popoverRef = useRef();

  hooks.usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => inputRef.current);

  const [isVisible, setIsShown] = hooks.useProgressiveState(
    isVisibleProp,
    isVisibleProp);

  // Measure the width of the input to inform the width of the menu (below).
  const [menuWidth, setMenuWidth] = useState(null);

  const onResize = useCallback(() => {
    /* istanbul ignore next */
    if (inputRef.current) {
      setMenuWidth(inputRef.current.offsetWidth);
    }
  }, [inputRef, setMenuWidth]);

  useResizeObserver({
    ref: inputRef,
    onResize,
  });

  useLayoutEffect(onResize, [onResize]);

  const { overlayProps, placement, updatePosition } = useOverlayPosition({
    isOpen: true,
    offset: 1,
    overlayRef: popoverRef,
    placement: 'bottom end',
    targetRef: inputRef,
  });

  useLayoutEffect(() => {
    if (isFocused) {
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [isFocused, updatePosition]);

  const style = {
    minWidth: menuWidth,
    width: menuWidth,
    ...overlayProps.style,
  };

  const { classNames } = hooks.useStatusClasses(fieldControlWrapperProps.className, {
    'is-success': (status === statuses.SUCCESS) || (checkRequirements() && requirements.length > 0),
  });

  const toggleShowPasswordAriaLabel = isVisible
    ? ARIA_LABELS_FOR_SHOW_PASSWORD_TOGGLE.HIDE
    : ARIA_LABELS_FOR_SHOW_PASSWORD_TOGGLE.SHOW;

  const handleToggleShowPassword = (...args) => {
    setIsShown(!isVisible);

    if (onVisibleChangeProp) {
      onVisibleChangeProp(!isVisible, ...args);
    }
  };

  return (
    <>
      <Box variant="forms.input.fieldContainer" {...fieldContainerProps}>
        <Label {...fieldLabelProps} />
        <Box variant="forms.input.fieldControlWrapper" isRow {...fieldControlWrapperProps} className={classNames}>
          <Input ref={inputRef} {...fieldControlInputProps} type={isVisible ? 'text' : 'password'} sx={{ pr: '43px' }} role="textbox" />
          <Box variant="forms.input.containedIcon">
            <IconButton
              aria-label={toggleShowPasswordAriaLabel}
              isDisabled={fieldControlInputProps.disabled}
              onPress={handleToggleShowPassword}
              size={28}
            >
              <Icon
                data-testid={isVisible ? viewIconTestId : viewHiddenIconTestId}
                icon={isVisible ? EyeIcon : EyeOffIcon}
              />
            </IconButton>
          </Box>
          {slots?.inContainer}
        </Box>
        {
          helperText
          && (
          <FieldHelperText status={status}>
            {helperText}
          </FieldHelperText>
          )
        }
      </Box>
      <PopoverContainer
        hasNoArrow
        isDismissable={false}
        isNonModal
        isOpen={isFocused && requirements && Array.isArray(requirements) && !checkRequirements()}
        placement={placement}
        ref={popoverRef}
        style={style}
      >
        <RequirementsList
          requirements={requirements}
          {...requirementsListProps}
        />
      </PopoverContainer>
    </>
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
    /** The given node will be inserted into the field container. */
    inContainer: PropTypes.node,
  }),
  /** Determines the type of input to use. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdeftype). */
  type: PropTypes.string,
  /** @ignore Prop that allows testing of the icon button. */
  viewHiddenIconTestId: PropTypes.string,
  /** @ignore Prop that allows testing of the icon button. */
  viewIconTestId: PropTypes.string,
  /** Array of Requirements and their status. */
  requirements: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    ...statusPropTypes,
  })),
  /** Props object that is spread to the requirements list. */
  requirementsListProps: PropTypes.shape({}),
  ...statusPropTypes,
  ...ariaAttributesBasePropTypes,
  ...inputFieldAttributesBasePropTypes,
};

PasswordField.defaultProps = {
  hasAutoFocus: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  requirements: [],
  type: 'password',
  ...statusDefaultProp,
};

PasswordField.displayName = 'PasswordField';

export default PasswordField;
