import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';
import { Pressable, useHover, usePress } from '@react-aria/interactions';
import { IconButton as ThemeUIIconButton } from 'theme-ui';

import { BadgeContext } from '../../context/BadgeContext';
import { useAriaLabelWarning, useStatusClasses } from '../../hooks';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';

import { iconButtonPropTypes } from './iconButtonAttributes';

const IconButton = forwardRef((props, ref) => {
  const {
    children,
    className,
    title,
    variant,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    isDisabled,
    ...others
  } = props;

  const buttonRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonRef.current);

  const { isPressed: isPressedFromContext } = usePress(buttonRef);
  const { buttonProps, isPressed } = useButton({ ...props }, buttonRef);
  const { bg: badgeBg } = useContext(BadgeContext);
  const { hoverProps, isHovered } = useHover(props);
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
      {...mergeProps(buttonProps, others, hoverProps, focusProps)}
    >
      <ThemeUIIconButton
        tabIndex={0}
        className={classNames}
        aria-label={ariaLabel}
        sx={badgeBg && isHovered && { 'path': { fill: badgeBg } }}
        variant={`iconButtons.${variant}`}
        onPointerOver={hoverProps.onPointerEnter}
      >
        {children}
      </ThemeUIIconButton>
    </Pressable>
  );

  if (title) {
    return (
      <TooltipTrigger isDisabled={!title}>
        {button}
        {title && <Tooltip>{title}</Tooltip>}
      </TooltipTrigger>
    );
  }

  return button;
});

IconButton.propTypes = iconButtonPropTypes;

IconButton.defaultProps = {
  variant: 'base',
  isDisabled: false,
};

IconButton.displayName = 'Icon Button';
export default IconButton;
