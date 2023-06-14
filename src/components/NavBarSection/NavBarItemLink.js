import React from 'react';
import PropTypes from 'prop-types';

import { useNavBarContext } from '../../context/NavBarContext';
import { useNavBarPress, useStatusClasses } from '../../hooks';
import { Link } from '../../index';

const NavBarItemLink = props => {
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
        paddingLeft: '45px',
        paddingRight: 'md',
        ...props.sx, // eslint-disable-line react/prop-types
      }}
    />
  );
};

NavBarItemLink.propTypes = {
  /**  Specifies the location of the URL */
  href: PropTypes.string,
  /**  Handler that is called when the press is released over the target. */
  onPress: PropTypes.func,
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string.isRequired,
};

export default NavBarItemLink;
