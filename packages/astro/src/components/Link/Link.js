import React from 'react';
import { Link as RLink } from 'rebass';
import { useLink } from '@react-aria/link';
import { mergeProps } from '@react-aria/utils';
import { useFocusRing } from '@react-aria/focus';
import PropTypes from 'prop-types';

const Link = React.forwardRef((props, ref) => {
  const {
    sx,// eslint-disable-line
  } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const dynamicStyles = {
    '&:focus': {
      boxShadow: isFocusVisible ? 'focus' : 'none',
    },
  };
  const { linkProps } = useLink(props, ref);
  return (
    <RLink
      ref={ref}
      {...mergeProps(props, focusProps, linkProps)}
      sx={{
        'textDecoration': 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
        ...dynamicStyles,
        ...sx,
      }}
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
  variant: PropTypes.oneOf(['defaultLink']),
};


Link.defaultProps = {
  isDisabled: false,
  as: 'a',
  variant: 'defaultLink',
};

Link.displayName = 'Link';

export default Link;
