import React, { useEffect } from 'react';
import MenuDown from '@pingux/mdi-react/MenuDownIcon';
import MenuUp from '@pingux/mdi-react/MenuUpIcon';
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
    navStyles,
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

  const getIconColor = () => {
    if (navStyles.navBarItemHeader === 'navBar.popUpItemHeaderContainer') {
      return childSelected && !isExpanded ? 'white' : 'text.primary';
    }
    return childSelected && !isExpanded ? 'white' : 'neutral.95';
  };

  return (
    <Box variant={navStyles.navBarItemHeader} className={classNames} isRow data-testid={heading}>
      {icon && (
        <Icon
          icon={icon}
          size="sm"
          sx={{
            mr: 'sm',
            color: getIconColor(),
            fill: getIconColor(),
          }}
          aria-hidden="true"
        />
      )}
      <Text
        variant={navStyles.navBarItemHeaderText}
      >
        {heading}
      </Text>
      <Box isRow alignItems="center" sx={{ ml: 'auto' }}>
        <Icon
          icon={isExpanded ? MenuUp : MenuDown}
          size={navStyles.navBarItemHeaderIconSize}
          sx={{
            color: getIconColor(),
            fill: getIconColor(),
          }}
          title={{ name: isExpanded ? 'Menu up' : 'Menu down' }}
        />
      </Box>
    </Box>
  );
};

const NavBarPrimaryItemHeader = ({ item }) => {
  const { icon, className, heading, customIcon } = item;
  const navBarState = useNavBarContext();
  const { navStyles } = navBarState;

  return (
    <Box variant={navStyles.navBarItemHeader} className={className} isRow data-testid={heading}>
      {icon && (
        <Icon
          icon={icon}
          size="sm"
          sx={{
            mr: 'sm',
            color: 'neutral.95',
            fill: 'neutral.95',
          }}
          title={{ name: `${heading} Icon` }}
          aria-hidden="true"
        />
      )}
      <Text variant={navStyles.navBarItemHeaderText}>{heading}</Text>
      <Box isRow alignItems="center" sx={{ ml: 'auto' }}>
        {customIcon && (
          <Icon
            icon={customIcon}
            size="sm"
            sx={{
              color: 'neutral.95',
              fill: 'neutral.95',
            }}
            title={{ name: 'Action Icon' }}
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
