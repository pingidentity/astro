import React, { forwardRef } from 'react';
import { useKeyboard } from '@react-aria/interactions';

import { useNavBarContext } from '../../context/NavBarContext';
import { useNavBarPress, useStatusClasses } from '../../hooks';
import { Box, Button, Link } from '../../index';
import { NavSideBarSectionItemProps } from '../../types';

const NavSideBarSectionItem = forwardRef<HTMLDivElement, NavSideBarSectionItemProps>(
  (props, ref) => {
    const {
      children,
      className,
      id: key,
      onPress: onPressCallback,
      onKeyDown,
      linkProps,
      ...others
    } = props;

    const navBarState = useNavBarContext();

    const isSelected = navBarState.selectedKey === key;

    const { onNavPress } = useNavBarPress({ key, onPressCallback }, navBarState);

    const { classNames } = useStatusClasses(className, {
      isSelected,
    });

    const { keyboardProps } = useKeyboard({
      onKeyDown: e => { return onKeyDown ? onKeyDown(e, key) : undefined; },
    });

    return (
      <Box variant={navBarState.navStyles.navBarItemBody} ref={ref} mb="0">
        <Box
          {...keyboardProps}
          role="none"
        >
          {
            linkProps && linkProps ? (
              <Link
                id={key}
                {...linkProps}
                variant={navBarState.navStyles.navBarItemLink}
                className={classNames}
                onPress={onNavPress}
                color={isSelected ? navBarState.navStyles.navBarItemLinkButtonColor : undefined}
                sx={{
                  ...props.sx,
                }}
                {...others}
              >
                {children}
              </Link>
            ) : (
              <Button
                id={key}
                variant={navBarState.navStyles.navBarItemButton}
                onPress={onNavPress}
                className={classNames}
                color={isSelected ? navBarState.navStyles.navBarItemLinkButtonColor : undefined}
                sx={{
                  ...props.sx,
                }}
                {...others}
              >
                {children}
              </Button>
            )
          }
        </Box>
      </Box>
    );
  });

export default NavSideBarSectionItem;
