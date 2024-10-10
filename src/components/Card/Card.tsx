import React, { forwardRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

import {
  useLocalOrForwardRef,
  useStatusClasses,
} from '../../hooks';
import { CardProps } from '../../types';
import Box from '../Box';

const Card = forwardRef<HTMLElement, CardProps>((props, ref) => {
  const {
    className,
    onHoverStart,
    onHoverChange,
    onHoverEnd,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    isInteractiveWithin,
    isSelected,
    ...others
  } = props;

  const cardRef = useLocalOrForwardRef<HTMLElement>(ref);

  const { hoverProps, isHovered } = useHover(
    {
      onHoverStart,
      onHoverChange,
      onHoverEnd,
    },
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  const { pressProps, isPressed } = usePress({
    ref: cardRef,
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
    isSelected,
  });

  const ariaLabel = props['aria-label'];

  // TODO: [Astro 3.0.0] Update isInteractiveWithin[default] for this prop to true
  const mergedProps = mergeProps(
    others, focusWithinProps, (!isInteractiveWithin ? {
      ...pressProps, ...hoverProps, ...focusProps,
    } : {}),
  );

  return (
    <Box
      aria-label={ariaLabel}
      variant="cards.container"
      className={classNames}
      ref={cardRef}
      isFocused={isFocusVisible}
      {...mergedProps}
    />
  );
});

Card.displayName = 'Card';

export default Card;
