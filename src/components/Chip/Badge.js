import React from 'react';
import PropTypes from 'prop-types';
import { Badge as ThemeUIBadge } from 'theme-ui';
import { BadgeContext } from '../../context/BadgeContext';
import { Box, Text } from '../../';
import * as colors from '../../styles/colors';

/**
 * Badge component.
 * Built on top of the [Badge from Theme-UI](https://theme-ui.com/components/box/) and uses the
 * available [props from Theme-UI](https://theme-ui.com/sx-prop).
*/

const Badge = React.forwardRef((props, ref) => {
  const {
    align,
    bg,
    children,
    isUppercase,
    label,
    sx,
    slots,
    textColor,
    textProps,
    ...others
  } = props;

  const badgeSx = {
    ...(isUppercase && {
      paddingBottom: '3px',
    }),
    ...(align && {
      position: 'absolute',
      [align]: '15px',
    }),
    ...sx,
  };

  const badgeProps = {
    bg,
    isUppercase,
    label,
    ref,
    textColor,
    sx: badgeSx,
    ...others,
  };

  return (
    <BadgeContext.Provider value={{ bg }}>
      <ThemeUIBadge
        isRow
        variant="variants.boxes.chip"
        {...badgeProps}
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
      </ThemeUIBadge>
    </BadgeContext.Provider>
  );
});

Badge.propTypes = {
  /** The text color of the badge. */
  textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The background color of the badge. */
  bg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Provides a way to insert markup in specified places. */
  slots: PropTypes.shape({
    /** The given node will be inserted into left side of the chip. */
    leftIcon: PropTypes.node,
  }),
  /** The label of the badge. */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Props object that is spread directly into the text. */
  textProps: PropTypes.shape({}),
  /** When true, display badge label as uppercase. */
  isUppercase: PropTypes.bool,
  /** Alignment of badge relative to parent container. */
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /** JSX styling that is passed into the component. */
  sx: PropTypes.shape({}),
};

Badge.defaultProps = {
  textColor: 'white',
  bg: colors.neutral[10],
  isUppercase: false,
};

export default Badge;
