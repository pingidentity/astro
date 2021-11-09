import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/Box';
import Text from '../Text/Text';
import * as colors from '../../styles/colors';

/**
 * Chip component.
 * Built on top of the [Box from Theme-UI](https://theme-ui.com/components/box/) and uses the
 * available [props from Theme-UI](https://theme-ui.com/sx-prop).
*/

const Chip = React.forwardRef((props, ref) => {
  const {
    children,
    textColor,
    textProps,
    label,
  } = props;

  return (
    <Box
      isRow
      variant="boxes.chip"
      ref={ref}
      {...props}
    >
      <Text variant="label" sx={{ textTransform: 'uppercase' }} color={textColor} {...textProps}>
        {label}
      </Text>
      {children}
    </Box>
  );
});

Chip.propTypes = {
  /** The text color of the chip. */
  textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The background color of the chip. */
  bg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The label of the chip. */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Props object that is spread directly into the textfield. */
  textProps: PropTypes.shape({}),
};

Chip.defaultProps = {
  textColor: 'white',
  bg: colors.neutral[10],
};

export default Chip;
