import React, { forwardRef } from 'react';
import { Card as ThemeUICard } from 'theme-ui';
import PropTypes from 'prop-types';
import { mergeProps } from '@react-aria/utils';
import { useHover, usePress } from '@react-aria/interactions';
import { useFocusRing } from '@react-aria/focus';
import { useStatusClasses } from '../../hooks';

/**
 * A Box component built for the common "Card" use case. Has default variant of card.
 * See Box for list of props.
 */
const Card = forwardRef((props, ref) => {
  const {
    className,
    children,
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    ...others
  } = props;

  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocusVisible } = useFocusRing();
  const { pressProps, isPressed } = usePress({
    ref,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
  });
  const {
    focusProps: focusWithinProps, isFocusVisible: isFocusedWithin,
  } = useFocusRing({ within: true });

  const { classNames } = useStatusClasses(className, {
    isHovered,
    isPressed,
    isFocused: isFocusVisible || isFocusedWithin,
  });

  const ariaLabel = props['aria-label'];

  return (
    <ThemeUICard
      aria-label={ariaLabel}
      className={classNames}
      isFocused={isFocusVisible}
      ref={ref}
      variant="container"
      {...others}
      {...mergeProps(hoverProps, pressProps, focusProps, focusWithinProps)}
    >
      {children}
    </ThemeUICard>
  );
});

Card.propTypes = {
  /** Defines a string value that labels the current element. */
  'aria-label': PropTypes.string,
  /**
   * Handler that is called when a hover interaction starts.
   * (e: HoverEvent) => void
   */
  onHoverStart: PropTypes.func,
  /**
  * Handler that is called when a hover interaction ends.
  * (e: HoverEvent) => void
  */
  onHoverEnd: PropTypes.func,
  /**
  * Handler that is called when the hover state changes.
  * (isHovering: boolean) => void
  */
  onHoverChange: PropTypes.func,
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
};

Card.displayName = 'Card';

export default Card;
