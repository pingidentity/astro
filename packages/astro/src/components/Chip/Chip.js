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
    align,
    isUppercase,
    slots,
  } = props;

  const sx = {
    ...isUppercase && {
      paddingBottom: '3px',
    },
  };

  if (align) {
    sx.position = 'absolute';
    sx[align] = '15px';
  }

  return (
    <ChipContext.Provider value={{ bg }}>
      <Box
        isRow
        variant="boxes.chip"
        sx={sx}
        ref={ref}
        {...props}
      >
        {slots?.leftIcon &&
        <Box mr="xs">
          {slots.leftIcon}
        </Box>
        }
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
  /** Provides a way to insert markup in specified places. */
  slots: PropTypes.shape({
    /** The given node will be inserted into left side of the chip. */
    leftIcon: PropTypes.node,
  }),
  /** The label of the chip. */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Props object that is spread directly into the textfield. */
  textProps: PropTypes.shape({}),
  /** When true, display chip label as uppercase. */
  isUppercase: PropTypes.bool,
  /** Alignment of chip relative to parent container. */
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

Chip.defaultProps = {
  textColor: 'white',
  bg: colors.neutral[10],
  isUppercase: false,
};

export default Chip;
