import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Link as RLink } from 'rebass';
import { useLink } from '@react-aria/link';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import useStatusClasses from '../../hooks/useStatusClasses';

const Link = forwardRef((props, ref) => {
  const { className, isDisabled, ...others } = props;

  const linkRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => linkRef.current);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { linkProps } = useLink(props, linkRef);
  const { hoverProps, isHovered } = useHover(props);
  const { classNames } = useStatusClasses(className, {
    isDisabled,
    isFocused: isFocusVisible,
    isHovered,
  });

  return (
    <RLink
      className={classNames}
      ref={linkRef}
      role="link"
      {...others}
      {...mergeProps(hoverProps, focusProps, linkProps)}
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
};


Link.defaultProps = {
  isDisabled: false,
  as: 'a',
};

Link.displayName = 'Link';
export default Link;
