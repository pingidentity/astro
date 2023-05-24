import React from 'react';
import PropTypes from 'prop-types';

import { useNavBarContext } from '../../context/NavBarContext';
import { useNavBarPress, useStatusClasses } from '../../hooks';
import { Button } from '../../index';

const NavBarItemButton = props => {
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

NavBarItemButton.propTypes = {
  /**  Handler that is called when the press is released over the target. */
  onPress: PropTypes.func,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string.isRequired,
};

export default NavBarItemButton;
