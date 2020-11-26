import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/Box';
import Text from '../Text/Text';
import * as colors from '../../styles/colors';

/**
 * Chip component.
 * Built on top of the [Box from Rebass](https://rebassjs.org/box) and uses the
 * available [props from Rebass](https://rebassjs.org/props/).
*/

const Chip = React.forwardRef((props, ref) => {
  const {
    children,
    textColor,
    label,
  } = props;

  return (
    <Box
      isRow
      variant="boxes.chip"
      ref={ref}
      {...props}
    >
      <Text variant="label" sx={{ textTransform: 'uppercase' }} color={textColor}>
        {label}
      </Text>
      {children}
    </Box>
  );
});

Chip.propTypes = {
  /** The text color of the chip */
  textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The background color of the chip */
  bg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The label of the chip */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Chip.defaultProps = {
  textColor: 'white',
  bg: colors.neutral[10],
};

export default Chip;
