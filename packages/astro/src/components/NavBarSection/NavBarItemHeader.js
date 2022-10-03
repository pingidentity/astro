import React from 'react';
import PropTypes from 'prop-types';
import MenuDown from 'mdi-react/MenuDownIcon';
import MenuUp from 'mdi-react/MenuUpIcon';
import { Box, Icon, Text } from '../../index';
import { useNavBarContext } from '../../context/NavBarContext';
import { useStatusClasses } from '../../hooks';

const NavBarItemHeader = (props) => {
  const { item } = props;
  const { icon, key, className, heading } = item;

  const navBarState = useNavBarContext();
  const isExpanded = navBarState.expandedKeys?.has(key);
  const array = item.children.map(i => i.key);
  const childSelected = array.includes(navBarState.selectedKey);

  const { classNames } = useStatusClasses(className, {
    isSelected: childSelected && !isExpanded,
  });

  return (
    <Box variant="navBar.itemHeaderContainer" className={classNames} isRow>
      {icon && (
        <Icon
          icon={icon}
          size={20}
          sx={{
            mr: '10px',
            color: 'white',
            fill: 'white',
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
          size={20}
          sx={{
              color: 'white',
              fill: 'white',
            }}
          aria-label={isExpanded ? 'Menu up' : 'Menu down'}
        />
      </Box>
    </Box>
  );
};

NavBarItemHeader.propTypes = {
  item: PropTypes.shape({
    heading: PropTypes.string,
    icon: PropTypes.elementType,
    className: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    key: PropTypes.string,
  }),
};

export default NavBarItemHeader;
