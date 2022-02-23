import React from 'react';
import PropTypes from 'prop-types';
import { Box, Icon, Text } from '../../index';

const NavBarItemHeader = (props) => {
  const { item } = props;
  const { icon } = item;
  return (
    <Box
      variant="navBar.itemHeaderContainer"
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
        variant="navBarHeaderText"
      >
        {props.item.heading}
      </Text>
    </Box>
  );
};

NavBarItemHeader.propTypes = {
  item: PropTypes.shape({
    heading: PropTypes.string,
    icon: PropTypes.elementType,
  }),
};

export default NavBarItemHeader;
