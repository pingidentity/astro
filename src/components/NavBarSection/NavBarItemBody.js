import React, { Fragment } from 'react';
import { useKeyboard } from '@react-aria/interactions';
import PropTypes from 'prop-types';
import { Separator, Box, Text } from '../../index';

const NavBarItemBody = (props) => {
  const { item, onKeyDown } = props;

  return (
    <Box sx={{ alignItems: 'flex-start', mb: '15px' }}>
      {item.children.map(child => (
        child.subTitle ?
          <Fragment key={`fragment${child.subTitle}`}>
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
          <ChildItemWrapper onKeyDown={onKeyDown} key={`item${child.key || child}`}>
            {child}
          </ChildItemWrapper>
        ))
      }
    </Box>
  );
};

const ChildItemWrapper = (props) => {
  const { children, onKeyDown } = props;
  const childrenKey = children.key || children;
  const { keyboardProps } = useKeyboard({ onKeyDown: e => onKeyDown(e, childrenKey) });

  return (
    <Box width="100%" {...keyboardProps}>
      {children}
    </Box>
  );
};

NavBarItemBody.propTypes = {
  item: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    key: PropTypes.string,
  }),
  onKeyDown: PropTypes.func,
};

ChildItemWrapper.propTypes = {
  onKeyDown: PropTypes.func,
};

export default NavBarItemBody;
