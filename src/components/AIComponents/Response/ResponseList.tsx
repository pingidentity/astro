import React, { Children, useEffect, useState } from 'react';

import { Box } from '../../../index';
import { ResponseListProps } from '../../../types/response';

const ResponseList = (props: ResponseListProps) => {
  const [index, setIndex] = useState(-1);
  const {
    children,
    parentIndex,
    setAnimationIndex,
    shouldStartAnimation,
    delay,
    ...others
  } = props;

  useEffect(() => {
    if (children && setAnimationIndex && index === children.length && parentIndex) {
      setAnimationIndex(parentIndex + 1);
    }
  }, [index]);

  useEffect(() => {
    if (shouldStartAnimation) {
      setIndex(0);
    }
  }, [shouldStartAnimation]);

  return (
    <Box {...others}>
      <>
        {React.cloneElement(children[0] as React.ReactElement, {
          shouldStartAnimation: index === 0,
          setAnimationIndex: setIndex,
          animationIndex: 0,
          delay,
        }) }
      </>
      <Box as="ul" sx={{ pl: 'md', listStyleType: 'disc', listStylePosition: 'inside' }}>
        {Children.map(children.slice(1, children.length),
          (child: React.ReactNode, i) => React.cloneElement(child as React.ReactElement, {
            shouldStartAnimation: index === i + 1,
            setAnimationIndex: setIndex,
            animationIndex: i + 1,
            delay,
            isListItem: true,
          }),
        )}
      </Box>
    </Box>
  );
};

export default ResponseList;
