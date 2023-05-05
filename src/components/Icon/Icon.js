import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { useTShirtSize } from '../../hooks';
import Box from '../Box';

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
  /**
   * The title associated with the icon. It is recommended that icons always have an associated
   * title in order to allow a better user experience for those using screen readers.
   * The **`id`** in the title object will be the id of the title and
   * is also what will be supplied to the **`aria-labelledby`** attribute in the SVG.
   * The **`name`** in the title object will be the content of the title.
   * This prop can only be used when importing the icon from [@pingux/mdi-react](https://www.npmjs.com/package/@pingux/mdi-react).
   * */
  title: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

Icon.defaultProps = {
  size: 20,
};
Icon.displayName = 'Icon';

export default Icon;
