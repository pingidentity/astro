import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Separator, Box, Text } from '../../index';

const NavBarItemBody = (props) => {
  return (
    <Box sx={{ alignItems: 'flex-start', mb: '15px' }}>
      {props.item.children.map(child => (
        child.subTitle ?
          <Fragment key={`fragment${child.subTitle}`} >
            <Separator
              variant="separator.navBarSubtitleSeparator"
              key={`separator${child.subTitle}`}
            />
            <Text
              key={`text${child.subTitle}`}
              variant="variants.navBar.subtitle"
              sx={{
                mb: '10px',
                ml: '45px',
              }}
            >
              {child.subTitle}
            </Text>
          </Fragment>
          :
          child
        ))
      }
    </Box>
  );
};

NavBarItemBody.propTypes = {
  item: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  }),
};

export default NavBarItemBody;
