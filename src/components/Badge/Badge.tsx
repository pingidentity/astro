import React from 'react';
import { ResponsiveValue } from 'styled-system';
import { Badge as ThemeUIBadge, ThemeUIStyleObject } from 'theme-ui';

import { Box, Text } from '../..';
import { BadgeContext } from '../../context/BadgeContext';
import { useGetTheme } from '../../hooks';
import { BadgeProps } from '../../types';

import BadgeHelpHint from './BadgeHelpHint';

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const {
    align,
    bg = 'badge.background',
    children,
    helpHint,
    helpHintProps,
    isUppercase = false,
    label,
    sx,
    slots,
    textColor = 'badge.textColor',
    textProps,
    variant,
    ...others
  } = props;

  const { badgeTextFontSize } = useGetTheme();

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
    // When a help hint is present, BadgeHelpHint owns the badge ref so it can position the tooltip.
    ...(!helpHint && { ref: ref as React.Ref<HTMLDivElement> }),
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

  const badge = (
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
        sx={{
          fontSize: badgeTextFontSize || '',
          ...(isUppercase ? { textTransform: 'uppercase', fontSize: 'xs' } : {}),
        }}
        {...textProps}
      >
        {label}
      </Text>
      {children}
    </ThemeUIBadge>
  );

  return (
    <BadgeContext.Provider value={{ bg }}>
      {helpHint
        ? (
          <BadgeHelpHint hint={helpHint} ref={ref} {...helpHintProps}>
            {badge}
          </BadgeHelpHint>
        )
        : badge}
    </BadgeContext.Provider>
  );
});

export default Badge;
