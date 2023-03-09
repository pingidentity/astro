import React, { useEffect } from 'react';
import MenuDown from 'mdi-react/MenuDownIcon';
import MenuUp from 'mdi-react/MenuUpIcon';
import PropTypes from 'prop-types';

import { useNavBarContext } from '../../context/NavBarContext';
import { useStatusClasses } from '../../hooks';
import { Box, Icon, Text } from '../../index';

const NavBarItemHeader = props => {
  const { item } = props;
  const { children, href } = item;

  return !children && href
    ? <NavBarPrimaryItemHeader item={item} />
    : <NavBarSectionItemHeader item={item} />;
};

const NavBarSectionItemHeader = props => {
  const { item } = props;
  const { icon, key, className, heading } = item;

  const navBarState = useNavBarContext();

  const {
    selectedKey,
    setExpandedKeys,
    expandedKeys,
  } = navBarState;

  const isExpanded = expandedKeys.includes(key);
  const array = item.children.map(i => i.key);
  const childSelected = array.includes(navBarState.selectedKey);

  useEffect(() => {
    if (childSelected && isExpanded === false) {
      setExpandedKeys([...expandedKeys, key]);
    }
  }, [selectedKey]);

  const { classNames } = useStatusClasses(className, {
    isSelected: childSelected && !isExpanded,
  });

  const color = childSelected && !isExpanded ? 'white' : 'neutral.95';

  return (
    <Box variant="navBar.itemHeaderContainer" className={classNames} isRow data-testid={heading}>
      {icon && (
        <Icon
          icon={icon}
          size="sm"
          sx={{
            mr: 'sm',
            color,
            fill: color,
          }}
          aria-hidden="true"
        />
      )}
      <Text
        variant="variants.navBar.headerText"
      >
        {heading}
      </Text>
      <Box isRow alignItems="center" sx={{ ml: 'auto' }}>
        <Icon
          icon={isExpanded ? MenuUp : MenuDown}
          size="sm"
          sx={{
            color,
            fill: color,
          }}
          aria-label={isExpanded ? 'Menu up' : 'Menu down'}
        />
      </Box>
    </Box>
  );
};

const NavBarPrimaryItemHeader = ({ item }) => {
  const { icon, className, heading, customIcon } = item;

  return (
    <Box variant="navBar.itemHeaderContainer" className={className} isRow data-testid={heading}>
      {icon && (
      <Icon
        icon={icon}
        size="sm"
        sx={{
          mr: 'sm',
          color: 'neutral.95',
          fill: 'neutral.95',
        }}
        aria-hidden="true"
      />
      )}
      <Text variant="navBarHeaderText">{heading}</Text>
      <Box isRow alignItems="center" sx={{ ml: 'auto' }}>
        {customIcon && (
        <Icon
          icon={customIcon}
          size="sm"
          sx={{
            color: 'neutral.95',
            fill: 'neutral.95',
          }}
        />
        )}
      </Box>
    </Box>
  );
};

NavBarItemHeader.propTypes = {
  item: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    href: PropTypes.string,
  }),
};

NavBarSectionItemHeader.propTypes = {
  item: PropTypes.shape({
    heading: PropTypes.string,
    icon: PropTypes.elementType,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    key: PropTypes.string,
    href: PropTypes.string,
  }),
};

NavBarPrimaryItemHeader.propTypes = {
  item: PropTypes.shape({
    heading: PropTypes.string,
    icon: PropTypes.elementType,
    className: PropTypes.string,
    customIcon: PropTypes.elementType,
  }),
};

export default NavBarItemHeader;
