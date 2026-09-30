import React, { forwardRef, useMemo } from 'react';

import { useGetTheme } from '../../hooks';
import { Box } from '../../index';
import { IconBadgeProps } from '../../types';
import getColorFromUUID from '../Avatar/getColorFromUuid';

export const resolveTwotonePath = (
  colorId?: string,
  twotoneColorNames?: string[],
) => {
  if (!colorId || !twotoneColorNames) return null;
  const twotoneColor = getColorFromUUID(colorId, twotoneColorNames);
  return (slot: string) => `twoTone.${slot}.${twotoneColor}`;
};

export const injectTwotoneColor = (
  icon: React.ReactNode,
  slot: string,
  twotonePath: ReturnType<typeof resolveTwotonePath>,
) => {
  if (!twotonePath || !React.isValidElement(icon)) return icon;
  if ('color' in icon.props) return icon;
  return React.cloneElement(icon as React.ReactElement, {
    color: twotonePath(slot),
  });
};

const IconBadge = forwardRef<HTMLElement, IconBadgeProps>((props, ref) => {
  const {
    children,
    sx,
    circleColor,
    baseSize,
    circleSize,
    colorId,
    ...others
  } = props;

  const [firstIcon, secondIcon] = React.Children.toArray(children);

  const { iconBadgeCircleColor, iconBadgeTwotoneColorNames } = useGetTheme();

  const twotonePath = resolveTwotonePath(colorId, iconBadgeTwotoneColorNames);
  const baseIcon = injectTwotoneColor(firstIcon, 'text', twotonePath);
  const badgeIcon = injectTwotoneColor(secondIcon, 'secondary', twotonePath);

  return (
    <Box
      ref={ref}
      as="span"
      variant="iconBadge.container"
      sx={{
        ...(baseSize !== undefined && {
          height: `${baseSize}px`,
          width: `${baseSize}px`,
        }),
        ...(twotonePath && { backgroundColor: twotonePath('bg') }),
        ...sx,
      }}
      {...others}
    >
      {baseIcon}
      <Box
        as="span"
        variant="iconBadge.badgeCircle"
        sx={{
          ...(circleSize !== undefined && {
            height: `${circleSize}px`,
            width: `${circleSize}px`,
            borderRadius: `${circleSize / 2}px`,
          }),
          backgroundColor: circleColor || iconBadgeCircleColor,
        }}
      >
        {badgeIcon}
      </Box>
    </Box>
  );
});

export default IconBadge;
