import React, { forwardRef } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';
import { useHover, usePress } from '@react-aria/interactions';

import { useNavBarContext } from '../../context/NavBarContext';
import { useLocalOrForwardRef, useNavBarPress, useStatusClasses } from '../../hooks';
import { Box, Button, Icon, Link, Text } from '../../index';
import { NavSideBarItemProps } from '../../types';

const NavSideBarItem = (props: NavSideBarItemProps) => {
  const { children, linkProps } = props;
  if (linkProps && linkProps?.href) {
    return (
      <Link {...linkProps}>
        <ChildWrapper {...props}>
          {children}
        </ChildWrapper>
      </Link>
    );
  }
  return (
    <Button variant="link" sx={{ width: '100%', display: 'block' }}>
      <ChildWrapper {...props}>
        {children}
      </ChildWrapper>
    </Button>
  );
};

const ChildWrapper = forwardRef<HTMLElement, NavSideBarItemProps>((props, ref) => {
  const {
    children,
    icon,
    className,
    id: key,
    onPress: onPressCallback,
    customIcon,
    iconProps,
    customIconProps,
    ...others
  } = props;
  const navItemRef = useLocalOrForwardRef<HTMLElement>(ref);

  const { hoverProps, isHovered } = useHover({});

  const {
    focusProps: focusWithinProps,
  } = useFocusRing({ within: true });

  const { focusProps, isFocusVisible } = useFocusRing();

  const state = useNavBarContext();

  const isSelected = state.selectedKey === key;

  const { onNavPress } = useNavBarPress({ key, onPressCallback }, state);

  const { pressProps, isPressed } = usePress({ ref: navItemRef, onPress: onNavPress });

  const mergedProps = mergeProps(
    pressProps,
    hoverProps,
    focusWithinProps,
    focusProps,
    others,
  );

  const { classNames } = useStatusClasses(className, {
    isPressed,
    isHovered,
    isSelected,
    isFocused: isFocusVisible,
  });

  return (
    <Box
      id={key}
      variant={state.navStyles.navBarItem}
      isRow
      alignItems="center"
      className={classNames}
      ref={navItemRef}
      {...mergedProps}
      sx={{ flexGrow: 0 }}
      role="none"
    >
      {icon && (
        <Icon
          icon={icon}
          title={{ name: children as string }}
          size={state.navStyles.navBarItemHeaderIconSize}
          variant={isSelected
            ? state.navStyles.navBarItemIconSelected
            : state.navStyles.navBarItemIcon}
          {...iconProps}
        />
      )}
      <Text variant={state.navStyles.navBarItemText}>
        {children}
      </Text>
      {customIcon && (
        <Icon
          icon={customIcon}
          size={state.navStyles.navBarItemHeaderIconSize}
          variant={isSelected
            ? state.navStyles.navBarItemCustomIconSelected
            : state.navStyles.navBarItemCustomIcon}
          {...customIconProps}
          title={{ name: 'Action Icon' }}
        />
      )}
    </Box>
  );
});

export default NavSideBarItem;
