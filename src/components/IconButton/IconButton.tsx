import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';
import { Pressable, useHover, usePress } from '@react-aria/interactions';
import { IconButton as ThemeUIIconButton } from 'theme-ui';

import { BadgeContext, BadgeContextProps } from '../../context/BadgeContext';
import { useAriaLabelWarning, useStatusClasses } from '../../hooks';
import { IconButtonProps } from '../../types';
import { FocusEventHandler } from '../../types/shared';
import { getPendoID } from '../../utils/devUtils/constants/pendoID';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';

const displayName = 'IconButton';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    children,
    className,
    tooltipTriggerProps,
    title,
    variant,
    onBlur,
    onFocus,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    onKeyDown,
    onKeyUp,
    onPress,
    onPressEnd,
    onPressStart,
    onPressChange,
    onPressUp,
    isDisabled,
    ...others
  } = props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

  const { isPressed: isPressedFromContext } = usePress({ ref: buttonRef });
  const { buttonProps, isPressed } = useButton({
    elementType: 'button',
    isDisabled,
    onBlur: onBlur as FocusEventHandler,
    onFocus: onFocus as FocusEventHandler,
    onKeyDown,
    onKeyUp,
    onPress,
    onPressChange,
    onPressEnd,
    onPressStart,
    onPressUp,
    ...others,
  }, buttonRef);
  const { bg: badgeBg } = useContext(BadgeContext) as BadgeContextProps;
  const { hoverProps, isHovered } = useHover({
    onHoverChange,
    onHoverEnd,
    onHoverStart,
  });
  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames } = useStatusClasses(className, {
    isHovered,
    isPressed: isPressed || isPressedFromContext,
    isFocused: isFocusVisible,
    isDisabled,
  });

  const ariaLabel = props['aria-label'] || title;

  useAriaLabelWarning('IconButton', ariaLabel);

  const button = (
    <Pressable
      ref={buttonRef}
      {...getPendoID(displayName)}
      {...mergeProps(buttonProps, others, hoverProps, focusProps)}
    >
      <ThemeUIIconButton
        tabIndex={0}
        className={classNames}
        aria-label={ariaLabel}
        sx={badgeBg && isHovered ? { 'path': { fill: badgeBg } } : undefined}
        variant={`iconButtons.${variant}`}
        onPointerOver={hoverProps.onPointerEnter}
      >
        {children}
      </ThemeUIIconButton>
    </Pressable>
  );

  if (title) {
    return (
      <TooltipTrigger isDisabled={!title} {...tooltipTriggerProps}>
        {button}
        {title && <Tooltip>{title}</Tooltip>}
      </TooltipTrigger>
    );
  }

  return button;
});

IconButton.defaultProps = {
  variant: 'base',
  isDisabled: false,
};

IconButton.displayName = displayName;
export default IconButton;
