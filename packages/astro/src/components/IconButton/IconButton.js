import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';
import { Pressable, useHover, usePress } from '@react-aria/interactions';
import PropTypes from 'prop-types';
import { IconButton as ThemeUIIconButton } from 'theme-ui';

import { BadgeContext } from '../../context/BadgeContext';
import { useAriaLabelWarning, useStatusClasses } from '../../hooks';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';

/**
 * Convenience wrapper for a Button + Icon. This component applies specific styles necessary for
 * icons and changes the behavior pattern for Button. This ensures compatibility across browsers
 * and devices.
 *
 * In addition to the props below, `IconButton` accepts the same props available to the normal
 * `Button` component.
 *
 * `IconButton` children should be the `Icon` component. Documentation for `Icon` component can
 * be found [here](.?path=/docs/components-icon--default).
 */
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

IconButton.propTypes = {
  /** Styling to apply to the IconButton. */
  variant: PropTypes.string,
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /** Content will be displayed in a tooltip on hover or focus. */
  title: PropTypes.string,
  /**
   * Handler that is called when the press is released over the target.
   * (e: PressEvent) => void
   */
  onPress: PropTypes.func,
  /**
   * Handler that is called when a press interaction starts.
   * (e: PressEvent) => void
   */
  onPressStart: PropTypes.func,
  /**
   * Handler that is called when a press interaction ends, either over the target or when the
   * pointer leaves the target.
   * (e: PressEvent) => void
   */
  onPressEnd: PropTypes.func,
  /**
   * Handler that is called when the press state changes.
   * (isPressed: boolean) => void
   */
  onPressChange: PropTypes.func,
  /**
   * Handler that is called when a press is released over the target, regardless of whether it
   * started on the target or not.
   * (e: PressEvent) => void
   */
  onPressUp: PropTypes.func,
  /** Whether the icon is disabled. */
  isDisabled: PropTypes.bool,
};

IconButton.defaultProps = {
  variant: 'base',
  isDisabled: false,
};

IconButton.displayName = 'Icon Button';
export default IconButton;
