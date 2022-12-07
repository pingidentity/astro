import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';
import { useTShirtSize } from '../../hooks';


/**
 * Basic icon component.
 * Icons will fill the given container, which is '1em' x '1em' by default, and will maintain their
 * aspect ratio.
 * Use SVGR to import SVG files as React components and pass them into this component, and you can
 * use the theme to color the icon. But ensure you pass `dimensions: false` in webpack config
 * (see [SVGR docs](https://react-svgr.com/docs/options/#dimensions)).
 * Otherwise icon will not be resizable by `size` prop.
 * Icons can also be used from the [Material UI Icon Library](https://materialdesignicons.com/).
 * Built on top of the [Box from Theme-UI](https://theme-ui.com/components/box/) and uses the
 * available [props from Theme-UI](https://theme-ui.com/sx-prop).
*/

const Icon = forwardRef((props, ref) => {
  const {
    color,
    icon: IconComponent,
    sx, // eslint-disable-line
  } = props;

  const { sizeProps } = useTShirtSize(props);

  return (
    <Box
      as={IconComponent}
      ref={ref}
      {...props}
      size={sizeProps.size}
      sx={{
        fill: color,
        minWidth: sizeProps.size,
        ...sx,
        }}
    />
  );
});

Icon.propTypes = {
  /** The icon to render. */
  icon: PropTypes.elementType.isRequired,
  /**
   * The size of the icon container. If given a number value, it will be converted to pixels.
   * Tshirt sizing is recommended and can be passed to the size prop as 'xs', 'sm' , 'md'
   * rendering 15, 20, and 25 pixel svg containers.  */
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  /** A theme-aware prop to set the icon's color. */
  color: PropTypes.string,
};

Icon.defaultProps = {
  size: 20,
};
Icon.displayName = 'Icon';

export default Icon;
