import React, { useEffect } from 'react';

import { useNavBarContext } from '../../context/NavBarContext';
import { useStatusClasses } from '../../hooks';
import useGetTheme from '../../hooks/useGetTheme';
import { Box, Icon, Text } from '../../index';
import { NavBarItemHeaderProps, NavBarPrimaryItemHeaderProps, NavBarSectionItemHeaderProps } from '../../types/navBar';

const NavBarItemHeader = ({ item }: NavBarItemHeaderProps) => {
  const { children, href } = item;

  return !children && href
    ? <NavBarPrimaryItemHeader item={item} />
    : <NavBarSectionItemHeader item={item} />;
};

const NavBarSectionItemHeader = ({ item }: NavBarSectionItemHeaderProps) => {
  const { icon, key, className, heading } = item;

  const navBarState = useNavBarContext();

  const { icons } = useGetTheme();
  const { MenuDown, MenuUp } = icons;

  const {
    selectedKey,
    setExpandedKeys,
    expandedKeys,
    navStyles,
  } = navBarState;

  const isExpanded = expandedKeys.includes(key);
  const array = item?.children && item.children.map(i => i.key);
  const childSelected = array && array.includes(navBarState.selectedKey);

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

const NavBarPrimaryItemHeader = ({ item }: NavBarPrimaryItemHeaderProps) => {
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

export default NavBarItemHeader;
