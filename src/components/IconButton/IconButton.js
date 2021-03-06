import React, { forwardRef, useRef, useImperativeHandle, useContext } from 'react';
import PropTypes from 'prop-types';
import { IconButton as ThemeUIIconButton } from 'theme-ui';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { Pressable, useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { useAriaLabelWarning, useStatusClasses } from '../../hooks';
import { ChipContext } from '../Chip/ChipContext';
import TooltipTrigger, { Tooltip } from '../TooltipTrigger';

/**
 * Convenience wrapper for a Button + Icon. This component applies specific styles necessary for
 * icons and changes the behavior pattern for Button. This ensures compatibility across browsers
 * and devices.
 *
 * In addition to the props below, `IconButton` accepts the same props available to the normal
 * `Button` component.
 */
const IconButton = forwardRef((props, ref) => {
  const { children,
    className,
    title,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    isDisabled, ...others } = props;

  const buttonRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => buttonRef.current);

  const { buttonProps, isPressed } = useButton({ ...props }, buttonRef);
  const { bg: chipBg } = useContext(ChipContext);
  const { hoverProps, isHovered } = useHover(props);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames } = useStatusClasses(className, {
    isHovered,
    isPressed,
    isFocused: isFocusVisible,
    isDisabled,
  });

  const ariaLabel = props['aria-label'] || title;

  useAriaLabelWarning('IconButton', ariaLabel);

  const button = (
    <ThemeUIIconButton
      tabIndex={0}
      ref={buttonRef}
      className={classNames}
      aria-label={ariaLabel}
      sx={chipBg && isHovered && { 'path': { fill: chipBg } }}
      {...mergeProps(buttonProps, others, hoverProps, focusProps)}
    >
      {children}
    </ThemeUIIconButton>
  );

  if (title) {
    return (
      <TooltipTrigger isDisabled={!title}>
        <Pressable>{button}</Pressable>
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
  variant: 'iconButton',
  isDisabled: false,
};

IconButton.displayName = 'Icon Button';
export default IconButton;
