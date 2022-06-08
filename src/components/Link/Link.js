import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Link as ThemeUILink } from 'theme-ui';
import { useLink } from '@react-aria/link';
import { useFocusRing } from '@react-aria/focus';
import { useHover, usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { usePropWarning, useStatusClasses } from '../../hooks';

/**
 * Link uses the [Link - Theme-UI](https://theme-ui.com/components/link) component and
 * React Aria's [useLink](https://react-spectrum.adobe.com/react-aria/useLink.html) hook.
 *
 */

const Link = forwardRef((props, ref) => {
  const { className, isDisabled, onPress, ...others } = props;

  const linkRef = useRef();
  usePropWarning(props, 'disabled', 'isDisabled');
  /* istanbul ignore next */
  useImperativeHandle(ref, () => linkRef.current);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { linkProps } = useLink(props, linkRef);
  const { hoverProps, isHovered } = useHover(props);
  const { pressProps, isPressed } = usePress({ ref: linkRef });
  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isFocused: isFocusVisible,
    isHovered,
    isPressed,
  });


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

Link.propTypes = {
  /** Whether the link is disabled. */
  isDisabled: PropTypes.bool,
  /**  The HTML element used to render the link, e.g. 'a', or 'span'. */
  as: PropTypes.string,
  /**  Handler that is called when the press is released over the target. */
  onPress: PropTypes.func,
  /**  Specifies the location of the URL */
  href: PropTypes.string,
  /**  Specifies the window where the linked page is loaded */
  target: PropTypes.string,
  /** The styling variation of the link. */
  variant: PropTypes.string,
};

Link.defaultProps = {
  isDisabled: false,
  as: 'a',
  variant: 'app',
};

Link.displayName = 'Link';
export default Link;
