import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';

/**
 * Basic icon component.
 * Icons will fill the given container, which is '1em' x '1em' by default, and will maintain their
 * aspect ratio.
 * Use SVGR to import SVG files as React components and pass them into this component, and you can
 * use the theme to color the icon.
 * Built on top of the [Box from Rebass](https://rebassjs.org/box) and uses the
 * available [props from Rebass](https://rebassjs.org/props/).
*/
const Icon = forwardRef((props, ref) => {
  const {
    color,
    icon: IconComponent,
    size,
    sx, // eslint-disable-line
  } = props;

  return (
    <Box as={IconComponent} ref={ref} {...props} sx={{ fill: color, size, ...sx }} />
  );
});

Icon.propTypes = {
  /** The icon to render. */
  icon: PropTypes.elementType.isRequired,
  /** The size of the icon container. If given a number value, it will be converted to pixels. */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** A theme-aware prop to set the icon's color. */
  color: PropTypes.string,
};

export default Icon;
