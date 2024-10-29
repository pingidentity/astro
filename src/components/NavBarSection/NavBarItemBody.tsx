import React, { forwardRef, Fragment } from 'react';
import { useKeyboard } from '@react-aria/interactions';
import PropTypes from 'prop-types';

import { useNavBarContext } from '../../context/NavBarContext';
import useGetTheme from '../../hooks/useGetTheme';
import { Box, Separator, Text } from '../../index';
import { ChildItemWrapperProps, NavBarItemBodyProps } from '../../types/navBar';

const NavBarItemBody = forwardRef<HTMLElement, NavBarItemBodyProps>((
  { item, onKeyDown, className, isExpanded, isTransitioning }, ref) => {
  const state = useNavBarContext();
  const { styles } = useGetTheme();

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

  const shouldShowTransition = isExpanded && isTransitioning;

  const getEstimatedHeight = () => {
    if (item?.children && (typeof item?.children.length) === 'number') {
      return (
        item?.itemHeight ? item.itemHeight : styles.navButtonEstHeight) * item.children.length;
    } return null;
  };

  const estimatedHeight = getEstimatedHeight();

  return (
    <Box
      variant={state.navStyles.navBarItemBody}
      ref={ref}
      className={className}
      sx={{
        maxHeight: '0px',
        ...((shouldShowTransition) && {
          marginBottom: 'md',
          maxHeight: `${estimatedHeight}px`,
          transition: 'max-height 300ms ease, margin-bottom 300ms ease',
        }),
      }}
    >
      {item?.children && item.children.map(renderChild)}
    </Box>
  );
});

const ChildItemWrapper = ({ children, onKeyDown }: ChildItemWrapperProps) => {
  const childrenKey = children?.key || children;

  const { keyboardProps } = useKeyboard({
    onKeyDown: e => { return onKeyDown ? onKeyDown(e, childrenKey) : undefined; },
  });

  return (
    <Box
      width="100%"
      {...keyboardProps}
      role="none"
    >
      <>
        {' '}
        {children && children}
      </>
    </Box>
  );
};

ChildItemWrapper.propTypes = {
  onKeyDown: PropTypes.func,
};

export default NavBarItemBody;
