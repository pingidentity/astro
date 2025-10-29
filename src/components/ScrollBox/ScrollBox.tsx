import React, { forwardRef, useLayoutEffect, useState } from 'react';

import { useLocalOrForwardRef, useStatusClasses } from '../../hooks';
import { ScrollBoxProps } from '../../types';
import Box from '../Box';

const ScrollBox = forwardRef<HTMLDivElement, ScrollBoxProps>((props, ref) => {
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

  const outerRef = useLocalOrForwardRef<HTMLDivElement>(ref);

  /* istanbul ignore next */
  useLayoutEffect(() => {
    const firstChildNode = outerRef.current?.firstChild as HTMLElement;

    if (outerRef.current && firstChildNode) {
      if (firstChildNode.offsetHeight !== 0) {
        firstChildNode.setAttribute('tabindex', '0');
        setIsBottomShadowShowing(
          firstChildNode.scrollHeight - firstChildNode.offsetHeight
          !== firstChildNode.scrollTop,
        );
        setIsTopShadowShowing(firstChildNode.scrollTop !== 0);
      }
    }
  }, [scrollTopPosition]);

  /* istanbul ignore next */
  const onScroll = () => {
    const firstChildNode = outerRef.current?.firstChild as HTMLElement;
    if (firstChildNode) {
      setScrollTopPosition(firstChildNode.scrollTop);
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

export default ScrollBox;
