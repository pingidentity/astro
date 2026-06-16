import React, { forwardRef } from 'react';

import { useGetTheme, useTShirtSize } from '../../hooks';
import { IconProps } from '../../types';
import Box from '../Box';

const IconDefault = forwardRef<HTMLElement, IconProps>((props, ref) => {
  const theme = useGetTheme();

  const {
    color,
    icon: IconComponent,
    sx,
    size = theme.defaultIconSize,
    variant,
    title,
    ...others
  } = props;

  const { sizeProps } = useTShirtSize({ size, sizes: theme.tShirtSizes });

  const { defaultIconColor, themeState: { isOnyx } } = theme;

  // `role="img"` below is intentional for non-hidden icons: it exposes the icon
  // to the accessibility tree with a meaningful name derived from `resolvedTitle`.
  //
  // Callers that render a purely presentational icon (e.g. a decorative arrow)
  // must pass BOTH props together:
  //   aria-hidden="true"   — removes the element from the accessibility tree so
  //                          screen readers skip it entirely.
  //   title={{ name: '' }} — renders an empty SVG <title> element, suppressing
  //                          the browser-native tooltip that the MDI icon package
  //                          would otherwise produce from its auto-generated UUID
  //                          title string.
  // `aria-hidden` alone is sufficient for screen readers, but without the empty
  // title prop the SVG <title> can still surface as a tooltip on hover in some
  // browsers, so both props are needed for a complete presentational treatment.
  const resolvedTitle = title ?? (
    typeof IconComponent === 'object' && 'type' in IconComponent
      ? { name: IconComponent.type.name }
      : ''
  );

  return (
    <Box
      as={IconComponent}
      ref={ref}
      role="img"
      title={resolvedTitle}
      variant={variant}
      size={sizeProps.size}
      sx={{
        fill: color || defaultIconColor,
        minWidth: sizeProps.size,
        ...(isOnyx && { height: sizeProps.size, minHeight: sizeProps.size }),
        ...sx,
      }}
      {...others}
    />
  );
});

IconDefault.displayName = 'Icon';

export default IconDefault;
