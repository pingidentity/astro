import React, { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import useStatusClasses from '../../hooks/useStatusClasses';
import Box from '../Box';

const ScrollBox = forwardRef((props, ref) => {
  const {
    maxHeight,
    children,
    sx, // eslint-disable-line
    hasShadows,
    onScroll: scrollHandler,
    ...others
  } = props;

  const [scrollTopPosition, setScrollTopPosition] = useState(0);
  const [isTopShadowShowing, setIsTopShadowShowing] = useState(false);
  const [isBottomShadowShowing, setIsBottomShadowShowing] = useState(true);

  const outerRef = useRef();
  /* istanbul ignore next */
  useImperativeHandle(ref, () => outerRef.current);

  /* istanbul ignore next */
  useLayoutEffect(() => {
    if (outerRef.current && outerRef.current.firstChild) {
      if (outerRef.current.firstChild.offsetHeight !== 0) {
        setIsBottomShadowShowing(
          outerRef.current.firstChild.scrollHeight - outerRef.current.firstChild.offsetHeight
          !== outerRef.current.firstChild.scrollTop,
        );
        setIsTopShadowShowing(outerRef.current.firstChild.scrollTop !== 0);
      }
    }
  }, [scrollTopPosition]);

  /* istanbul ignore next */
  const onScroll = () => {
    if (outerRef.current?.firstChild) {
      setScrollTopPosition(outerRef.current?.firstChild?.scrollTop);
    }
  };

  const { classNames } = useStatusClasses('',
    {
      hasShadows,
      isTopShadowShowing,
      isBottomShadowShowing,
    },
  );

  return (
    <>
      <Box
        variant="scrollBox.topShadowBox"
        className={classNames}
        role="separator"
      />
      <Box
        ref={outerRef}
        sx={{
          maxHeight,
          overflowY: 'auto',
          ...sx,
        }}
        onScroll={onScroll}
        variant="scrollBox.container"
        {...others}
      >
        {children}
      </Box>
      <Box
        variant="scrollBox.bottomShadowBox"
        className={classNames}
        role="separator"
      />
    </>
  );
});

ScrollBox.defaultProps = {
  maxHeight: '100%',
  hasShadows: false,
};

ScrollBox.propTypes = {
  /** Height at which the content within ScrollBox will overflow */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  /** Callback that fires when scrolling is done inside the ScrollBox */
  onScroll: PropTypes.func,
  /** If true the box will render top and bottom shadows with scroll */
  hasShadows: PropTypes.bool,
};

export default ScrollBox;
