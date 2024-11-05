import React, { useEffect } from 'react';

import { useNavBarContext } from '../../context/NavBarContext';
import { useStatusClasses } from '../../hooks';
import useGetTheme from '../../hooks/useGetTheme';
import { Box, Button, Icon, Text } from '../../index';
import { NavSideBarSectionHeaderProps } from '../../types';

const NavSideBarSectionHeader = (props: NavSideBarSectionHeaderProps) => {
  const {
    children,
    icon,
    items,
    id,
    className,
    onExpandedChange,
    ...others
  } = props;

  const { icons } = useGetTheme();
  const {
    MenuUp,
    MenuDown,
  } = icons;

  const navBarState = useNavBarContext();
  const { expandedKeys, setExpandedKeys, navStyles, selectedKey } = navBarState;
  const isExpanded = expandedKeys.includes(id);

  const childSelected = Array.isArray(items) && items.map(i => i.key).includes(selectedKey);

  useEffect(() => {
    if (childSelected && isExpanded === false) {
      setExpandedKeys([...expandedKeys, id]);
    }
  }, []);

  const { classNames } = useStatusClasses(className, {
    isSelected: childSelected && !isExpanded,
  });

  const variant = childSelected && !isExpanded
    ? navStyles.navBarItemIcon
    : navStyles.navBarItemIconSelected;

  const handleButtonPress = () => {
    onExpandedChange(!isExpanded);
    if (childSelected && isExpanded === false) {
      setExpandedKeys([...expandedKeys, id]);
    }
  };

  return (
    <Button
      variant={navStyles.sectionItem}
      onPress={handleButtonPress}
      data-testid={children as string}
      aria-expanded={isExpanded}
      {...others}
    >
      <Box
        variant={navStyles.navBarItemHeader}
        className={classNames}
        isRow
      >
        {icon && (
          <Icon
            icon={icon}
            size={navStyles.navBarItemHeaderIconSize}
            variant={variant}
            aria-hidden="true"
          />
        )}
        <Text variant={navStyles.navBarItemHeaderText}>
          {children}
        </Text>
        <Box isRow alignItems="center" sx={{ ml: 'auto' }}>
          <Icon
            icon={isExpanded ? MenuUp : MenuDown}
            size={navStyles.navBarItemHeaderIconSize}
            variant={variant}
            mr="0"
            title={{ name: isExpanded ? 'Menu up' : 'Menu down' }}
            aria-label={isExpanded ? 'menu up' : 'menu down'}
          />
        </Box>
      </Box>
    </Button>
  );
};

export default NavSideBarSectionHeader;
