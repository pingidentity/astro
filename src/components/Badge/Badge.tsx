import React from 'react';
import { ResponsiveValue } from 'styled-system';
import { Badge as ThemeUIBadge, ThemeUIStyleObject } from 'theme-ui';

import { Box, Text } from '../..';
import { BadgeContext } from '../../context/BadgeContext';
import * as colors from '../../styles/colors';
import { BadgeProps } from '../../types';

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
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
    bg: bg as ResponsiveValue<string>,
    isUppercase,
    label,
    ref: ref as React.Ref<HTMLDivElement>,
    textColor,
    sx: badgeSx as ThemeUIStyleObject,
    ...others,
  };

  // The following is to correct a visual regression released in 1.39.0 https://jira.pingidentity.com/browse/UIP-5907.
  // TODO : Remove in Astro V2 with theme remapping roll out.
  const oldVariantPaths = [
    'boxes.countBadge',
    'boxes.countNeutral',
    'boxes.itemBadgeWithSlot',
    'collapsiblePanel.collapsiblePanelBadge',
    'boxes.environmentBadge',
    'boxes.readOnlyBadge',
    'boxes.selectedItemBadge',
  ];

  const fixedVariant = (variant && oldVariantPaths.includes(variant)) ? `variants.${variant}` : variant;

  return (
    <BadgeContext.Provider value={{ bg }}>
      <ThemeUIBadge
        {...badgeProps}
        variant={variant ? fixedVariant : 'baseBadge'}
      >
        {slots?.leftIcon
        && (
        <Box mr="xs">
          {slots.leftIcon}
        </Box>
        )}
        <Text
          variant="label"
          color={textColor}
          sx={isUppercase ? { textTransform: 'uppercase', fontSize: '11px' } : {}}
          {...textProps}
        >
          {label}
        </Text>
        {children}
      </ThemeUIBadge>
    </BadgeContext.Provider>
  );
});

Badge.defaultProps = {
  textColor: 'white',
  bg: colors.neutral[10],
  isUppercase: false,
};

export default Badge;
