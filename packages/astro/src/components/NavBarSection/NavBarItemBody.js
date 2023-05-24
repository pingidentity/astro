import React, { Fragment } from 'react';
import { useKeyboard } from '@react-aria/interactions';
import PropTypes from 'prop-types';

import { useNavBarContext } from '../../context/NavBarContext';
import { Box, Separator, Text } from '../../index';

const NavBarItemBody = ({ item, onKeyDown }) => {
  const state = useNavBarContext();
  const renderSubTitle = child => {
    const { hasSeparator = true, subTitle } = child;

    return (
      <Fragment key={`fragment${subTitle}`}>
        {hasSeparator && (
        <Separator
          variant="separator.navBarSubtitleSeparator"
        />
        )}
        <Text
          key={`text${subTitle}`}
          ml="45px"
          mt={hasSeparator ? '0' : undefined}
          variant="variants.navBar.subtitle"
        >
          {subTitle}
        </Text>
      </Fragment>
    );
  };


  const renderChild = child => (
    child.subTitle
      ? renderSubTitle(child)
      : (
        <ChildItemWrapper onKeyDown={onKeyDown} key={`item${child.key || child}`}>
          {child}
        </ChildItemWrapper>
      )
  );

  return (
    <Box variant={state.navStyles.navBarItemBody}>
      {item.children.map(renderChild)}
    </Box>
  );
};

const ChildItemWrapper = ({ children, onKeyDown }) => {
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
