import React from 'react';

import { useNavBarContext } from '../../context/NavBarContext';
import { useNavBarPress, useStatusClasses } from '../../hooks';
import { Button } from '../../index';
import { NavBarItemButtonProps } from '../../types/navBar';

const NavBarItemButton = (props: NavBarItemButtonProps) => {
  const {
    className,
    id: key,
    onPress: onPressCallback,
    sx, // eslint-disable-line react/prop-types
    ...others
  } = props;

  const state = useNavBarContext();

  const isSelected = state.selectedKey === key;

  const { onNavPress } = useNavBarPress({ key, onPressCallback }, state);

  const { classNames } = useStatusClasses(className, {
    isSelected,
  });

  return (
    <Button
      id={key}
      variant={state.navStyles.navBarItemButton}
      onPress={onNavPress}
      className={classNames}
      color={isSelected ? 'white' : undefined}
      {...others}
    />
  );
};

export default NavBarItemButton;
