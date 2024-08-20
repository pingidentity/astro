import React from 'react';

import { useNavBarContext } from '../../context/NavBarContext';
import { NavSideBarSubTitleProps } from '../../types';
import Text from '../Text';

const NavSideBarSubTitle: React.FC<NavSideBarSubTitleProps> = props => {
  const { children, ...others } = props;
  const navBarState = useNavBarContext();
  return (
    <Text variant={navBarState.navStyles.navBarSubTitle} {...others}>
      {children}
    </Text>
  );
};

export default NavSideBarSubTitle;
