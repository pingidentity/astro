import React, { forwardRef, useImperativeHandle } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';
import { useHover, usePress } from '@react-aria/interactions';

import { useNavBarContext } from '../../context/NavBarContext';
import { useLocalOrForwardRef, useNavBarPress, useStatusClasses } from '../../hooks';
import { Box, Icon, Text } from '../../index';
import { NavBarItemProps } from '../../types/navBar';

const NavBarItem = forwardRef<HTMLElement, NavBarItemProps>((props, ref) => {
  const {
    icon,
    text,
    className,
    id: key,
    onPress: onPressCallback,
    ...others
  } = props;

  const navItemRef = useLocalOrForwardRef<HTMLElement>(null);

  /* istanbul ignore next */
  useImperativeHandle(ref, () => navItemRef.current as HTMLElement);

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
  const color = isSelected ? 'white' : 'neutral.95';

  return (
    <Box
      id={key}
      variant={state.navStyles.navBarItem}
      isRow
      tabIndex={0}
      className={classNames}
      ref={navItemRef}
      {...mergedProps}
      sx={{
        flexGrow: 0,
      }}
    >
      <Box
        isRow
        sx={{
          alignItems: 'center',
        }}
      >
        {icon
          && (
            <Icon
              icon={icon}
              title={{ name: text! }}
              size="sm"
              sx={{
                mr: 'sm',
                color,
                fill: color,
              }}
            />
          )}
        <Text variant={state.navStyles.navBarItemText}>
          {text}
        </Text>
      </Box>
    </Box>
  );
});

export default NavBarItem;
