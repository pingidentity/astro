import React from 'react';

import { useNavBarContext } from '../../context/NavBarContext';
import { useNavBarPress, useStatusClasses } from '../../hooks';
import { Link } from '../../index';
import { NavBarItemLinkProps } from '../../types/navBar';

const NavBarItemLink = (props: NavBarItemLinkProps) => {
  const {
    className,
    id: key,
    onPress: onPressCallback,
    ...others
  } = props;

  const state = useNavBarContext();

  const isSelected = state.selectedKey === key;

  const { onNavPress } = useNavBarPress({ key, onPressCallback }, state);

  const { classNames } = useStatusClasses(className, {
    isSelected,
  });

  return (
    <Link
      id={key}
      variant={state.navStyles.navBarItemLink}
      className={classNames}
      onPress={onNavPress}
      color={isSelected ? 'white' : undefined}
      {...others}
      sx={{
        ...props.sx, // eslint-disable-line react/prop-types
      }}
    />
  );
};

export default NavBarItemLink;
