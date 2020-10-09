import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box as RBox } from 'rebass';
import { propType as stylePropType } from '@styled-system/prop-types';

/**
 * Basic flexbox-based layout component for creating rows and columns,
 * while controlling sizes and spacing.
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
 * Built on top of the [Box from Rebass.js](https://rebassjs.org/box).
 */
const Box = forwardRef((props, ref) => {
  const {
    flexDirection, // eslint-disable-line
    gap,
    isRow,
    sx, // eslint-disable-line
    ...others
  } = props;
  const fd = flexDirection || isRow ? 'row' : 'column';
  const custom = { ...sx };

  if (gap) {
    custom['& > * + *'] = {
      [fd === 'row' ? 'marginLeft' : 'marginTop']: gap,
    };
  }

  return (
    <RBox
      ref={ref}
      flexDirection={fd}
      variant="boxes.base"
      {...others}
      sx={custom}
    />
  );
});

Box.propTypes = {
  /** The base HTML tag name or React component type to render */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  /** When true, display as a row rather than a column */
  isRow: PropTypes.bool,
  /** Gap between items, whether in a row or column */
  gap: stylePropType,
};

Box.defaultProps = {
  as: 'div',
  isRow: false,
};

export default Box;
