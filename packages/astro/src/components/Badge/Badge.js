import React from 'react';
import PropTypes from 'prop-types';
import { Badge as ThemeUIBadge } from 'theme-ui';
import { BadgeContext } from '../../context/BadgeContext';
import { Box, Text } from '../../';
import * as colors from '../../styles/colors';

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
    variant,
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

  // The following is to correct a visual regression released in 1.39.0 https://jira.pingidentity.com/browse/UIP-5907.
  // TODO : Remove in Astro V2 with theme remapping roll out.
  const oldVariantPaths = [
    'boxes.countChip',
    'boxes.countNeutral',
    'boxes.itemChipWithSlot',
    'collapsiblePanel.collapsiblePanelBadge',
    'boxes.environmentChip',
    'boxes.readOnlyChip',
    'boxes.selectedItemChip',
  ];

  const fixedVariant = (oldVariantPaths.includes(props.variant)) ? `variants.${props.variant}` : props.variant;

  return (
    <BadgeContext.Provider value={{ bg }}>
      <ThemeUIBadge
        isRow
        {...badgeProps}
        variant={props.variant ? fixedVariant : 'baseBadge'}
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
  /** The variant of the badge */
  variant: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Badge.defaultProps = {
  textColor: 'white',
  bg: colors.neutral[10],
  isUppercase: false,
};

export default Badge;
