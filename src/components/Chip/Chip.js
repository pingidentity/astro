import React from 'react';
import PropTypes from 'prop-types';
import { ChipContext } from './ChipContext';
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
    bg,
    children,
    textColor,
    textProps,
    label,
    isUppercase,
  } = props;

  return (
    <ChipContext.Provider value={{ bg }}>
      <Box
        isRow
        variant="chip.baseChip"
        sx={isUppercase && { paddingBottom: '3px' }}
        ref={ref}
        {...props}
      >
        <Text
          variant="label"
          color={textColor}
          sx={isUppercase && { textTransform: 'uppercase', fontSize: '11px' }}
          {...textProps}
        >
          {label}
        </Text>
        {children}
      </Box>
    </ChipContext.Provider>
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
  /** When true, display chip label as uppercase. */
  isUppercase: PropTypes.bool,
};

Chip.defaultProps = {
  textColor: 'white',
  bg: colors.neutral[10],
  isUppercase: false,
};

export default Chip;
