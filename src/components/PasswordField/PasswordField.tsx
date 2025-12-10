import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { useOverlayPosition } from 'react-aria';
import EyeOffIcon from '@pingux/mdi-react/EyeOffOutlineIcon';
import EyeIcon from '@pingux/mdi-react/EyeOutlineIcon';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import { VisuallyHidden } from '@react-aria/visually-hidden';

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
import { useDebounce, useField, useLocalOrForwardRef, useProgressiveState, usePropWarning, useStatusClasses } from '../../hooks';
import { PasswordFieldProps, Requirement, RequirementMessageProps } from '../../types';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import statuses from '../../utils/devUtils/constants/statuses';
import { statusDefaultProp } from '../../utils/docUtils/statusProp';

const displayName = 'PasswordField';

const ARIA_LABELS_FOR_SHOW_PASSWORD_TOGGLE = {
  HIDE: 'hide password',
  SHOW: 'show password',
};

const RequirementMessage = (props:RequirementMessageProps) => {
  const { requirement } = props;
  return (
    <>
      {useDebounce({
        value: `${requirement.name} ${requirement.status === statuses.SUCCESS ? statuses.SUCCESS : 'not met'}`,
        delay: 100,
      })}
    </>
  );
};

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
  const {
    helperText,
    isVisible: isVisibleProp,
    onVisibleChange: onVisibleChangeProp,
    requirements = [],
    requirementsListProps,
    slots,
    status,
    viewHiddenIconTestId,
    viewIconTestId,
    ...others
  } = props;

  const [isTyping, setIsTyping] = useState(false);

  const checkRequirements = () => requirements.filter(req => req.status === 'default').length === 0;

  const {
    fieldContainerProps,
    fieldControlInputProps,
    fieldControlWrapperProps,
    fieldLabelProps,
  } = useField({ status, ...others });

  const { isFocused, onChange } = fieldControlInputProps;

  const inputRef = useLocalOrForwardRef<HTMLInputElement>(ref);
  const popoverRef = useRef(null);

  usePropWarning(props, 'disabled', 'isDisabled');

  const [isVisible, setIsShown] = useProgressiveState(
    isVisibleProp,
    isVisibleProp);

  // Measure the width of the input to inform the width of the menu (below).
  const [menuWidth, setMenuWidth] = useState(0);

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

  /* istanbul ignore next */
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

  const { classNames } = useStatusClasses(fieldControlWrapperProps.className, {
    'is-success': (status === statuses.SUCCESS) || (checkRequirements() && requirements.length > 0),
  });

  const toggleShowPasswordAriaLabel = isVisible
    ? ARIA_LABELS_FOR_SHOW_PASSWORD_TOGGLE.HIDE
    : ARIA_LABELS_FOR_SHOW_PASSWORD_TOGGLE.SHOW;

  const handleToggleShowPassword = (...args) => {
    setIsShown(!isVisible);
    const params = { ...args };
    if (onVisibleChangeProp) {
      onVisibleChangeProp(!isVisible, params);
    }
  };

  const handleInputChange = e => {
    if (onChange) {
      onChange(e);
    }
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 300);
  };

  return (
    <>
      <Box
        variant="forms.input.fieldContainer"
        {...getPendoID(displayName)}
        {...fieldContainerProps}
      >
        <Label {...fieldLabelProps} />
        <Box variant="forms.input.fieldControlWrapper" isRow {...fieldControlWrapperProps} className={classNames}>
          <Input ref={inputRef} {...fieldControlInputProps} onChange={handleInputChange} type={isVisible ? 'text' : 'password'} sx={{ pr: '43px' }} role="textbox" />
          <Box variant="forms.input.containedIcon">
            <IconButton
              aria-label={toggleShowPasswordAriaLabel}
              isDisabled={fieldControlInputProps.disabled}
              onPress={handleToggleShowPassword}
              size={28}
            >
              <Icon
                data-testid={isVisible ? viewIconTestId : viewHiddenIconTestId}
                title={{ name: isVisible ? 'Eye Icon' : 'Eye Off Icon' }}
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
      <VisuallyHidden role="alert" aria-live="polite">
        {requirements.length > 0 && checkRequirements() ? 'All requirements are met' : ''}
      </VisuallyHidden>
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
        <VisuallyHidden aria-live="polite" aria-busy={isTyping}>
          Password requirements:
          {requirements.map((req:Requirement) => (
            <React.Fragment key={req.name}>
              <RequirementMessage requirement={req} />
            </React.Fragment>
          ))}
        </VisuallyHidden>
      </PopoverContainer>
    </>
  );
});

PasswordField.defaultProps = {
  hasAutoFocus: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  requirements: [],
  type: 'password',
  ...statusDefaultProp,
};

PasswordField.displayName = displayName;

export default PasswordField;
