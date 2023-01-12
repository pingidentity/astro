import React, { useEffect } from 'react';
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
    <Box variant="navBar.itemHeaderContainer" className={classNames} isRow data-testid={heading} >
      {icon && (
        <Icon
          icon={icon}
          size="sm"
          sx={{
            mr: '10px',
            color,
            fill: color,
          }}
          aria-hidden="true"
        />
      )}
      <Text variant="navBarHeaderText">{heading}</Text>
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
