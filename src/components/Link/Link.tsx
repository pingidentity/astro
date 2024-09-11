import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { mergeProps, useFocusRing, useLink } from 'react-aria';
import { useHover, usePress } from '@react-aria/interactions';
import { Link as ThemeUILink } from 'theme-ui';

import { usePropWarning, useStatusClasses } from '../../hooks';
import { LinkProps } from '../../types';

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { className, isDisabled, onPress, isSelected, isSafariCompatible, ...others } = props;

  const linkRef = useRef<HTMLAnchorElement>(null);
  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => linkRef.current as HTMLAnchorElement);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { linkProps } = useLink(props, linkRef);
  const { hoverProps, isHovered } = useHover(props);
  const { pressProps, isPressed } = usePress({ ref: linkRef });
  const { classNames } = useStatusClasses(className, {
    isSelected,
    isDisabled,
    isFocused: isFocusVisible,
    isHovered,
    isPressed,
  });

  // This relates to UIP-6502. Due to browser inconsistencies
  // react aria prevent default on pointer down
  if (isSafariCompatible) {
    delete linkProps.onPointerUp;
    delete linkProps.onPointerDown;
    delete pressProps.onPointerUp;
    delete pressProps.onPointerDown;
  }

  return (
    <ThemeUILink
      className={classNames}
      ref={linkRef}
      role="link"
      {...others}
      {...mergeProps(hoverProps, pressProps, linkProps, focusProps)}
    />
  );
});

Link.defaultProps = {
  isDisabled: false,
  variant: 'app',
  as: 'a',
};

Link.displayName = 'Link';
export default Link;
