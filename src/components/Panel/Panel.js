import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFocusRing } from '@react-aria/focus';
import { useStatusClasses, useDeprecationWarning } from '../../hooks';
import Box from '../Box';
import ScrollBox from '../ScrollBox';

/**
 * **WARNING: Panel will be deprecated in Astro 1.0.0, use `OverlayPanel` instead.**
 *
 */

const Panel = forwardRef((props, ref) => {
  const {
    className,
    children,
    isVisible,
    sx, // eslint-disable-line
    width,
    scrollBoxProps,
  } = props;
  const { isFocusVisible, focusProps } = useFocusRing();
  const { classNames } = useStatusClasses(className, {
    isFocused: isFocusVisible,
    isVisible,
  });
  const dynamicStyles = {
    marginRight: isVisible ? 0 : `-${width}`,
  };

  useDeprecationWarning('`Panel` will be deprecated in Astro-UI 1.0.0, use `OverflowPanel` instead.');

  return (
    <Box
      className={classNames}
      ref={ref}
      tabIndex={isVisible ? 0 : -1}
      variant="boxes.panel"
      {...props}
      {...focusProps}
      sx={{ ...dynamicStyles, ...sx }}
    >
      {isVisible &&
        <ScrollBox {...scrollBoxProps}>
          {children}
        </ScrollBox>
      }
    </Box>
  );
});

Panel.propTypes = {
  isVisible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Props object that is spread directly into the ScrollBox element. */
  scrollBoxProps: PropTypes.shape({}),
};

Panel.defaultProps = {
  width: '100%',
  isVisible: false,
};

Panel.displayName = 'Panel';

export default Panel;
