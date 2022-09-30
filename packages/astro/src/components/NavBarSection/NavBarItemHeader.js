import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MenuDown from 'mdi-react/MenuDownIcon';
import MenuUp from 'mdi-react/MenuUpIcon';
import { Box, Icon, Text } from '../../index';
import { AccordionGridContext } from '../../context/AccordionGridContext';
import { NavBarContext } from '../../context/NavBarContext';
import { useStatusClasses } from '../../hooks';

const NavBarItemHeader = (props) => {
  const { item } = props;
  const {
    icon,
    key,
    className,
  } = item;

  const { state } = useContext(AccordionGridContext);
  const navState = useContext(NavBarContext);

  const isExpanded = state.selectionManager.selectedKeys?.has(key);
  const array = item.children.map(i => i.key);
  const childSelected = array.includes(navState.selectedKey);


  const { classNames } = useStatusClasses(className, {
    isSelected: childSelected && !isExpanded,
  });

  return (
    <Box
      variant="navBar.itemHeaderContainer"
      className={classNames}
      isRow
    >
      {icon &&
        <Icon
          icon={icon}
          size={20}
          sx={{
            mr: '10px',
            color: 'white',
            fill: 'white',
          }}
        />
      }
      <Text
        variant="variants.navBar.headerText"
      >
        {props.item.heading}
      </Text>
      <Box isRow alignItems="center" sx={{ ml: 'auto' }}>
        <Icon icon={isExpanded ? MenuUp : MenuDown} size={20} />
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
